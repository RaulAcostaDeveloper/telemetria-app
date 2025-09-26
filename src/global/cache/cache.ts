import { getCacheTable } from "./dexie";

const LIFE_TIME_CACHE = 1000 * 60 * 60 * 10; // 10 horas
export const ONE_HOUR = 1000 * 60 * 60;

interface Data {
  statusCode: number;
  message: string;
  value: unknown | null;
}

// Aquí se maneja la lógica del caché
export async function getCached(
  cacheKey: string,
  data: Data,
  forceRefresh = false
): Promise<Data> {
  const now = Date.now();

  const table = getCacheTable<Data>();
  const cacheData = await table.get(cacheKey);

  if (!forceRefresh && cacheData && now - cacheData.timestamp) {
    // Retorna data en caché
    return cacheData.data;
  }

  // Guardar en caché sólo si el código es 200
  if (data.statusCode === 200 && forceRefresh !== true) {
    // Guarda o eeemplaza los datos en caché
    await table.put({ cacheKey, timestamp: now, data });
  }
  return data;
}

// Eliminar un elemento de caché manualmente
export async function clearCacheByKey(cacheKey: string) {
  const table = getCacheTable();
  try {
    await table.delete(cacheKey);
  } catch (error) {
    console.error("No se encontró el Key del Caché ", cacheKey, " - ", error);
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
    console.error("[CACHE CLEANUP ERROR]", error);
  }
}
