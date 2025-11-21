import { FetchProps } from "@/global/redux/serviceSlices/types/serviceTypes";
import { fetchMiddleware } from "@/global/utils/fetchMiddleware";

const url = "/analytics/zone";

// Función fetch con enlace a caché
export async function getZoneProfileDetails({ id, logoutState }: FetchProps) {
  // Construcción de la url con parámetros
  const fullUrl = `${url}/${id}/profile`;
  const options: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };
  // Construcción del key único para caché
  const cacheKey = `zoneProfileDetails-${id}`;

  // Retorna DATA del servidor o DATA de caché
  return fetchMiddleware({
    cacheKey,
    fullUrl,
    options,
    logoutState,
  });
}
