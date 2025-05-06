import { getCacheTable } from "./dexie";

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
  // Reemplaza los datos en caché
  await table.put({ key, timestamp: now, data });
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
