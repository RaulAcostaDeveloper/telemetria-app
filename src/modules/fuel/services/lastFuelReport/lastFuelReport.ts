import { UseMiddlewareAfterFetch } from "@/modules/global/utils/useMiddlewareAfterFetch";

const url = process.env.NEXT_PUBLIC_URL_SERVICE + "/analytics/fuel/devices";

// Función fetch con enlace a caché
export function getLastFuelReport(
  imei: string,
  logoutState: () => void,
  forceRefresh = true // Se le puede indicar que no busque en caché
) {
  // Construcción de la url con parámetros
  const fullUrl = `${url}/${imei}/last-report`;
  const options: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };
  // Construcción del key único para caché
  const cacheKey = process.env.NEXT_PUBLIC_API_VERSION + `last-report-${imei}`;
  // Retorna DATA del servidor o DATA de caché
  return UseMiddlewareAfterFetch({
    cacheKey,
    fullUrl,
    options,
    logoutState,
    forceRefresh,
  });
}
