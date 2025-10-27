import { useMemo, useRef } from "react";

type DepsRecord = Record<string, unknown>;

function summarize(v: unknown) {
  // Evita volcar arrays/objetos enormes en consola
  if (Array.isArray(v)) return { type: "array", length: v.length };
  if (v && typeof v === "object")
    return { type: "object", keys: Object.keys(v as object).length };
  return v;
}

export function useMemoDebugger<T>(
  label: string,
  factory: () => T,
  deps: DepsRecord
): T {
  const prevRef = useRef<DepsRecord | null>(null);

  // Comparación por Object.is en orden estable de claves
  const keys = Object.keys(deps);
  const willRecompute =
    !prevRef.current ||
    keys.length !== Object.keys(prevRef.current).length ||
    keys.some((k) => !Object.is(deps[k], prevRef.current![k]));

  if (willRecompute && prevRef.current) {
    const changes = keys
      .filter((k) => !Object.is(deps[k], prevRef.current![k]))
      .map((k) => ({
        dep: k,
        prev: summarize(prevRef.current![k]),
        next: summarize(deps[k]),
      }));

    // eslint-disable-next-line no-console
    console.groupCollapsed(`[useMemo] ${label} recompute`);
    // eslint-disable-next-line no-console
    console.table(changes);
    console.groupEnd();
  }

  const value = useMemo(
    factory,
    keys.map((k) => deps[k])
  );
  prevRef.current = deps;
  return value;
}

// Uso en el componente para debugear:
// const misDatos = useMemoDebugger(
//   "misDatos",
//   () => {
//     console.log("ejecución");
//     // ...
//     return /* valor */; // Mostrará una tabla con los responsables de la ejecución
//   },
//   {
//     LANGUAGE,
//     chargesData,
//     chargesTooltipFields,
//     dailyPerformancesData,
//     disChargesData,
//     dischargesTooltipFields,
//     fuelDataData,
//     handleClicGeoData,
//     levelMessagesCANData,
//     levelMessagesData,
//     levelMessagesTooltipFields,
//     performancesBetweenChargesData,
//     performancesBetweenChargesTooltipFields,
//     plotBands,
//   }
// );
