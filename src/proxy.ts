// src/proxy.ts - Production Grade
import { NextRequest, NextResponse } from "next/server";

// ==================== Constants ====================

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
  "/payment/success",
  "/payment/cancel",
];

const API_PUBLIC_PREFIXES = [
  "/api/auth",
  "/api/v1/auth",
  "/api/webhooks",
  "/api/health",
];

const STATIC_ASSETS = [
  "/_next/static",
  "/_next/image",
  "/favicon.ico",
  "/images",
  "/fonts",
];

const ADMIN_ROUTES = ["/admin", "/admin/:path*"];
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

// ==================== Helper Functions ====================

function matchesPattern(pathname: string, patterns: string[]): boolean {
  return patterns.some((pattern) => {
    if (pattern.includes(":path*")) {
      const basePath = pattern.replace("/:path*", "");
      return pathname === basePath || pathname.startsWith(`${basePath}/`);
    }
    return pathname === pattern;
  });
}

function isStaticAsset(pathname: string): boolean {
  return STATIC_ASSETS.some((asset) => pathname.startsWith(asset));
}

function isApiRoute(pathname: string): boolean {
  return pathname.startsWith("/api/");
}

function isApiPublicRoute(pathname: string): boolean {
  return API_PUBLIC_PREFIXES.some(prefix => 
    pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

function decodeTokenPayload(token: string): Record<string, unknown> | null {
  try {
    const payload = token.split('.')[1];
    const decoded = Buffer.from(payload, 'base64').toString();
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

function isTokenExpired(token: string): boolean {
  const payload = decodeTokenPayload(token);
  if (!payload?.exp) return true;
  return Date.now() >= (payload.exp as number) * 1000;
}

function getUserRole(request: NextRequest): string | null {
  // Prioritize better-auth session token
  const sessionToken = request.cookies.get("better-auth.session_token")?.value;
  const accessToken = request.cookies.get("accessToken")?.value;
  
  const authToken = sessionToken || accessToken;
  if (!authToken) return null;
  
  if (isTokenExpired(authToken)) return null;
  
  const payload = decodeTokenPayload(authToken);
  if (!payload) return null;
  
  // Support multiple token formats
  return (payload.role || payload.userRole || "MEMBER") as string;
}

function addSecurityHeaders(response: NextResponse): NextResponse {
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=()"
  );
  
  // CSP for production
  if (process.env.NODE_ENV === "production") {
    response.headers.set(
      "Content-Security-Policy",
      "default-src 'self'; script-src 'self' 'unsafe-inline' https://js.stripe.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://api.stripe.com;"
    );
  }
  
  return response;
}

// ==================== Main Proxy Function ====================

export function proxy(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;
  
  // Skip static assets
  if (isStaticAsset(pathname)) {
    return addSecurityHeaders(NextResponse.next());
  }
  
  const isPublicRoute = matchesPattern(pathname, PUBLIC_ROUTES);
  const isApiPublic = isApiPublicRoute(pathname);
  const isApi = isApiRoute(pathname);
  
  // API Routes - Return JSON response for unauthorized
  if (isApi && !isApiPublic) {
    const userRole = getUserRole(request);
    if (!userRole) {
      return new NextResponse(
        JSON.stringify({ success: false, message: "Unauthorized" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }
  }
  
  // Already on login page - prevent redirect loop
  if (pathname === "/login" || pathname === "/register") {
    const userRole = getUserRole(request);
    if (userRole) {
      // Already logged in, redirect to dashboard
      const dashboardUrl = userRole === "ADMIN" || userRole === "SUPER_ADMIN" 
        ? new URL("/admin", request.url)
        : new URL("/member", request.url);
      return NextResponse.redirect(dashboardUrl);
    }
    return addSecurityHeaders(NextResponse.next());
  }
  
  // Check authentication for protected routes
  if (!isPublicRoute) {
    const userRole = getUserRole(request);
    
    if (!userRole) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
    
    // Admin route protection
    const isAdminRoute = matchesPattern(pathname, ADMIN_ROUTES);
    if (isAdminRoute && userRole !== "ADMIN" && userRole !== "SUPER_ADMIN") {
      return NextResponse.redirect(new URL("/403", request.url));
    }
    
    // Member route protection
    const isMemberRoute = matchesPattern(pathname, MEMBER_ROUTES);
    if (isMemberRoute && userRole === "MEMBER") {
      return addSecurityHeaders(NextResponse.next());
    }
  }
  
  return addSecurityHeaders(NextResponse.next());
}

// ==================== Matcher Configuration ====================

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};