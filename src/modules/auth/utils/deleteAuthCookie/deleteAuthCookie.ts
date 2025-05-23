"use server";

import { cookies } from "next/headers";

// Elimina cookies al cerrar sesión (para validación server side)
export async function deleteAuthCookie() {
  const cookieStore = cookies();

  cookieStore.set("authToken", "", {
    path: "/",
    maxAge: 0,
  });
}
