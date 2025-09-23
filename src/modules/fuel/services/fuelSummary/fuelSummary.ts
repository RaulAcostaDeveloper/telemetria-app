import { FetchProps } from "@/globalConfig/redux/types/serviceTypes";
import { middlewareAfterFetch } from "@/modules/global/utils/middlewareAfterFetch";

const url = process.env.NEXT_PUBLIC_URL_SERVICE + "/analytics/fuel/clients/me";

// Función fetch con enlace a caché
export async function getFuelSummary({
  startDate,
  endDate,
  logoutState,
}: FetchProps) {
  const performanceType = 1;

  // Construcción de la url con parámetros
  const fullUrl = `${url}/summary?startDate=${startDate}&endDate=${endDate}&performanceType=${performanceType}`;

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
    `fuelSummary-${startDate}-${endDate}-${performanceType}`;

  // Retorna DATA del servidor o DATA de caché
  return middlewareAfterFetch({
    cacheKey,
    fullUrl,
    options,
    logoutState,
  });
}
