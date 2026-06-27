// src/app/api/proxy/[...path]/route.ts
import { NextRequest, NextResponse } from "next/server";

// ==================== Configuration ====================
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";
const IS_DEV = process.env.NODE_ENV === "development";
const IS_PROD = process.env.NODE_ENV === "production";

// Validate backend URL
function validateUrl(url: string): string {
  try {
    new URL(url);
    return url;
  } catch {
    console.error(`❌ Invalid BACKEND_URL: ${url}`);
    return "http://localhost:5000";
  }
}
const BACKEND = validateUrl(BACKEND_URL);

// Extract domain for cookies
function getCookieDomain(): string | undefined {
  if (IS_DEV) return undefined;
  try {
    const hostname = new URL(BACKEND).hostname;
    // Only set domain for production domains (not localhost/IP)
    if (hostname.includes(".") && !hostname.includes("localhost")) {
      return `.${hostname}`;
    }
    return undefined;
  } catch {
    return undefined;
  }
}
const COOKIE_DOMAIN = getCookieDomain();

// ==================== Cookie Helpers ====================
function parseCookies(cookieString: string): Record<string, string> {
  const cookies: Record<string, string> = {};
  if (!cookieString) return cookies;

  cookieString.split(";").forEach((cookie) => {
    const [name, ...rest] = cookie.trim().split("=");
    if (name && rest.length > 0) {
      cookies[name] = decodeURIComponent(rest.join("="));
    }
  });
  return cookies;
}

function buildCookieString(cookies: Record<string, string>): string {
  return Object.entries(cookies)
    .map(([name, value]) => `${name}=${encodeURIComponent(value)}`)
    .join("; ");
}

function filterCookiesForBackend(
  cookies: Record<string, string>,
): Record<string, string> {
  const allowedCookies = [
    "accessToken",
    "token",
    "refreshToken",
    "userRole",
    "sessionId",
    "userId",
    "user",
    "role",
  ];

  const filtered: Record<string, string> = {};
  for (const [key, value] of Object.entries(cookies)) {
    if (allowedCookies.includes(key) || key.startsWith("__")) {
      filtered[key] = value;
    }
  }
  return filtered;
}

// ==================== Set-Cookie Parser (CRITICAL FIX) ====================
function splitSetCookieHeader(header: string): string[] {
  const cookies: string[] = [];
  let current = "";
  let inQuotes = false;
  let i = 0;

  while (i < header.length) {
    const char = header[i];

    if (char === '"') {
      inQuotes = !inQuotes;
      current += char;
    } else if (char === "," && !inQuotes) {
      cookies.push(current.trim());
      current = "";
    } else {
      current += char;
    }
    i++;
  }

  if (current) cookies.push(current.trim());
  return cookies;
}

function processCookieForProduction(cookie: string): string {
  const parts = cookie.split(";").map((p) => p.trim());
  const [nameValue, ...attributes] = parts;

  // Remove existing flags
  const filteredAttrs = attributes.filter(
    (attr) =>
      !attr.toLowerCase().startsWith("secure") &&
      !attr.toLowerCase().startsWith("samesite") &&
      !attr.toLowerCase().startsWith("domain") &&
      !attr.toLowerCase().startsWith("path"),
  );

  // Add production flags
  const newAttrs = [...filteredAttrs];

  if (!newAttrs.some((a) => a.toLowerCase() === "secure")) {
    newAttrs.push("Secure");
  }

  if (!newAttrs.some((a) => a.toLowerCase().startsWith("samesite"))) {
    newAttrs.push("SameSite=None");
  }

  if (
    COOKIE_DOMAIN &&
    !newAttrs.some((a) => a.toLowerCase().startsWith("domain"))
  ) {
    newAttrs.push(`Domain=${COOKIE_DOMAIN}`);
  }

  if (!newAttrs.some((a) => a.toLowerCase().startsWith("path"))) {
    newAttrs.push("Path=/");
  }

  return [nameValue, ...newAttrs].join("; ");
}

