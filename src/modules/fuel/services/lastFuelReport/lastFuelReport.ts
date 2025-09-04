import { getCached } from "@/globalConfig/cache/cache";

const url = "https://stage.transtelemetrix.com/api/analytics/fuel/devices";

// Función fetch con enlace a caché
export async function getLastFuelReport(
  imei: string,
  forceRefresh = true // Se le puede indicar que no busque en caché
) {
  // Construcción de la url con parámetros
  const fullUrl = `${url}/${imei}/last-report`;
  const options: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };
  // Construcción del key único para caché
  const cacheKey = process.env.API_VERSION + `last-report-${imei}`;

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
        throw new Error("Error al obtener último reporte de combustible");
      }
    },
    forceRefresh
  );
}
