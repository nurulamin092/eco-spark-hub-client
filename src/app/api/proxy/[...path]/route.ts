// src/app/api/proxy/[...path]/route.ts
import { NextRequest, NextResponse } from "next/server";

const BACKEND = process.env.BACKEND_URL || "http://localhost:5000";
const IS_DEV = process.env.NODE_ENV === "development";

function logRequest(method: string, url: string, status?: number) {
  const emoji =
    status && status >= 400 ? "❌" : status && status >= 300 ? "⚠️" : "✅";
  console.log(`${emoji} [Proxy] ${method} ${url} → ${status || "..."}`);
}

async function proxy(req: NextRequest, path: string[]) {
  const baseUrl = path[0] === "auth" ? `${BACKEND}/api` : `${BACKEND}/api/v1`;
  const url = `${baseUrl}/${path.join("/")}${req.nextUrl.search}`;

  const method = req.method;
  logRequest(method, url);

  const headers: Record<string, string> = {
    cookie: req.headers.get("cookie") || "",
    "content-type": req.headers.get("content-type") || "application/json",
  };

  const originHeader =
    req.headers.get("origin") || process.env.NEXT_PUBLIC_APP_URL;
  if (originHeader) {
    headers.origin = originHeader;
  }

  const authHeader = req.headers.get("authorization");
  if (authHeader) {
    headers.authorization = authHeader;
  }

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
      }
    } catch (error) {
      console.error("Failed to read request body:", error);
    }
  }

  try {
    const res = await fetch(url, fetchOptions);
    logRequest(method, url, res.status);

    if (!res.ok) {
      const errorBody = await res.text();
      console.error(
        `Proxy error ${res.status}: ${errorBody.substring(0, 200)}`,
      );
    }

    const response = new NextResponse(res.body, {
      status: res.status,
      statusText: res.statusText,
    });

    const setCookie = res.headers.get("set-cookie");
    if (setCookie) {
      response.headers.set("set-cookie", setCookie);
    }

    response.headers.set("access-control-allow-origin", originHeader || "*");
    response.headers.set("access-control-allow-credentials", "true");

    return response;
  } catch (error) {
    console.error("Proxy request failed:", error);
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: "Proxy request failed",
        error: IS_DEV ? String(error) : undefined,
      }),
      {
        status: 500,
        headers: { "content-type": "application/json" },
      },
    );
  }
}

// ==================== HTTP Methods ====================

export const GET = async (
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) => {
  const { path } = await context.params;
  return proxy(req, path);
};

export const POST = async (
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) => {
  const { path } = await context.params;
  return proxy(req, path);
};

export const PATCH = async (
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) => {
  const { path } = await context.params;
  return proxy(req, path);
};

export const PUT = async (
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) => {
  const { path } = await context.params;
  return proxy(req, path);
};

export const DELETE = async (
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) => {
  const { path } = await context.params;
  return proxy(req, path);
};

export const OPTIONS = () => {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
      "access-control-allow-headers":
        "Content-Type, Authorization, Cookie, Origin",
      "access-control-allow-credentials": "true",
      "access-control-max-age": "86400",
    },
  });
};
