// ============ src/proxy.ts ============
import { NextRequest, NextResponse } from "next/server";

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
  return pathname === "/admin" || pathname.startsWith("/admin/");
}

function getUserInfoFromToken(request: NextRequest): {
  isAuthenticated: boolean;
  role: string | null;
} {
  const userRoleCookie = request.cookies.get("userRole")?.value;
  const accessToken = request.cookies.get("accessToken")?.value;

  console.log(`[Proxy] userRole cookie: ${userRoleCookie}`);
  console.log(`[Proxy] accessToken exists: ${!!accessToken}`);

  if (userRoleCookie === "ADMIN" || userRoleCookie === "SUPER_ADMIN") {
    console.log(`[Proxy] Using userRole cookie: ${userRoleCookie}`);
    return { isAuthenticated: true, role: userRoleCookie };
  }

  if (userRoleCookie === "MEMBER") {
    return { isAuthenticated: true, role: "MEMBER" };
  }

  if (!accessToken) {
    return { isAuthenticated: false, role: null };
  }

  try {
    const parts = accessToken.split(".");
    if (parts.length >= 2) {
      const payloadBase64 = parts[1];
      const decodedPayload = Buffer.from(payloadBase64, "base64").toString();
      const payload = JSON.parse(decodedPayload);

      if (payload.exp && Date.now() >= payload.exp * 1000) {
        return { isAuthenticated: false, role: null };
      }

      return {
        isAuthenticated: true,
        role: payload.role || "MEMBER",
      };
    }
  } catch {
    // Silent fail
  }

  return { isAuthenticated: true, role: "MEMBER" };
}

export function proxy(request: NextRequest): NextResponse {
  const { pathname, searchParams } = request.nextUrl;

  if (isStaticAsset(pathname)) {
    return NextResponse.next();
  }

  const { isAuthenticated, role } = getUserInfoFromToken(request);

  console.log(`[Proxy] ${pathname} | Auth: ${isAuthenticated} | Role: ${role}`);

  // Auth Routes
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

  // Public Routes
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  // Protected Routes (No Auth)
  if (
    !isAuthenticated &&
    (isProtectedRoute(pathname) || isAdminRoute(pathname))
  ) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Admin Routes Access Control
  if (isAuthenticated && isAdminRoute(pathname)) {
    const isAdminUser = role === "ADMIN" || role === "SUPER_ADMIN";
    if (!isAdminUser) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  const response = NextResponse.next();
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public|api).*)"],
};
