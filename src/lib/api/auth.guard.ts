import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_ACCESS_SECRET || "fallback-secret-change-me",
);

interface JWTPayload {
  userId: string;
  email: string;
  role: string;
  name: string;
  exp: number;
}

async function verifyAndDecodeToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as JWTPayload;
  } catch {
    return null;
  }
}

export async function requireAuth(): Promise<{ userId: string; role: string }> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    redirect("/login");
  }

  const decoded = await verifyAndDecodeToken(accessToken);

  if (!decoded || decoded.exp < Date.now() / 1000) {
    redirect("/login");
  }

  return { userId: decoded.userId, role: decoded.role };
}

export async function requireAdmin(): Promise<{
  userId: string;
  role: string;
}> {
  const { userId, role } = await requireAuth();

  if (role !== "ADMIN" && role !== "SUPER_ADMIN") {
    redirect("/member");
  }

  return { userId, role };
}

export async function requireSuperAdmin(): Promise<{
  userId: string;
  role: string;
}> {
  const { userId, role } = await requireAuth();

  if (role !== "SUPER_ADMIN") {
    redirect("/admin");
  }

  return { userId, role };
}

export async function getCurrentUser(): Promise<{
  id: string;
  email: string;
  role: string;
  name: string;
} | null> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return null;
  }

  const decoded = await verifyAndDecodeToken(accessToken);

  if (!decoded || decoded.exp < Date.now() / 1000) {
    return null;
  }

  return {
    id: decoded.userId,
    email: decoded.email,
    role: decoded.role,
    name: decoded.name,
  };
}

// For middleware - lightweight sync check
export function hasAuthCookieSync(): boolean {
  // This is a synchronous version - can't use await here
  // For middleware, use the async version with cookies().then()
  return false; // This should be implemented differently for middleware
}
