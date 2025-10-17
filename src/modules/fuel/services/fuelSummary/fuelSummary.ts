import { FetchProps } from "@/global/redux/serviceSlices/types/serviceTypes";
import { fetchMiddleware } from "@/global/utils/fetchMiddleware";

const url = "/analytics/fuel/clients/me";

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
  const cacheKey = `fuelSummary-${startDate}-${endDate}-${performanceType}`;

  // Retorna DATA del servidor o DATA de caché
  return fetchMiddleware({
    cacheKey,
    fullUrl,
    options,
    logoutState,
  });
}
