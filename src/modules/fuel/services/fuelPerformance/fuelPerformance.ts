import { getCached } from "@/globalConfig/cache/cache";

const url = "https://stage.transtelemetrix.com/api/analytics/fuel/devices";

// Función fetch con enlace a caché
export async function getFuelPerformance(
  imei: string,
  startDate: string,
  endDate: string
  //   forceRefresh = true // Se le puede indicar que no busque en caché
) {
  // Construcción de la url con parámetros
  const fullUrl = `${url}/${imei}/performance?startDate=${startDate}&endDate=${endDate}`;

  // Construcción del key único para caché
  const key = `fuelPerformance-${imei}-${startDate}-${endDate}`;

  // Retorna DATA del servidor o DATA de caché
  return getCached(
    key,
    async () => {
      const res = await fetch(fullUrl);
      if (!res.ok) throw new Error("Error al obtener datos del dispositivo");
      return res.json();
    }
    // forceRefresh
  );
}
