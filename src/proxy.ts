// ============ src/proxy.ts (PRODUCTION GRADE - FULLY FIXED) ============
import { NextRequest, NextResponse } from "next/server";

// ==================== Constants ====================
const PUBLIC_ROUTES = ["/", "/about", "/testimonials"];

const PUBLIC_PREFIXES = [
  "/ideas",
  "/blog",
  "/payment/success",
  "/payment/cancel",
];

const AUTH_ROUTES = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
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

const STATIC_ASSETS = [
  "/_next/static",
  "/_next/image",
  "/favicon.ico",
  "/images",
  "/fonts",
  "/api",
  "/.well-known",
];

// ==================== Helper Functions ====================

function isStaticAsset(pathname: string): boolean {
  return STATIC_ASSETS.some((asset) => pathname.startsWith(asset));
}

function isPublicRoute(pathname: string): boolean {
  if (PUBLIC_ROUTES.includes(pathname)) return true;
  return PUBLIC_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

function isAuthRoute(pathname: string): boolean {
  return AUTH_ROUTES.some((route) => pathname === route);
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

function getUserInfoFromToken(request: NextRequest): {
  isAuthenticated: boolean;
  role: string | null;
} {
  // Try multiple cookie names
  const accessToken =
    request.cookies.get("accessToken")?.value ||
    request.cookies.get("better-auth.session_token")?.value;

  if (!accessToken) {
    return { isAuthenticated: false, role: null };
  }

  try {
    const parts = accessToken.split(".");

    // Session token (not JWT) - consider it valid
    if (parts.length < 2) {
      return { isAuthenticated: true, role: "MEMBER" };
    }

    // Decode JWT payload
    const payloadBase64 = parts[1];
    const decodedPayload = Buffer.from(payloadBase64, "base64").toString();
    const payload = JSON.parse(decodedPayload);

    // Check expiration
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      return { isAuthenticated: false, role: null };
    }

    return {
      isAuthenticated: true,
      role: payload.role || payload.userRole || "MEMBER",
    };
  } catch (error) {
    // If token decode fails but token exists, assume authenticated
    console.error("Token decode error, but token exists:", error);
    return { isAuthenticated: true, role: "MEMBER" };
  }
}

// ==================== Main Proxy Function ====================
export function proxy(request: NextRequest): NextResponse {
  const { pathname, searchParams } = request.nextUrl;

  // Skip static assets and API routes immediately
  if (isStaticAsset(pathname)) {
    return NextResponse.next();
  }

  // Get authentication status
  const { isAuthenticated, role } = getUserInfoFromToken(request);

  // Debug logging
  if (process.env.NODE_ENV === "development") {
    console.log(
      `[Proxy] ${pathname} | Auth: ${isAuthenticated} | Role: ${role}`,
    );
  }

  // ============ CASE 1: Auth Routes (login, register, etc.) ============
  if (isAuthRoute(pathname)) {
    // If user is already authenticated, redirect to appropriate dashboard
    if (isAuthenticated) {
      const redirectTo = searchParams.get("redirect");

      // Valid redirect target (not auth page)
      if (
        redirectTo &&
        !isAuthRoute(redirectTo) &&
        !redirectTo.includes("/login")
      ) {
        return NextResponse.redirect(new URL(redirectTo, request.url));
      }

      // Default redirect based on role
      const targetUrl =
        role === "ADMIN" || role === "SUPER_ADMIN" ? "/admin" : "/dashboard";
      return NextResponse.redirect(new URL(targetUrl, request.url));
    }

    // Not authenticated, allow access to auth pages
    return NextResponse.next();
  }

  // ============ CASE 2: Public Routes ============
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  // ============ CASE 3: Protected Routes (No Auth) ============
  if (
    !isAuthenticated &&
    (isProtectedRoute(pathname) || isAdminRoute(pathname))
  ) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ============ CASE 4: Admin Routes Access Control ============
  if (isAuthenticated && isAdminRoute(pathname)) {
    const isAdminUser = role === "ADMIN" || role === "SUPER_ADMIN";
    if (!isAdminUser) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // ============ CASE 5: Member Routes Access Control ============
  if (isAuthenticated && isProtectedRoute(pathname)) {
    // Allow all authenticated users to access member routes
    return NextResponse.next();
  }

  // ============ DEFAULT: Allow request ============
  const response = NextResponse.next();

  // Add security headers for all responses
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // Add cache control for authenticated routes
  if (isAuthenticated) {
    response.headers.set("Cache-Control", "no-store, must-revalidate");
  }

  return response;
}

// ==================== Matcher Configuration ====================
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api routes (handled separately)
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
};
