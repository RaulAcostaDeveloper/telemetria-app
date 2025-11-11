import { getCacheTable } from "./dexie";

const LIFE_TIME_CACHE = 1000 * 60 * 60 * 10; // 10 horas
export const ONE_HOUR = 1000 * 60 * 60;

interface Data {
  statusCode: number;
  message: string;
  value: unknown | null;
}

// Aquí se maneja la lógica para obtener de caché
export async function getCached(
  cacheKey: string,
  forceRefresh = false
): Promise<Data | null> {
  const now = Date.now();

  const table = getCacheTable<Data>();
  const cacheData = await table.get(cacheKey);

  if (!forceRefresh && cacheData && now - cacheData.timestamp) {
    // Retorna data en caché
    return cacheData.fetchData;
  } else {
    return null;
  }
}

// Aquí se maneja la lógica para guardar en caché
export async function putCache(
  cacheKey: string,
  fetchData: Data,
  forceRefresh = false
) {
  const now = Date.now();
  const table = getCacheTable<Data>();

  // Guardar en caché sólo si el código es 200
  if (fetchData.statusCode === 200 && forceRefresh !== true) {
    // Guarda o eeemplaza los datos en caché
    await table.put({ key: cacheKey, timestamp: now, fetchData });
  }
  return fetchData;
}

// Eliminar un elemento de caché manualmente
export async function clearCacheByKey(cacheKey: string) {
  const table = getCacheTable();
  try {
    await table.delete(cacheKey);
  } catch (error) {
    console.warn("No se encontró el Key del Caché ", cacheKey, " - ", error);
  }
}

// Limpiar elementos en caché que tengan más de 10 horas de vida
export async function cleanExpiredCache(): Promise<void> {
  const now = Date.now();
  const table = getCacheTable();

  try {
    const deletedCount = await table
      .where("timestamp")
      .below(now - LIFE_TIME_CACHE)
      .delete();
    console.log(
      `[CACHE CLEANUP] Eliminadas ${deletedCount} entradas expiradas.`
    );
  } catch (error) {
    console.warn("[CACHE CLEANUP ERROR]", error);
  }
}
