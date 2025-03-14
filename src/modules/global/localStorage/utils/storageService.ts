interface StorageItem<T> {
  value: T;
  expiry?: number; // Expiración opcional
}

// Clase para gestionar el LocalStorage

/**
 * Guarda un valor en localStorage con una clave específica.
 * Si se proporciona `ttl`, se establece una fecha de expiración.
 */
export const localStorageSetItem = <T>(
  key: string,
  value: T,
  ttl?: number
): void => {
  try {
    const data: StorageItem<T> = { value };
    if (ttl) {
      data.expiry = Date.now() + ttl;
    }
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error guardando ${key} en localStorage`, error);
  }
};

/**
 * Obtiene un valor de localStorage.
 * Si tiene expiración y ya ha caducado, lo elimina y devuelve `null`.
 */
export const localStorageGetItem = <T>(key: string): T | null => {
  try {
    const item = localStorage.getItem(key);
    if (!item) return null;

    const data: StorageItem<T> = JSON.parse(item);

    if (data.expiry && Date.now() > data.expiry) {
      localStorage.removeItem(key);
      return null;
    }

    return data.value;
  } catch (error) {
    console.error(`Error obteniendo ${key} de localStorage`, error);
    return null;
  }
};

/**
 * Elimina un ítem específico de localStorage.
 */
export const localStorageRemoveItem = (key: string): void => {
  localStorage.removeItem(key);
};

/**
 * Cuidado: Limpia todo el localStorage.
 */
export const localStorageClearAllStorage = (): void => {
  localStorage.clear();
};

// Ejemplo:
// const initialCalendarDate = { // obtenerlo del calendario
//  initialDate: "28-3-2025, 14:00:00",
//  endDate: "28-3-2025, 14:00:00"
// }
//
// Con expiración
// localStorageSetItem(STORAGE_KEYS.CALENDAR, initialCalendarDate, 3600000);
//
// Sin expiración
// localStorageSetItem(STORAGE_KEYS.CALENDAR, initialCalendarDate);
//
// Recuperar datos
// Primer render
// const calendarRangeStorage: CalendarInterface | null = localStorageGetItem(STORAGE_KEYS.CALENDAR);
// if (calendarRangeStorage !== null) {
//    // valor del estado local o global
//    setCalendarRange(calendarRangeStorage); // Del storage
//  } else {
//    setCalendarRange(initialCalendarDate); // Del valor predeterminado o inicial
//    localStorageSetItem(STORAGE_KEYS.CALENDAR, initialCalendarDate);
//  }
//
// Actualizar el LocalStorage
// Al cambiar el valor
// if (calendarRange !== null) {
//      localStorageSetItem(STORAGE_KEYS.CALENDAR, calendarRange);
// }
