import { LanguageInterface } from "../language/constants/language.model";
import { statusNum } from "../redux/serviceSlices/devicesSlice";
import { NO_DATA } from "./ndIfEmpty";

export const toKebabCase = (str: string): string => {
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "");
};

/**
 * Convierte un número (puede tener decimales) a entero
 * y lo formatea con separadores de miles (comas).
 *
 * @param value - Número a formatear.
 * @returns Cadena con el número entero formateado, por ejemplo "41,231,212".
 */

export function formatNumberWithCommas(value: number): string {
  const intValue = Math.trunc(value);

  return intValue.toLocaleString("en-US");
}

/**
 * Traductor entre string de valor numérico y significado práctico
 * para el status de management devices
 *
 * @param status - cadena de texto con posible valor numérico que
 * será traducido en la funcion.
 * @returns string con la traducción realizada.
 */

export function deviceStatusTranslator(
  status: statusNum,
  LANGUAGE: LanguageInterface
) {
  let translatedStatus;
  switch (status) {
    case "0":
      translatedStatus = LANGUAGE.management.dataProvider.inactive;
      break;
    case "1":
      translatedStatus = LANGUAGE.management.dataProvider.active;
      break;
    default:
      translatedStatus = NO_DATA;
      break;
  }
  return translatedStatus;
}
