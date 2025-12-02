import React from "react";

// Usar esta función para formatear startDate y endDate del slice y usarla en el llamado de la API
// También es UTC
export const formatToLocalIso8601 = (input: string | Date): string => {
  const date = typeof input === "string" ? new Date(input) : new Date(input);

  if (Number.isNaN(date.getTime())) {
    throw new Error("Invalid date");
  }

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};

export function toLocalDateTime(isoDate: string): string {
  if (typeof isoDate !== "string") {
    console.warn("toLocalDateTime: isoDate debe ser una cadena.");
    return isoDate;
  }

  const input = isoDate.trim();

  // En caso de que venga la fecha-sola devolver 0 0 0 am
  const dateOnly = /^(\d{4})-(\d{2})-(\d{2})$/.exec(input);

  if (dateOnly) {
    const [, y, m, d] = dateOnly;
    const local = new Date(Number(y), Number(m) - 1, Number(d), 0, 0, 0); // local time
    return formatLocal(local);
  }

  const hasTZ = /([zZ]|[+\-]\d{2}:\d{2})$/.test(isoDate.trim());

  const normalized = hasTZ ? isoDate : `${isoDate}Z`;

  const date = new Date(normalized);

  if (Number.isNaN(date.getTime())) {
    console.warn(`Fecha inválida: "${isoDate}"`);
    return isoDate;
  }

  return formatLocal(date);
}

function formatLocal(date: Date) {
  const pad2 = (n: number) => String(n).padStart(2, "0");

  // Soporta 0000 y años negativos
  const year = date.getFullYear();
  const abs = Math.abs(year);
  const yearStr = (year < 0 ? "-" : "") + String(abs).padStart(4, "0");

  const MM = pad2(date.getMonth() + 1);
  const dd = pad2(date.getDate());
  const HH = pad2(date.getHours());
  const mm = pad2(date.getMinutes());
  const ss = pad2(date.getSeconds());

  return `${yearStr}-${MM}-${dd}T${HH}:${mm}:${ss}`;
}

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
  indexOption: number,
  today: Date
): { startDate: Date; endDate: Date } => {
  let startDate: Date, endDate: Date;
  switch (indexOption) {
    case 0: // Últimos 7 días
      startDate = new Date(today);
      startDate.setDate(today.getDate() - 7);
      startDate.setHours(0, 0, 0);
      endDate = today;
      break;
    case 1: // Últimos 15 días
      startDate = new Date(today);
      startDate.setDate(today.getDate() - 15);
      startDate.setHours(0, 0, 0);
      endDate = today;
      break;
    case 2: // Últimos 30 días
      startDate = new Date(today);
      startDate.setDate(today.getDate() - 30);
      startDate.setHours(0, 0, 0);
      endDate = today;
      break;
    case 3: // Últimos 90 días
      startDate = new Date(today);
      startDate.setDate(today.getDate() - 90);
      //Existe una restricción para no pasarse de 90 dias, por lo que
      //las horas adicionales se agregan con 1 día más en calendarSlice.
      startDate.setHours(0, 0, 0);
      endDate = today;
      break;
    case 4: // Este mes
      startDate = new Date(today.getFullYear(), today.getMonth(), 1);
      endDate = today;
      break;
    case 5: // El mes pasado
      const firstDayCurrentMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        1
      );
      endDate = new Date(firstDayCurrentMonth);
      endDate.setDate(0); // El último día del mes anterior.
      endDate.setHours(23, 59, 59);
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

export interface TimeParts {
  hour: string;
  minute: string;
  second: string;
  meridiem: "AM" | "PM";
}

/**
 * Dado un Date, devuelve sus piezas de hora en formato 12h, con cero-padding.
 */
export function parseTime(date: Date): TimeParts {
  const h24 = date.getHours();
  const hour12 = h24 % 12 || 12;
  const hour = String(hour12).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  const second = String(date.getSeconds()).padStart(2, "0");
  const meridiem = h24 >= 12 ? "PM" : "AM";
  return { hour, minute, second, meridiem };
}

export function removeTimeAfterCommaOrT(time: string) {
  const positionT = time.indexOf("T");
  const positionComma = time.indexOf(",");
  if (positionT > 0) {
    return time.slice(0, positionT);
  } else if (positionComma > 0) {
    return time.slice(0, positionComma);
  } else {
    return time;
  }
}

export const hasLessThanOneDay = (startDate: string, endDate: string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffMs = end.getTime() - start.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  return !(diffDays > 1);
};

export const legibleDate = (date: Date, locale: string): string => {
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
  // Falta que ponga también la hora si viene
};
