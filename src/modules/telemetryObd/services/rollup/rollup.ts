import { getCached } from "@/globalConfig/cache/cache";
const url = "https://stage.transtelemetrix.com/api/analytics/obd/clients/";

// Función fetch con enlace a caché
export async function getObdRollup(
  accountId: string,
  startDate: string,
  endDate: string
  // forceRefresh = true // Se le puede indicar que no busque en caché
) {
  // Construcción de la url con parámetros
  const fullUrl = `${url}${accountId}/rollup?startDate=${startDate}&endDate=${endDate}`;

  // Construcción del key único para caché
  const key = `obdRollup-${accountId}-${startDate}-${endDate}`;

  const options: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    // credentials: "include",
  };

  // Retorna DATA del servidor o DATA de caché
  return getCached(
    key,
    async () => {
      const res = await fetch(fullUrl, options);
      if (!res.ok) {
        throw new Error("Error al obtener servicio de obd rollup");
      }
      return res.json();
    }
    // forceRefresh
  );
}