// ==================== Main Proxy Handler ====================
async function proxyRequest(req: NextRequest, path: string[]) {
  // Build URL - prevent double slashes
  const baseUrl = path[0] === "auth" ? `${BACKEND}/api` : `${BACKEND}/api/v1`;
  const cleanPath = path.join("/").replace(/\/+/g, "/");
  const url = `${baseUrl}/${cleanPath}${req.nextUrl.search}`;

  const method = req.method;
  console.log(`🔄 [Proxy] ${method} → ${url}`);

  // ============ Cookie Processing ============
  const cookieHeader = req.headers.get("cookie") || "";
  const parsedCookies = parseCookies(cookieHeader);
  const filteredCookies = filterCookiesForBackend(parsedCookies);

  const accessToken = parsedCookies.accessToken || parsedCookies.token;
  const refreshToken = parsedCookies.refreshToken;
  const userRole = parsedCookies.userRole;

  console.log(`🍪 [Proxy] Cookies:`, {
    total: Object.keys(parsedCookies).length,
    filtered: Object.keys(filteredCookies).length,
    hasAccessToken: !!accessToken,
    hasRefreshToken: !!refreshToken,
    userRole: userRole || "none",
    isProduction: IS_PROD,
    cookieDomain: COOKIE_DOMAIN || "none",
  });

  // ============ Headers ============
  const headers: HeadersInit = {
    "Content-Type": req.headers.get("content-type") || "application/json",
    Accept: req.headers.get("accept") || "application/json",
    "User-Agent": req.headers.get("user-agent") || "Next.js-Proxy",
  };

  // Forward filtered cookies
  if (Object.keys(filteredCookies).length > 0) {
    headers.cookie = buildCookieString(filteredCookies);
    console.log(
      `🍪 [Proxy] Forwarding ${Object.keys(filteredCookies).length} cookies`,
    );
  } else if (cookieHeader) {
    // Fallback: forward all cookies
    headers.cookie = cookieHeader;
    console.log(`🍪 [Proxy] Forwarding all cookies (fallback)`);
  }

  // Authorization header
  const authHeader = req.headers.get("authorization");
  if (authHeader) {
    headers.authorization = authHeader;
    console.log(`🔑 [Proxy] Using Authorization header`);
  } else if (accessToken) {
    headers.authorization = `Bearer ${accessToken}`;
    console.log(`🔑 [Proxy] Using token from cookie`);
  }

  // Origin header
  const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_APP_URL;
  if (origin) {
    headers.origin = origin;
  }

  // Forward client IP (for rate limiting)
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    headers["x-forwarded-for"] = forwardedFor;
  }

  // ============ Request Body ============
  const fetchOptions: RequestInit = {
    method,
    headers,
    credentials: "include",
  };

  if (method !== "GET" && method !== "HEAD") {
    try {
      const body = await req.text();
      if (body) {
        fetchOptions.body = body;
        console.log(`📦 [Proxy] Body: ${body.length} bytes`);
      }
    } catch (error) {
      console.error("❌ Failed to read body:", error);
    }
  }

  // ============ Execute Request ============
  try {
    const startTime = Date.now();
    const response = await fetch(url, fetchOptions);
    const duration = Date.now() - startTime;

    console.log(`📥 [Proxy] ${response.status} (${duration}ms)`);

    // ============ Build Response ============
    const responseHeaders = new Headers();

    // CORS Headers
    const requestOrigin = req.headers.get("origin") || "*";
    responseHeaders.set("Access-Control-Allow-Origin", requestOrigin);
    responseHeaders.set("Access-Control-Allow-Credentials", "true");
    responseHeaders.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    );
    responseHeaders.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, Cookie, Set-Cookie, X-Requested-With",
    );
    responseHeaders.set(
      "Access-Control-Expose-Headers",
      "Set-Cookie, Authorization, X-Response-Time",
    );
    responseHeaders.set("Access-Control-Max-Age", "86400");
    responseHeaders.set("X-Response-Time", `${duration}ms`);

    // ============ Cookie Forwarding (CRITICAL) ============
    const setCookieHeader = response.headers.get("set-cookie");
    if (setCookieHeader) {
      const cookies = splitSetCookieHeader(setCookieHeader);
      const modifiedCookies: string[] = [];

      for (const cookie of cookies) {
        let processedCookie = cookie;

        if (IS_PROD) {
          processedCookie = processCookieForProduction(cookie);
        }

        modifiedCookies.push(processedCookie);

        // Log cookie
        const [nameValue] = processedCookie.split(";");
        const [name, value] = nameValue.split("=");
        console.log(
          `🍪 [Proxy] Cookie: ${name}=${value?.substring(0, 20) || "empty"}...`,
        );
      }

      // Set all cookies
      for (const cookie of modifiedCookies) {
        responseHeaders.append("Set-Cookie", cookie);
      }

      console.log(`✅ [Proxy] Forwarded ${modifiedCookies.length} cookies`);
    }

    // Copy other headers
    const headersToCopy = [
      "content-type",
      "content-length",
      "etag",
      "last-modified",
      "cache-control",
      "x-ratelimit-limit",
      "x-ratelimit-remaining",
      "x-ratelimit-reset",
    ];
    for (const header of headersToCopy) {
      const value = response.headers.get(header);
      if (value) {
        responseHeaders.set(header, value);
      }
    }

    // ============ Response ============
    return new NextResponse(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error("❌ Proxy error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Backend connection failed",
        error: IS_DEV ? String(error) : undefined,
        timestamp: new Date().toISOString(),
        path: path.join("/"),
      },
      { status: 502 },
    );
  }
}

// ==================== HTTP Methods ====================
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  return proxyRequest(req, path);
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  return proxyRequest(req, path);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  return proxyRequest(req, path);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  return proxyRequest(req, path);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  return proxyRequest(req, path);
}

// ==================== OPTIONS ====================
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
      "Access-Control-Allow-Headers":
        "Content-Type, Authorization, Cookie, Origin, X-Requested-With",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Max-Age": "86400",
    },
  });
}
