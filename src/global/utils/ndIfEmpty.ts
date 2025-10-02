import { PrimitiveValue } from "../components/table/table.model";

export const NO_DATA = "ND";

export function ndIfEmpty(value: PrimitiveValue | undefined): PrimitiveValue {
  if (value === undefined || value === null) return NO_DATA;
  if (typeof value === "string") {
    if (value.trim().length > 0 === false) {
      return NO_DATA;
    }
  }

  return value; // cualquier otro tipo distinto de null/undefined/string vacío
}
