import { UseMiddlewareAfterFetch } from "@/modules/global/utils/useMiddlewareAfterFetch";
const url = process.env.NEXT_PUBLIC_URL_SERVICE + "/management/me";

// Función fetch con enlace a caché
export async function getGroups(
  logoutState: () => void,
  forceRefresh = true // Se le puede indicar que no busque en caché
) {
  // Construcción de la url con parámetros
  const fullUrl = `${url}/vehicles/groups`;
  const options: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };
  // Construcción del key único para caché
  const cacheKey = process.env.NEXT_PUBLIC_API_VERSION + `managementGroups`;

  // Retorna DATA del servidor o DATA de caché
  return UseMiddlewareAfterFetch({
    cacheKey,
    fullUrl,
    options,
    logoutState,
    forceRefresh,
  });
}
