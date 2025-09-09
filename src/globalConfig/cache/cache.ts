import { getCacheTable } from "./dexie";

function dataHasCodeOrStatusCode(
  data: unknown
): data is { code: number; statusCode: number } {
  return (
    typeof (data as any).code === "number" ||
    typeof (data as any).statusCode === "number" // por eso es importante homologar
  );
}

// Función genérica de manejo de caché con dexie.js
export async function getCached<T>(
  key: string,
  fetcher: () => Promise<T>,
  forceRefresh = false
): Promise<T> {
  const now = Date.now();

  const table = getCacheTable<T>();
  const cached = await table.get(key);

  if (!forceRefresh && cached && now - cached.timestamp) {
    // Retorna data en caché
    return cached.data;
  }

  // Ejecuta la función fetch proporcionada
  const data = await fetcher();

  // Guarda en caché sólo si el código es 200
  if (
    dataHasCodeOrStatusCode(data) &&
    (data.code === 200 || data.statusCode === 200) && // por eso es importante homologar
    forceRefresh !== true
  ) {
    await table.put({ key, timestamp: now, data });
  }
  // Reemplaza los datos en caché
  return data;
}

// Función para eliminar un elemento de caché manualmente
export async function clearCache(key?: string) {
  const table = getCacheTable();
  if (key) {
    await table.delete(key);
  } else {
    await table.clear();
  }
}
