import { FetchProps } from "@/global/redux/serviceSlices/types/serviceTypes";
import { fetchMiddleware } from "@/global/utils/fetchMiddleware";

const url = "/analytics/zones";

// Función fetch con enlace a caché
export async function getZoneDetails({ id, logoutState }: FetchProps) {
  // Construcción de la url con parámetros
  const fullUrl = `${url}/${id}/details`;
  const options: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };
  // Construcción del key único para caché
  const cacheKey = `zoneDetails-${id}`;

  // Retorna DATA del servidor o DATA de caché
  return fetchMiddleware({
    cacheKey,
    fullUrl,
    options,
    logoutState,
  });
}
