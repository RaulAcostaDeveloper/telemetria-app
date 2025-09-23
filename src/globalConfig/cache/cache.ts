import { getCacheTable } from "./dexie";

const LIFE_TIME_CACHE = 1000 * 60 * 60 * 10;
export const ONE_HOUR = 1000 * 60 * 60;

// Función genérica de manejo de caché con dexie.js
export async function getCached<Data>(
  key: string,
  data: Data,
  forceRefresh = false
): Promise<Data> {
  const now = Date.now();

  const table = getCacheTable<Data>();
  const cached = await table.get(key);

  if (!forceRefresh && cached && now - cached.timestamp) {
    // Retorna data en caché
    return cached.data;
  }

  // Guarda en caché sólo si el código es 200
  if (
    dataHasStatusCode(data) &&
    data.statusCode === 200 && // por eso es importante homologar
    forceRefresh !== true
  ) {
    await table.put({ key, timestamp: now, data });
  }
  // Reemplaza los datos en caché
  return data;
}

// Función para eliminar un elemento de caché manualmente
export async function clearCacheByKey(key?: string) {
  const table = getCacheTable();
  if (key) {
    await table.delete(key);
  } else {
    console.error("No se encontró el Key del Caché ", key);
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

function dataHasStatusCode(
  data: unknown
): data is { code: number; statusCode: number } {
  return (
    typeof (data as any).statusCode === "number" // por eso es importante homologar
  );
}
