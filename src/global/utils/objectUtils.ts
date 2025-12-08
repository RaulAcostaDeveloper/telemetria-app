/* Utilidades para manipulación de un objeto {} */

/**
 * Dado un primer objeto, crea un segundo objeto sin la propiedad especificada del primero.
 * Ejemplo de uso: const nuevoObjeto = omitProperty({ a: 1, b: 2, c: 3 }, "b");
 * @param obj El objeto base.
 * @param key USAR "propiedad" entre comillas o como string. La propiedad que no queremos copiar.
 * @returns El segundo objeto sin la propiedad especificada.
 */
export function omitProperty<T extends object, K extends keyof T>(
  obj: T,
  key: K
): Omit<T, K> {
  const { [key]: _, ...rest } = obj;
  return rest;
}
