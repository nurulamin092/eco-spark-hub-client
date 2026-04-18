import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify } from "jose";


export async function requireAuth() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    redirect("/login");
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(accessToken, secret);
  } catch {
    redirect("/login");
  }

  return true;
}

export async function requireAdmin() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    redirect("/login");
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(accessToken, secret);

    if (payload.role !== "ADMIN" && payload.role !== "SUPER_ADMIN") {
      redirect("/member");
    }
  } catch {
    redirect("/login");
  }

  return true;
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) return null;

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(accessToken, secret);

    return {
      id: payload.userId as string,
      name: payload.name as string,
      email: payload.email as string,
      role: payload.role as string,
    };
  } catch {
    return null;
  }
}
