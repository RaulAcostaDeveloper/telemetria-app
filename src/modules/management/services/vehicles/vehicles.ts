import { getCached } from "@/globalConfig/cache/cache";
const url = process.env.NEXT_PUBLIC_URL_SERVICE + "/management/me";

// Función fetch con enlace a caché
export async function getVehicles(
  accountId: string,
  forceRefresh = true // Se le puede indicar que no busque en caché
) {
  // Construcción de la url con parámetros
  const fullUrl = `${url}/vehicles`;
  const options: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };
  // Construcción del key único para caché
  const cacheKey =
    process.env.NEXT_PUBLIC_API_VERSION + `managementVehicles-${accountId}`;

  // Retorna DATA del servidor o DATA de caché
  return getCached(
    cacheKey,
    async () => {
      try {
        const response = await fetch(fullUrl, options);
        const result =
          response.status === 200
            ? await response.json()
            : {
                code: response.status,
                message: response.statusText,
                value: null,
              };
        return result;
      } catch {
        throw new Error("Error al obtener vehículos");
      }
    },
    forceRefresh // poner un forceRefresh en caso de necesitarlo
  );
}
