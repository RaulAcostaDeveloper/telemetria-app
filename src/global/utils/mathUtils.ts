export function getAverage(values: number[]): number {
  if (!values.length) return 0;

  const sum = values.reduce((acc, n) => acc + n, 0);
  const avg = sum / values.length;

  // Limitar a dos decimales
  return Number(avg.toFixed(2));
}

/**
 * Obtención de la mediana.
 *
 * El arreglo de valores debe venir ordenado.
 *
 * Contempla cuando el total de elementos es par e impar.
 *
 * @param orderedValues - Arreglo de números ordenado
 * @returns Valor de la mediana, con redorndeo a 2 decimales.
 */

export function getMedian2d(orderedValues: number[]): number {
  const arrLength = orderedValues.length;
  let final = 0;
  if (0 === arrLength % 2) {
    //Número par
    const half = arrLength / 2;
    final = (orderedValues[half - 1] + orderedValues[half]) / 2;
  } else {
    //Número non
    final = orderedValues[Math.ceil(arrLength / 2) - 1];
  }
  return parseFloat(final.toFixed(2));
}

/**
 * Trunca un número a 2 decimales y lo regresa en tipo string
 * Ej1: 10 --> 10.00, Ej2: 10.0999 --> 10.09
 * Útil para unificar esteticamente el tamaño numérico en una tabla.
 *
 * @param value - Número a formatear.
 * @returns Cadena con el número truncado a 2 digitos decimales
 */
export function format2DecimalsString(value: number): string {
  const trunc = Math.trunc(value * 100) / 100;
  return trunc.toFixed(2);
}

export const formatTankValuesToInt = (
  tanks?: string | null
): string | null | undefined => {
  if (!tanks) return tanks; // Devuelve Null

  // tanks pero enteros
  return tanks
    .split(",")
    .map((v) => Math.round(Number(v.trim())))
    .filter((v) => !Number.isNaN(v))
    .join(", ");
};
