import { FetchProps } from "@/global/redux/serviceSlices/types/serviceTypes";
import { middlewareAfterFetch } from "@/global/utils/middlewareAfterFetch";

const fullUrl = process.env.NEXT_PUBLIC_URL_SERVICE + "/management/vehicles";

// Función fetch con enlace a caché
export async function getVehiclesAll({ logoutState }: FetchProps) {
  // Esta url no requiere parámetros adicionales
  const options: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };

  // Construcción del key único para caché
  const cacheKey =
    process.env.NEXT_PUBLIC_API_VERSION + `managementVehiclesAll`;

  // Retorna DATA del servidor o DATA de caché
  return middlewareAfterFetch({
    cacheKey,
    fullUrl,
    options,
    forceRefresh: true,
    logoutState,
  });
}
