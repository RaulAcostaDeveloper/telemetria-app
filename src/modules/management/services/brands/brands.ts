import { getCached } from "@/globalConfig/cache/cache";
const url = "https://stage.transtelemetrix.com/api/management";

// Función fetch con enlace a caché
export async function getBrands(
  forceRefresh = true // Se le puede indicar que no busque en caché
) {
  // Construcción de la url con parámetros
  const fullUrl = `${url}/brands`;

  // Construcción del key único para caché
  const key = `managementBrands`;

  // Retorna DATA del servidor o DATA de caché
  return getCached(
    key,
    async () => {
      const res = await fetch(fullUrl);
      if (!res.ok) throw new Error("Error al obtener marcas de vehículos");
      return res.json();
    },
    forceRefresh // poner un forceRefresh en caso de necesitarlo
  );
}
