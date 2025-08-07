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

function move3MonthsBack(fromDate: Date): string {
  const threeMonthsAgo = new Date(fromDate);
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

  // Asegurar que la hora sea 00:00:00
  threeMonthsAgo.setHours(0, 0, 0, 0);

  // Formatear como "YYYY-MM-DDT00:00:00"
  const year = threeMonthsAgo.getFullYear();
  const month = String(threeMonthsAgo.getMonth() + 1).padStart(2, "0"); // Los meses van de 0 a 11
  const day = String(threeMonthsAgo.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}T00:00:00`;
}

/**
 * Obtiene un valor de localStorage. Genera un default si no hay fecha.
 * Si tiene expiración y ya ha caducado, lo elimina y devuelve `null`.
 */
export const localStorageGetItem = <T>(key: string): T | null => {
  try {
    const item = localStorage.getItem(key);
    if (!item) {
      const presentTime = new Date();
      const defaultData = {
        key: "CALENDAR",
        value: {
          startDate: move3MonthsBack(presentTime),
          endDate: presentTime.toISOString().split("T")[0] + "T00:00:00",
        },
      };
      return defaultData.value as T;
    }

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
