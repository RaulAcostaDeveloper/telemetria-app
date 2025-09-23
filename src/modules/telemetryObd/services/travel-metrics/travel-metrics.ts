import { FetchProps } from "@/globalConfig/redux/types/serviceTypes";
import { middlewareAfterFetch } from "@/modules/global/utils/middlewareAfterFetch";

const url = process.env.NEXT_PUBLIC_URL_SERVICE + "/analytics/obd/device/";

// Función fetch con enlace a caché
export async function getObdTravelMetrics({
  imei,
  startDate,
  endDate,
  logoutState,
}: FetchProps) {
  // Construcción de la url con parámetros
  const fullUrl = `${url}${imei}/travel-metrics?startDate=${startDate}&endDate=${endDate}`;

  // Construcción del key único para caché
  const cacheKey =
    process.env.NEXT_PUBLIC_API_VERSION +
    `obdTravelMetrics-${imei}-${startDate}-${endDate}`;

  const options: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };

  // Retorna DATA del servidor o DATA de caché
  return middlewareAfterFetch({
    cacheKey,
    fullUrl,
    options,
    logoutState,
  });
}
