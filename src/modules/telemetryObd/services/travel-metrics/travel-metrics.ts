import { getCached } from "@/globalConfig/cache/cache";
const url = "https://stage.transtelemetrix.com/api/analytics/obd/device/";

// Función fetch con enlace a caché
export async function getObdTravelMetrics(
  deviceId: string,
  startDate: string,
  endDate: string
  // forceRefresh = true // Se le puede indicar que no busque en caché
) {
  // Construcción de la url con parámetros
  const fullUrl = `${url}${deviceId}/travel-metrics?startDate=${startDate}&endDate=${endDate}`;

  // Construcción del key único para caché
  const key =
    process.env.NEXT_PUBLIC_API_VERSION +
    `obdTravelMetrics-${deviceId}-${startDate}-${endDate}`;

  const options: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };

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
        throw new Error(
          "Error al obtener servicio de obd device travel metrics"
        );
      }
    }
    // forceRefresh
  );
}
