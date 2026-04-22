// ============ src/lib/api/auth.guard.ts ============
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function requireAuth(): Promise<{ userId: string; role: string }> {
  console.log("🔐 [auth.guard] requireAuth - Starting...");

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const userRoleCookie = cookieStore.get("userRole")?.value;

  console.log(`🔐 [auth.guard] accessToken exists: ${!!accessToken}`);
  console.log(`🔐 [auth.guard] userRole cookie: ${userRoleCookie}`);

  if (!accessToken) {
    console.log("🔐 [auth.guard] No access token, redirecting to /login");
    redirect("/login");
  }

  if (
    userRoleCookie === "ADMIN" ||
    userRoleCookie === "SUPER_ADMIN" ||
    userRoleCookie === "MEMBER"
  ) {
    console.log(
      `🔐 [auth.guard] Authentication successful via cookie, role: ${userRoleCookie}`,
    );
    return { userId: "cookie-auth", role: userRoleCookie };
  }

  console.log("🔐 [auth.guard] No valid role, redirecting to /login");
  redirect("/login");
}

export async function requireAdmin(): Promise<{
  userId: string;
  role: string;
}> {
  console.log("🔐 [auth.guard] requireAdmin - Checking admin authorization...");

  const cookieStore = await cookies();
  const userRoleCookie = cookieStore.get("userRole")?.value;
  const accessToken = cookieStore.get("accessToken")?.value;

  console.log(`🔐 [auth.guard] userRole cookie: ${userRoleCookie}`);
  console.log(`🔐 [auth.guard] accessToken exists: ${!!accessToken}`);

  if (!accessToken) {
    console.log("🔐 [auth.guard] No access token, redirecting to /login");
    redirect("/login");
  }

  if (userRoleCookie === "ADMIN" || userRoleCookie === "SUPER_ADMIN") {
    console.log("🔐 [auth.guard] Admin access granted via cookie");
    return { userId: "cookie-auth", role: userRoleCookie };
  }

  console.log(
    `🔐 [auth.guard] Role ${userRoleCookie} is not admin, redirecting to /member`,
  );
  redirect("/member");
}

export async function requireSuperAdmin(): Promise<{
  userId: string;
  role: string;
}> {
  console.log("🔐 [auth.guard] requireSuperAdmin - Checking...");

  const cookieStore = await cookies();
  const userRoleCookie = cookieStore.get("userRole")?.value;
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    redirect("/login");
  }

  if (userRoleCookie === "SUPER_ADMIN") {
    console.log("🔐 [auth.guard] Super admin access granted");
    return { userId: "cookie-auth", role: userRoleCookie };
  }

  console.log(
    `🔐 [auth.guard] Role ${userRoleCookie} is not SUPER_ADMIN, redirecting to /admin`,
  );
  redirect("/admin");
}

export async function getCurrentUser(): Promise<{
  id: string;
  email: string;
  role: string;
  name: string;
} | null> {
  const cookieStore = await cookies();
  const userRoleCookie = cookieStore.get("userRole")?.value;
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken || !userRoleCookie) {
    return null;
  }

  return {
    id: "cookie-auth",
    email: "",
    role: userRoleCookie,
    name: "",
  };
}

export function hasAuthCookieSync(): boolean {
  return false;
}
