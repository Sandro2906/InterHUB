import { cookies } from "next/headers";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session_user");

  if (!session) return null;

  try {
    return JSON.parse(decodeURIComponent(session.value));
  } catch {
    return null;
  }
}