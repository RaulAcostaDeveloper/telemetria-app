import { FetchProps } from "@/global/redux/serviceSlices/types/serviceTypes";
import { middlewareAfterFetch } from "@/global/utils/middlewareAfterFetch";

const url = process.env.NEXT_PUBLIC_URL_SERVICE + "/management/device/";

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
  const cacheKey =
    process.env.NEXT_PUBLIC_API_VERSION + `managementVehicleByImei-${imei}`;

  // Retorna DATA del servidor o DATA de caché
  return middlewareAfterFetch({
    cacheKey,
    fullUrl,
    options,
    logoutState,
  });
}
