import { UseMiddlewareAfterFetch } from "@/modules/global/utils/useMiddlewareAfterFetch";

const url = process.env.NEXT_PUBLIC_URL_SERVICE + "/analytics/fuel/clients/me";

// Función fetch con enlace a caché
export async function getTopFuelReport(
  numberOfVehicles: number,
  startDate: string,
  endDate: string,
  forceRefresh = true // Se le puede indicar que no busque en caché
) {
  // Construcción de la url con parámetros
  const fullUrl = `${url}/top/${numberOfVehicles}?startDate=${startDate}&endDate=${endDate}`;
  const options: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };
  // Construcción del key único para caché
  const cacheKey =
    process.env.NEXT_PUBLIC_API_VERSION +
    `topFuelReport-${numberOfVehicles}-${startDate}-${endDate}`;

  // Retorna DATA del servidor o DATA de caché
  return UseMiddlewareAfterFetch({
    cacheKey,
    fullUrl,
    options,
    forceRefresh,
  });
}
