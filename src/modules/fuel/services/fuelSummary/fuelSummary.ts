import { getCached } from "@/globalConfig/cache/cache";

const url = "https://stage.transtelemetrix.com/api/analytics/fuel/clients";

// Función fetch con enlace a caché
export async function getFuelSummary(
  accountId: string,
  startDate: string,
  endDate: string,
  performanceType: string
  // forceRefresh = true // Se le puede indicar que no busque en caché
) {
  // Construcción de la url con parámetros
  const fullUrl = `${url}/${accountId}/summary?startDate=${startDate}&endDate=${endDate}&performanceType=${performanceType}`;

  // Construcción del key único para caché
  const key = `fuelSummary-${accountId}-${startDate}-${endDate}-${performanceType}`;

  // Retorna DATA del servidor o DATA de caché
  return getCached(
    key,
    async () => {
      const res = await fetch(fullUrl);
      if (!res.ok) throw new Error("Error al obtener vehículos");
      return res.json();
    }
    // forceRefresh
  );
}
