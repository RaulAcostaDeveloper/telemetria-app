import { getCached } from "@/globalConfig/cache/cache";

const url = "https://stage.transtelemetrix.com/api/analytics/fuel/clients";

// Función fetch con enlace a caché
export async function getTopFuelReport(
  accountId: string,
  numberOfVehicles: number,
  startDate: string,
  endDate: string,
  forceRefresh = true // Se le puede indicar que no busque en caché
) {
  // Construcción de la url con parámetros
  const fullUrl = `${url}/${accountId}/top/${numberOfVehicles}?startDate=${startDate}&endDate=${endDate}`;
  const options: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };
  // Construcción del key único para caché
  const key = `topFuelReport-${accountId}-${numberOfVehicles}-${startDate}-${endDate}`;

  // Retorna DATA del servidor o DATA de caché
  return getCached(
    key,
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
        throw new Error("Error al obtener top fuel report de combustible");
      }
    },
    forceRefresh
  );
}
