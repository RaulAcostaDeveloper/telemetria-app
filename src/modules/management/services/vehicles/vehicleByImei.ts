import { FetchProps } from "@/global/redux/serviceSlices/types/serviceTypes";
import { fetchMiddleware } from "@/global/utils/fetchMiddleware";

const url = "/management/device/";

// Función fetch con enlace a caché
export async function getVehicleByImei({ imei, logoutState }: FetchProps) {
  // forceRefresh = true // Se le puede indicar que no busque en caché
  // Construcción de la url con parámetros
  const fullUrl = `${url}${imei}/vehicle`;

  const options: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };

  // Construcción del key único para caché
  const cacheKey = `managementVehicleByImei-${imei}`;

  // Retorna DATA del servidor o DATA de caché
  return fetchMiddleware({
    cacheKey,
    fullUrl,
    options,
    logoutState,
  });
}
