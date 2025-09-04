import { getCached } from "@/globalConfig/cache/cache";
const url = "https://stage.transtelemetrix.com/api/management/vehicles";

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
  return getCached(
    cacheKey,
    async () => {
      try {
        const response = await fetch(url, options);
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
        throw new Error("Error al obtener todos los vehiculos");
      }
    },
    forceRefresh // poner un forceRefresh en caso de necesitarlo
  );
}
