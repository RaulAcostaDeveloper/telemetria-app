//import encryptAesCbc from "@/modules/auth/components/authForm/cryptoReference";
import { getCached } from "@/globalConfig/cache/cache";

const url =
  "https://stage.transtelemetrix.com/api/management/authentication/login";

// Función fetch con enlace a caché
//export async function getFuelSummary(
export async function getLoginAction(
  cypherUser: string,
  forceRefresh = true // Se le puede indicar que no busque en caché
) {
  // Construcción del key único para caché
  const key = `cacheLogIn`;

  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      credentials: "include",
    },
    body: cypherUser,
  };

  // Retorna DATA del servidor y no debe regresar DATA de caché
  return getCached(
    key,
    async () => {
      const res = await fetch(url, options);
      if (!res.ok) throw new Error("Error al obtener vehículos");
      return res.json();
    },
    forceRefresh
  );
}
