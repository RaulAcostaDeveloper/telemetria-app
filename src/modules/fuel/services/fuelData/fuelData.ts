import { FetchProps } from "@/globalConfig/redux/types/serviceTypes";
import { middlewareAfterFetch } from "@/modules/global/utils/middlewareAfterFetch";

const url = process.env.NEXT_PUBLIC_URL_SERVICE + "/analytics/fuel/devices";

// Función fetch con enlace a caché
export async function getFuelData({
  imei,
  startDate,
  endDate,
  logoutState,
}: FetchProps) {
  // Construcción de la url con parámetros
  const fullUrl = `${url}/${imei}/data?startDate=${startDate}&endDate=${endDate}`;
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
    `fuelData-${imei}-${startDate}-${endDate}`;

  // Retorna DATA del servidor o DATA de caché
  return middlewareAfterFetch({
    cacheKey,
    fullUrl,
    options,
    logoutState,
  });
}
