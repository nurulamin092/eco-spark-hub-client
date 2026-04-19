// ============ src/proxy.ts (FULLY FIXED - No unused functions) ============
import { NextRequest, NextResponse } from "next/server";

// ==================== Constants ====================
const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
  "/about",
  "/testimonials",
];

const PUBLIC_PREFIXES = [
  "/ideas",
  "/blog",
  "/payment/success",
  "/payment/cancel",
];
const PROTECTED_ROUTES = [
  "/dashboard",
  "/member",
  "/profile",
  "/change-password",
  "/sessions",
  "/payments",
  "/bookmarks",
  "/activity",
];
const ADMIN_ROUTES = ["/admin"];

// ==================== Helper Functions ====================
function isPublicRoute(pathname: string): boolean {
  if (PUBLIC_ROUTES.includes(pathname)) return true;
  return PUBLIC_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

function isAuthRoute(pathname: string): boolean {
  return pathname === "/login" || pathname === "/register";
}

function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

function isAdminRoute(pathname: string): boolean {
  return ADMIN_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

function isStaticAsset(pathname: string): boolean {
  const staticPatterns = [
    "/_next/static",
    "/_next/image",
    "/favicon.ico",
    "/images",
    "/fonts",
    "/api",
  ];
  return staticPatterns.some((pattern) => pathname.startsWith(pattern));
}

// Improved token decoding with error handling
function getUserInfoFromToken(request: NextRequest): {
  isAuthenticated: boolean;
  role: string | null;
} {
  const accessToken = request.cookies.get("accessToken")?.value;

  if (!accessToken) {
    return { isAuthenticated: false, role: null };
  }

  try {
    // Decode JWT payload
    const payloadBase64 = accessToken.split(".")[1];
    const decodedPayload = Buffer.from(payloadBase64, "base64").toString();
    const payload = JSON.parse(decodedPayload);

    // Check expiration
    const isExpired = payload.exp ? Date.now() >= payload.exp * 1000 : true;

    if (isExpired) {
      return { isAuthenticated: false, role: null };
    }

    return {
      isAuthenticated: true,
      role: payload.role || "MEMBER",
    };
  } catch (error) {
    console.error("Token decoding failed:", error);
    return { isAuthenticated: false, role: null };
  }
}

// ==================== Main Proxy Function ====================
export function proxy(request: NextRequest): NextResponse {
  const { pathname, searchParams } = request.nextUrl;

  // Skip static assets and API routes
  if (isStaticAsset(pathname)) {
    return NextResponse.next();
  }

  // Get authentication status
  const { isAuthenticated, role } = getUserInfoFromToken(request);

  console.log(`[Proxy] ${pathname} - Auth: ${isAuthenticated}, Role: ${role}`);

  // ✅ Case 1: Public routes - allow access without authentication
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  // ✅ Case 2: Auth pages (login/register)
  if (isAuthRoute(pathname)) {
    if (isAuthenticated) {
      // Already logged in - redirect to dashboard
      const redirectTo = searchParams.get("redirect");
      if (redirectTo && !redirectTo.includes("/login")) {
        return NextResponse.redirect(new URL(redirectTo, request.url));
      }
      // Default redirect based on role
      const dashboardUrl =
        role === "ADMIN" || role === "SUPER_ADMIN" ? "/admin" : "/dashboard";
      return NextResponse.redirect(new URL(dashboardUrl, request.url));
    }
    return NextResponse.next();
  }

  // ✅ Case 3: Protected routes without auth
  if (
    (isProtectedRoute(pathname) || isAdminRoute(pathname)) &&
    !isAuthenticated
  ) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ✅ Case 4: Admin route access control
  if (isAdminRoute(pathname) && isAuthenticated) {
    if (role !== "ADMIN" && role !== "SUPER_ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // Add security headers for all responses
  const response = NextResponse.next();
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  return response;
}

// ==================== Matcher Configuration ====================
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public|api).*)"],
};
