import { FetchProps } from "@/globalConfig/redux/types/serviceTypes";
import { middlewareAfterFetch } from "@/modules/global/utils/middlewareAfterFetch";

const url = process.env.NEXT_PUBLIC_URL_SERVICE + "/analytics/obd/clients/me";

// Función fetch con enlace a caché
export async function getObdRollup({
  startDate,
  endDate,
  logoutState,
}: FetchProps) {
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
  return middlewareAfterFetch({
    cacheKey,
    fullUrl,
    options,
    logoutState,
  });
}
