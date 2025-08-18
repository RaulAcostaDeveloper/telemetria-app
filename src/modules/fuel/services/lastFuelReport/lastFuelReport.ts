import { getCached } from "@/globalConfig/cache/cache";

const url = "https://stage.transtelemetrix.com/api/analytics/fuel/devices";

// Función fetch con enlace a caché
export async function getLastFuelReport(
  imei: string,
  forceRefresh = true // Se le puede indicar que no busque en caché
) {
  // Construcción de la url con parámetros
  const fullUrl = `${url}/${imei}/lastFuelReport`;

  // Construcción del key único para caché
  const key = `lastFuelReport-${imei}`;

  // Retorna DATA del servidor o DATA de caché
  return getCached(
    key,
    async () => {
      const res = await fetch(fullUrl);
      if (!res.ok)
        throw new Error("Error al obtener último reporte de combustible");
      return res.json();
    },
    forceRefresh
  );
}
