import { UseMiddlewareAfterFetch } from "@/modules/global/utils/useMiddlewareAfterFetch";
const url = process.env.NEXT_PUBLIC_URL_SERVICE + "/analytics/obd/clients/me";

// Función fetch con enlace a caché
export async function getObdRollup(
  logoutState: () => void,
  startDate: string,
  endDate: string
  // forceRefresh = true // Se le puede indicar que no busque en caché
) {
  // Construcción de la url con parámetros
  const fullUrl = `${url}/rollup?startDate=${startDate}&endDate=${endDate}`;

  // Construcción del key único para caché
  const cacheKey =
    process.env.NEXT_PUBLIC_API_VERSION + `obdRollup-${startDate}-${endDate}`;

  const options: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };

  // Retorna DATA del servidor o DATA de caché
  return UseMiddlewareAfterFetch({
    cacheKey,
    fullUrl,
    options,
    logoutState,
  });
}
