import { FetchProps } from "@/global/redux/serviceSlices/types/serviceTypes";
import { fetchMiddleware } from "@/global/utils/fetchMiddleware";

const url = "/analytics/fuel/devices";

// Función fetch con enlace a caché
export async function getLastFuelReport({ imei, logoutState }: FetchProps) {
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
  const cacheKey = `last-report-${imei}`;

  // Retorna DATA del servidor o DATA de caché
  return fetchMiddleware({
    cacheKey,
    fullUrl,
    options,
    forceRefresh: true,
    logoutState,
  });
}
