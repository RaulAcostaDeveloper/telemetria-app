import Dexie from "dexie";

// Librería para manejar grandes volúmenes de datos
export interface CacheEntry<T = any> {
  key: string;
  timestamp: number;
  data: T;
}

const db = new Dexie("ClientCacheDB");

// Formato para usarlo en caché
db.version(1).stores({
  cache: "key, timestamp",
});

type CacheTable = Dexie.Table<CacheEntry, string>;

// Exportar acceso a la tabla
export const getCacheTable = (): CacheTable => {
  return db.table("cache") as CacheTable;
};
