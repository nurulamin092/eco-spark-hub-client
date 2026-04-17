import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function requireAuth() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const sessionToken = cookieStore.get("better-auth.session_token")?.value;

  if (!accessToken && !sessionToken) {
    redirect("/login");
  }

  return true;
}

export async function requireAdmin() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const sessionToken = cookieStore.get("better-auth.session_token")?.value;
  const userRole = cookieStore.get("userRole")?.value;

  if (!accessToken && !sessionToken) {
    redirect("/login");
  }

  if (userRole !== "ADMIN" && userRole !== "SUPER_ADMIN") {
    redirect("/member");
  }

  return true;
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return null;
  }

  // Decode JWT to get user info (simplified)
  // In production, use a proper JWT library
  try {
    const payload = JSON.parse(atob(accessToken.split(".")[1]));
    return {
      id: payload.userId,
      email: payload.email,
      role: payload.role,
      name: payload.name,
    };
  } catch {
    return null;
  }
}
