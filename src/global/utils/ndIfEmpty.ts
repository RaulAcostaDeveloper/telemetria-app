import { PrimitiveValue } from "../components/table/table.model";

export function ndIfEmpty(value: PrimitiveValue | undefined): PrimitiveValue {
  if (value === undefined || value === null) return "ND";
  if (typeof value === "string") {
    if (value.trim().length > 0 === false) {
      return "ND";
    }
  }

  return value; // cualquier otro tipo distinto de null/undefined/string vacío
}
