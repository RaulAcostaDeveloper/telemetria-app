import React from "react";

import { getCacheTable } from "@/globalConfig/cache/dexie";

// Usar esta función para formatear startDate y endDate del slice y usarla en el llamado de la API
export const formatIsoDate = (date: string): string => {
  const isoDate = new Date(date);

  // Obtiene componentes individuales en hora local
  const year = isoDate.getFullYear();
  const month = String(isoDate.getMonth() + 1).padStart(2, "0");
  const day = String(isoDate.getDate()).padStart(2, "0");
  const hours = String(isoDate.getHours()).padStart(2, "0");
  const minutes = String(isoDate.getMinutes()).padStart(2, "0");
  const seconds = String(isoDate.getSeconds()).padStart(2, "0");

  // Construye la cadena ISO 8601 para usarla en las APIS
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};

/**
 * Convierte una fecha a una cadena en formato ISO local.
 *
 * Esta función toma un objeto Date y devuelve una cadena formateada como ISO 8601,
 * teniendo en cuenta la zona horaria local.
 *
 * @param date - La fecha que se desea convertir.
 * @returns Cadena de fecha en formato ISO local.
 *
 * Ejemplo de uso:
 * const isoString = toLocalISOString(new Date());
 */
export const toLocalISOString = (date: Date): string => {
  const tzOffset = -date.getTimezoneOffset(); // Obtiene el desfase de la zona horaria en minutos.
  const diffSign = tzOffset >= 0 ? "+" : "-"; // Determina el signo según el desfase.
  const pad = (n: number) => n.toString().padStart(2, "0"); // Función auxiliar para llenar números con cero.
  return (
    date.getFullYear() +
    "-" +
    pad(date.getMonth() + 1) +
    "-" +
    pad(date.getDate()) +
    "T" +
    pad(date.getHours()) +
    ":" +
    pad(date.getMinutes()) +
    ":" +
    pad(date.getSeconds()) +
    diffSign +
    pad(Math.floor(Math.abs(tzOffset) / 60)) +
    ":" +
    pad(Math.abs(tzOffset) % 60)
  );
};

/**
 * Calcula el rango de fechas predefinido basado en una opción y la fecha actual.
 *
 * Esta función toma una cadena (por ejemplo, "Últimos 7 días") y la fecha de hoy,
 * y devuelve un objeto con dos propiedades: startDate y endDate, correspondientes al rango calculado.
 *
 * @param option - La opción predefinida seleccionada.
 * @param today - La fecha actual.
 * @returns Objeto con startDate y endDate.
 *
 * Ejemplo de uso:
 * const { startDate, endDate } = calculatePredefinedDateRange("Últimos 7 días", new Date());
 */
export const calculatePredefinedDateRange = (
  option: string,
  today: Date
): { startDate: Date; endDate: Date } => {
  let startDate: Date, endDate: Date;
  switch (option) {
    case "Últimos 7 días":
      startDate = new Date(today);
      startDate.setDate(today.getDate() - 7);
      endDate = today;
      break;
    case "Últimos 15 días":
      startDate = new Date(today);
      startDate.setDate(today.getDate() - 15);
      endDate = today;
      break;
    case "Últimos 30 días":
      startDate = new Date(today);
      startDate.setDate(today.getDate() - 30);
      endDate = today;
      break;
    case "Últimos 90 días":
      startDate = new Date(today);
      startDate.setDate(today.getDate() - 90);
      endDate = today;
      break;
    case "Este mes":
      startDate = new Date(today.getFullYear(), today.getMonth(), 1);
      endDate = today;
      break;
    case "El mes pasado":
      const firstDayCurrentMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        1
      );
      endDate = new Date(firstDayCurrentMonth);
      endDate.setDate(0); // El último día del mes anterior.
      startDate = new Date(endDate.getFullYear(), endDate.getMonth(), 1);
      break;
    default:
      startDate = today;
      endDate = today;
  }
  return { startDate, endDate };
};

/**
 * Manejador de eventos para incrementar o decrementar la hora usando las teclas de flecha.
 *
 * Esta función se utiliza en inputs de tipo número para actualizar la hora.
 * Al presionar la tecla ArrowUp incrementa el valor, y con ArrowDown lo decrementa,
 * considerando el formato de 12 horas (1 a 12).
 *
 * @param e - Evento de teclado en el input.
 * @param currentValue - Valor actual del input como cadena.
 * @param setter - Función para actualizar el valor del estado.
 *
 * Ejemplo de uso:
 * <input onKeyDown={(e) => handleHourKeyDown(e, hourValue, setHourValue)} ... />
 */
