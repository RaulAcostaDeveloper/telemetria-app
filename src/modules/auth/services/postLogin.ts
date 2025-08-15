//import encryptAesCbc from "@/modules/auth/components/authForm/cryptoReference";
import { getCached } from "@/globalConfig/cache/cache";

const url =
  "https://stage.transtelemetrix.com/api/management/authentication/login";

// Función fetch con enlace a caché
//export async function getFuelSummary(
export async function postLogin(
  encrypted: string, //cadena cifrada de usuario y contraseña
  forceRefresh = true // Se le indica que no busque en caché
) {
  // Construcción del key único para caché
  const key = `logIn`;

  const options: RequestInit = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include", // mover fuera de headers
    body: JSON.stringify({ encrypted }),
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
