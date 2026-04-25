// ============ src/lib/api/auth.guard.ts ============
import { cookies } from "next/headers";

// JWT decode for server-side
function decodeJWT(
  token: string,
): { role: string; exp: number; [key: string]: unknown } | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const payload = Buffer.from(parts[1], "base64").toString();
    const decoded = JSON.parse(payload);

    return {
      role: decoded.role || decoded.Role || decoded.userRole || "MEMBER",
      exp: decoded.exp || 0,
      ...decoded,
    };
  } catch (error) {
    console.error("Server JWT Decode failed:", error);
    return null;
  }
}

export interface AuthResult {
  authenticated: boolean;
  userId?: string;
  role?: string;
  redirect?: string;
}

export async function requireAuth(): Promise<AuthResult> {
  console.log("🔐 [auth.guard] requireAuth - Starting...");

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  let userRole = cookieStore.get("userRole")?.value;

  console.log(`🔐 [auth.guard] accessToken exists: ${!!accessToken}`);
  console.log(`🔐 [auth.guard] userRole cookie: ${userRole}`);

  if (!accessToken) {
    console.log("🔐 [auth.guard] No access token, redirecting to /login");
    return { authenticated: false, redirect: "/login" };
  }

  // If role cookie exists and is valid, use it
  const validRoles = ["SUPER_ADMIN", "ADMIN", "MODERATOR", "MEMBER"];
  if (userRole && validRoles.includes(userRole)) {
    console.log(`🔐 [auth.guard] Using cookie role: ${userRole}`);
    return { authenticated: true, role: userRole };
  }

  // Fallback: Decode role from token
  const decoded = decodeJWT(accessToken);
  if (decoded?.role) {
    userRole = decoded.role;
    console.log(`🔐 [auth.guard] Role extracted from token: ${userRole}`);

    // Set the role in response cookie for future requests
    const responseCookies = await import("next/headers").then((m) => m.cookies);
    (await responseCookies()).set("userRole", userRole, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      httpOnly: false,
      sameSite: "lax",
    });

    return { authenticated: true, role: userRole };
  }

  console.log("🔐 [auth.guard] No valid role found, redirecting to /login");
  return { authenticated: false, redirect: "/login" };
}

export async function requireAdmin(): Promise<AuthResult> {
  console.log("🔐 [auth.guard] requireAdmin - Checking admin authorization...");

  const auth = await requireAuth();

  if (!auth.authenticated) {
    return auth;
  }

  const isAdmin = auth.role === "ADMIN" || auth.role === "SUPER_ADMIN";

  if (!isAdmin) {
    console.log(
      `🔐 [auth.guard] Role ${auth.role} is not admin, redirecting to /member`,
    );
    return { authenticated: false, redirect: "/member" };
  }

  console.log("🔐 [auth.guard] Admin access granted");
  return { authenticated: true, role: auth.role };
}

export async function requireSuperAdmin(): Promise<AuthResult> {
  console.log("🔐 [auth.guard] requireSuperAdmin - Checking...");

  const auth = await requireAuth();

  if (!auth.authenticated) {
    return auth;
  }

  if (auth.role !== "SUPER_ADMIN") {
    console.log(`🔐 [auth.guard] Role ${auth.role} is not SUPER_ADMIN`);
    return { authenticated: false, redirect: "/admin" };
  }

  return { authenticated: true, role: auth.role };
}

// Helper function to use in Server Components
export async function getCurrentUser(): Promise<{
  id: string;
  email: string;
  role: string;
  name: string;
} | null> {
  const auth = await requireAuth();

  if (!auth.authenticated || !auth.role) {
    return null;
  }

  return {
    id: "server-auth",
    email: "",
    role: auth.role,
    name: "",
  };
}
