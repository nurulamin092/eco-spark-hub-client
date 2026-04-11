import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function requireAuth() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    redirect("/login");
  }

  return true;
}

export async function requireAdmin() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const userRole = cookieStore.get("userRole")?.value;

  if (!accessToken) {
    redirect("/login");
  }

  if (userRole !== "ADMIN" && userRole !== "SUPER_ADMIN") {
    redirect("/member/dashboard");
  }

  return true;
}
