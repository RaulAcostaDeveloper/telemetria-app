import Dexie, { Table } from "dexie";

// Librería para manejar grandes volúmenes de datos
export interface CacheEntry<T> {
  cacheKey: string;
  timestamp: number;
  data: T;
}

export interface CacheDBSchema {
  cache: CacheEntry<unknown>;
}

const db = new Dexie("ClientCacheDB");

// Formato para usarlo en caché
db.version(1).stores({
  cache: "key, timestamp",
});

// Exportar acceso a la tabla
export function getCacheTable<T>(): Table<CacheEntry<T>, string> {
  return db.table("cache") as Table<CacheEntry<T>, string>;
}
