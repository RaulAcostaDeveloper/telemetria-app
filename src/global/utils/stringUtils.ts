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

/**
 * Construye una nueva cadena que agrega </br> cada que se supera la
 * longitud de la cadena en el numero dado por "position"
 * Ej: brEveryNPositions("abcdefghijklmnopqrstuvwxzy1234567890", 15)
 * Resultado: abcdefghijklmno</br>pqrstuvwxyz123</br>4567890
 * @param str - cadena de texto a alterar
 * @param position - Posición que usaremos como multiplo
 * @returns Cadena con adicion de </br> en cada posicion multiplo de position.
 */
export function brEveryNPositions(str: string, position: number) {
  let result = "";

  for (let i = 0; i < str.length; i++) {
    result += str[i];

    // Al llegar a tantos caracteres → agregar </br>
    if ((i + 1) % position === 0 && i !== str.length - 1) {
      result += "</br>";
    }
  }

  return result;
}
