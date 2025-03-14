interface StorageItem<T> {
  value: T;
  expiry?: number; // Expiración opcional
}

// Clase para gestionar el LocalStorage

export class StorageService {
  /**
   * Guarda un valor en localStorage con una clave específica.
   * Si se proporciona `ttl`, se establece una fecha de expiración.
   */
  static setItem<T>(key: string, value: T, ttl?: number): void {
    try {
      const data: StorageItem<T> = { value };
      if (ttl) {
        data.expiry = Date.now() + ttl;
      }
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`Error guardando ${key} en localStorage`, error);
    }
  }

  /**
   * Obtiene un valor de localStorage.
   * Si tiene expiración y ya ha caducado, lo elimina y devuelve `null`.
   */
  static getItem<T>(key: string): T | null {
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
  }

  /**
   * Elimina un ítem específico de localStorage.
   */
  static removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * Limpia todo el localStorage.
   */
  static clearAllStorage(): void {
    localStorage.clear();
  }
}

// Ejemplo:
// const initialCalendarDate = { // obtenerlo del calendario
//  initialDate: "28-3-2025, 14:00:00",
//  endDate: "28-3-2025, 14:00:00"
// }
//
// Con expiración
// StorageService.setItem(STORAGE_KEYS.CALENDAR, initialCalendarDate, 3600000);
//
// Sin expiración
// StorageService.setItem(STORAGE_KEYS.CALENDAR, initialCalendarDate);
//
// Recuperar datos
// Primer render
// const calendarRangeStorage: CalendarInterface | null = StorageService.getItem(STORAGE_KEYS.CALENDAR);
// if (calendarRangeStorage !== null) {
//    // valor del estado local o global
//    setCalendarRange(calendarRangeStorage); // Del storage
//  } else {
//    setCalendarRange(initialCalendarDate); // Del valor predeterminado o inicial
//    StorageService.setItem(STORAGE_KEYS.CALENDAR, initialCalendarDate);
//  }
//
// Actualizar el LocalStorage
// Al cambiar el valor
// if (calendarRange !== null) {
//      StorageService.setItem(STORAGE_KEYS.CALENDAR, calendarRange);
// }
