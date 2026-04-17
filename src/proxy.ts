import { NextRequest, NextResponse } from "next/server";

// List of public routes (no authentication required)
const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
  "/ideas",
  "/ideas/:path*",
  "/blog",
  "/blog/:path*",
  "/about",
  "/testimonials",
  "/api/auth",
  "/api/auth/:path*",
  "/api/v1/auth",
  "/api/v1/auth/:path*",
  "/payment/success",
  "/payment/cancel",
];

// List of static assets that should be excluded
const STATIC_ASSETS = [
  "/_next/static",
  "/_next/image",
  "/favicon.ico",
  "/images",
  "/fonts",
];

// Admin only routes
const ADMIN_ROUTES = ["/admin", "/admin/:path*"];

// Member only routes
const MEMBER_ROUTES = [
  "/member",
  "/member/:path*",
  "/dashboard",
  "/dashboard/:path*",
  "/profile",
  "/change-password",
  "/sessions",
  "/payments",
  "/bookmarks",
  "/activity",
];

/**
 * Check if a path matches any pattern in the list
 */
function matchesPattern(pathname: string, patterns: string[]): boolean {
  return patterns.some((pattern) => {
    if (pattern.includes(":path*")) {
      const basePath = pattern.replace("/:path*", "");
      return pathname === basePath || pathname.startsWith(`${basePath}/`);
    }
    return pathname === pattern;
  });
}

/**
 * Check if path is a static asset
 */
function isStaticAsset(pathname: string): boolean {
  return STATIC_ASSETS.some((asset) => pathname.startsWith(asset));
}

/**
 * Get user role from token (simplified - you can expand this)
 * In production, you might want to decode the JWT here
 */
function getUserRole(request: NextRequest): string | null {
  // Try to get token from cookie
  const token = request.cookies.get("accessToken")?.value;
  const sessionToken = request.cookies.get("better-auth.session_token")?.value;

  if (!token && !sessionToken) {
    return null;
  }

  // For now, return "MEMBER" if authenticated
  // In production, decode JWT to get actual role
  return "MEMBER";
}

/**
 * Proxy function - runs before every request
 * This replaces middleware.ts in Next.js 16+
 */
export function proxy(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;

  // Skip static assets
  if (isStaticAsset(pathname)) {
    return NextResponse.next();
  }

  // Check if path is public
  const isPublicRoute = matchesPattern(pathname, PUBLIC_ROUTES);

  // Get user authentication status
  const userRole = getUserRole(request);
  const isAuthenticated = !!userRole;

  // Redirect to login if accessing protected route without authentication
  if (!isPublicRoute && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Admin route protection
  const isAdminRoute = matchesPattern(pathname, ADMIN_ROUTES);
  if (isAdminRoute && userRole !== "ADMIN" && userRole !== "SUPER_ADMIN") {
    return NextResponse.redirect(new URL("/member", request.url));
  }

  // Member route protection (authenticated users only)
  const isMemberRoute = matchesPattern(pathname, MEMBER_ROUTES);
  if (isMemberRoute && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Add security headers
  const response = NextResponse.next();

  // Security headers
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()",
  );

  return response;
}

/**
 * Matcher configuration - specifies which routes trigger the proxy
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
