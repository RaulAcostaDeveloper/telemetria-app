import { getCached } from "@/globalConfig/cache/cache";
const url = "https://stage.transtelemetrix.com/api/management/vehicles";

// Función fetch con enlace a caché
export async function getVehiclesAll(
  forceRefresh = true // Se le puede indicar que no busque en caché
) {
  // Esta url no requiere parámetros adicionales

  // Construcción del key único para caché
  const key = `managementVehiclesAll`;

  // Retorna DATA del servidor o DATA de caché
  return getCached(
    key,
    async () => {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Error al obtener todos los vehículos");
      return res.json();
    },
    forceRefresh // poner un forceRefresh en caso de necesitarlo
  );
}
