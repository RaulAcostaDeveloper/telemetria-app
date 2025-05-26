"use server";

import { cookies } from "next/headers";

// Construye cookie al iniciar sesión (para validación server side)
export async function setAuthCookie(sessionToken: string) {
  const cookieStore = cookies();

  cookieStore.set("authToken", sessionToken, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });
}
