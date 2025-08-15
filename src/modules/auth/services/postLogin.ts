import { getCached } from "@/globalConfig/cache/cache";

const url =
  "https://stage.transtelemetrix.com/api/management/authentication/login";

export async function postLogin(
  encrypted: string, //Cifrado de usuario y contraseña
  forceRefresh = true // No busque en caché
) {
  const key = `logIn`;

  const options: RequestInit = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ credentials: encrypted }),
  };

  // Retorna DATA del servidor y no debe regresar DATA de caché
  return getCached(
    key,
    async () => {
      const res = await fetch(url, options);
      if (!res.ok) {
        throw new Error("Error al obtener login");
      }

      return res.json();
    },
    forceRefresh
  );
}
