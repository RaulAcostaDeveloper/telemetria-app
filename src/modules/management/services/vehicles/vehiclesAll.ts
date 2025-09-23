import { UseMiddlewareAfterFetch } from "@/modules/global/utils/useMiddlewareAfterFetch";
const fullUrl = process.env.NEXT_PUBLIC_URL_SERVICE + "/management/vehicles";

// Función fetch con enlace a caché
export async function getVehiclesAll(
  forceRefresh = true // Se le puede indicar que no busque en caché
) {
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
  return UseMiddlewareAfterFetch({
    cacheKey,
    fullUrl,
    options,
    forceRefresh,
  });
}
