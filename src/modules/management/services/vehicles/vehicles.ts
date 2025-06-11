import { getCached } from "@/globalConfig/cache/cache";
const url = "https://stage.transtelemetrix.com/api/management/";

// Función fetch con enlace a caché
export async function getVehicles(
  accountId: string,
  forceRefresh = true // Se le puede indicar que no busque en caché
) {
  // Construcción de la url con parámetros
  const fullUrl = `${url}${70675}/vehicles`;

  // Construcción del key único para caché
  const key = `managementVehicles-${accountId}`;

  // Retorna DATA del servidor o DATA de caché
  return getCached(
    key,
    async () => {
      const res = await fetch(fullUrl);
      if (!res.ok) throw new Error("Error al obtener vehículos");
      return res.json();
    },
    forceRefresh // poner un forceRefresh en caso de necesitarlo
  );
}