export const handleHourKeyDown = (
  e: React.KeyboardEvent<HTMLInputElement>,
  currentValue: string,
  setter: (value: string) => void
) => {
  if (e.key === "ArrowUp") {
    e.preventDefault();
    let value = parseInt(currentValue, 10);
    value = value === 12 ? 1 : value + 1;
    setter(value.toString().padStart(2, "0"));
  } else if (e.key === "ArrowDown") {
    e.preventDefault();
    let value = parseInt(currentValue, 10);
    value = value === 1 ? 12 : value - 1;
    setter(value.toString().padStart(2, "0"));
  }
};

/**
 * Manejador de eventos para incrementar o decrementar minutos o segundos usando las teclas de flecha.
 *
 * Funciona de forma similar a handleHourKeyDown, pero para valores que van de 0 a 59.
 *
 * @param e - Evento de teclado en el input.
 * @param currentValue - Valor actual del input como cadena.
 * @param setter - Función para actualizar el valor del estado.
 *
 * Ejemplo de uso:
 * <input onKeyDown={(e) => handleMinuteSecondKeyDown(e, minuteValue, setMinuteValue)} ... />
 */
export const handleMinuteSecondKeyDown = (
  e: React.KeyboardEvent<HTMLInputElement>,
  currentValue: string,
  setter: (value: string) => void
) => {
  if (e.key === "ArrowUp") {
    e.preventDefault();
    let value = parseInt(currentValue, 10);
    value = value === 59 ? 0 : value + 1;
    setter(value.toString().padStart(2, "0"));
  } else if (e.key === "ArrowDown") {
    e.preventDefault();
    let value = parseInt(currentValue, 10);
    value = value === 0 ? 59 : value - 1;
    setter(value.toString().padStart(2, "0"));
  }
};

/**
 * Formatea una fecha en el formato "día/mes/año".
 *
 * Útil para mostrar fechas al usuario de una forma sencilla y legible.
 *
 * @param date - La fecha a formatear.
 * @returns La fecha formateada como cadena.
 *
 * Ejemplo de uso:
 * const fechaFormateada = formatDate(new Date());
 */
export const formatDate = (date: Date): string =>
  `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

/**
 * Determina si una fecha es anterior a los últimos 90 días a partir de una fecha de referencia.
 *
 * Compara la fecha proporcionada con la fecha de hoy menos 90 días.
 *
 * @param date - La fecha a evaluar.
 * @param today - La fecha de referencia (generalmente la fecha actual).
 * @returns true si la fecha es anterior al límite de 90 días; de lo contrario, false.
 *
 * Ejemplo de uso:
 * const esAntigua = isPast90Days(new Date('2023-01-01'), new Date());
 */
export const isPast90Days = (date: Date, today: Date): boolean => {
  const past90Days = new Date(today);
  past90Days.setDate(today.getDate() - 90);
  return date < past90Days;
};

/**
 * Convierte una cadena ISO a "día/mes/año, hh:mm:ss AM"
 *
 * Esta función toma una cadena en formato ISO y la formatea en una cadena
 * que muestra la fecha y hora en formato local, usando el reloj de 12 horas.
 *
 * @param dateStr - Fecha en formato ISO.
 * @returns Fecha formateada como "día/mes/año, hh:mm:ss AM"
 */
export const formatDateTime = (dateStr: string): string => {
  const date = new Date(dateStr);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  if (hours === 0) hours = 12;
  const hourStr = String(hours).padStart(2, "0");

  return `${day}/${month}/${year}, ${hourStr}:${minutes}:${seconds} ${ampm}`;
};

// Limpiar elementos en caché que tengan más de una semana de vida
export async function cleanExpiredCache(): Promise<void> {
  const now = Date.now();
  const ttl = 7 * 24 * 60 * 60 * 1000; // 7 días
  const table = getCacheTable();

  try {
    const deletedCount = await table
      .where("timestamp")
      .below(now - ttl)
      .delete();
    console.log(
      `[CACHE CLEANUP] Eliminadas ${deletedCount} entradas expiradas.`
    );
  } catch (error) {
    console.error("[CACHE CLEANUP ERROR]", error);
  }
}
