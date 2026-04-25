// ============ src/proxy.ts ============
import { NextRequest, NextResponse } from "next/server";

// Route definitions
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
const STATIC_ASSETS = [
  "/_next/static",
  "/_next/image",
  "/favicon.ico",
  "/images",
  "/fonts",
  "/api",
  "/.well-known",
];

// Helper functions
const isStaticAsset = (pathname: string): boolean =>
  STATIC_ASSETS.some((asset) => pathname.startsWith(asset));

const isPublicRoute = (pathname: string): boolean => {
  if (PUBLIC_ROUTES.includes(pathname)) return true;
  return PUBLIC_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
};

const isAuthRoute = (pathname: string): boolean =>
  AUTH_ROUTES.some((route) => pathname === route);

const isProtectedRoute = (pathname: string): boolean =>
  PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

const isAdminRoute = (pathname: string): boolean =>
  pathname === "/admin" || pathname.startsWith("/admin/");

// JWT decode with multiple field support
function decodeJWT(token: string): { role: string; exp: number } | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const payload = JSON.parse(Buffer.from(parts[1], "base64").toString());
    return {
      role: payload.role || payload.Role || payload.userRole || "MEMBER",
      exp: payload.exp || 0,
    };
  } catch {
    return null;
  }
}

// Get auth info from multiple sources
function getUserInfoFromToken(request: NextRequest): {
  isAuthenticated: boolean;
  role: string | null;
} {
  // Check cookies first
  const userRoleCookie = request.cookies.get("userRole")?.value;
  const accessToken = request.cookies.get("accessToken")?.value;

  console.log(`[Proxy] userRole cookie: ${userRoleCookie}`);
  console.log(`[Proxy] accessToken exists: ${!!accessToken}`);

  // Valid roles from cookie
  const validRoles = ["SUPER_ADMIN", "ADMIN", "MODERATOR", "MEMBER"];

  if (userRoleCookie && validRoles.includes(userRoleCookie)) {
    console.log(`[Proxy] Using userRole cookie: ${userRoleCookie}`);
    return { isAuthenticated: true, role: userRoleCookie };
  }

  // Try to get from sessionStorage (client-side only - handled separately)

  // Fallback to JWT decode
  if (accessToken) {
    const decoded = decodeJWT(accessToken);
    if (decoded && decoded.exp && Date.now() < decoded.exp * 1000) {
      console.log(`[Proxy] Role from token decode: ${decoded.role}`);
      return { isAuthenticated: true, role: decoded.role };
    }

    if (decoded && !decoded.exp) {
      console.log(`[Proxy] Role from token (no exp): ${decoded.role}`);
      return { isAuthenticated: true, role: decoded.role };
    }

    if (decoded && decoded.exp && Date.now() >= decoded.exp * 1000) {
      console.log("[Proxy] Token expired");
    }
  }

  return { isAuthenticated: false, role: null };
}

export function proxy(request: NextRequest): NextResponse {
  const { pathname, searchParams } = request.nextUrl;

  // Skip static assets
  if (isStaticAsset(pathname)) {
    return NextResponse.next();
  }

  const { isAuthenticated, role } = getUserInfoFromToken(request);

  console.log(`[Proxy] ${pathname} | Auth: ${isAuthenticated} | Role: ${role}`);

  // Auth routes (login/register)
  if (isAuthRoute(pathname)) {
    if (isAuthenticated) {
      const redirectTo = searchParams.get("redirect");
      if (
        redirectTo &&
        !isAuthRoute(redirectTo) &&
        !redirectTo.includes("/login")
      ) {
        return NextResponse.redirect(new URL(redirectTo, request.url));
      }
      const targetUrl =
        role === "ADMIN" || role === "SUPER_ADMIN" ? "/admin" : "/dashboard";
      return NextResponse.redirect(new URL(targetUrl, request.url));
    }
    return NextResponse.next();
  }

  // Public routes
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  // Protected routes without authentication
  if (
    !isAuthenticated &&
    (isProtectedRoute(pathname) || isAdminRoute(pathname))
  ) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Admin routes access control
  if (isAuthenticated && isAdminRoute(pathname)) {
    const isAdmin = role === "ADMIN" || role === "SUPER_ADMIN";
    if (!isAdmin) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // Security headers
  const response = NextResponse.next();
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Cache-Control", "no-store, must-revalidate");

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public|api).*)"],
};
