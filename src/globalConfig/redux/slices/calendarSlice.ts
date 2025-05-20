import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  localStorageGetItem,
  localStorageSetItem,
} from "@/modules/global/localStorage/utils/storageService";
import { toLocalISOString } from "@/modules/global/utils/utils";

// Interfaz del estado
export interface CalendarState {
  startDate: string | null;
  endDate: string | null;
  fixedFilter: string;
}

// Carga desde localStorage (si existe)
const storedCalendar: CalendarState | null =
  typeof window !== "undefined"
    ? localStorageGetItem<CalendarState>("CALENDAR")
    : null;

// Aplica el clamp de 90 días al estado inicial si viene de localStorage
const initialState: CalendarState = (() => {
  // Base del estado (o lo guardado, o valores por defecto)
  const base: CalendarState = storedCalendar
    ? { ...storedCalendar, fixedFilter: storedCalendar.fixedFilter || "" }
    : { startDate: null, endDate: null, fixedFilter: "" };

  // Si hay startDate guardado, comprueba si debe recortarse
  if (base.startDate) {
    const now = new Date();
    const cutoff = new Date(now);
    cutoff.setDate(now.getDate() - 90);

    const saved = new Date(base.startDate);
    if (saved < cutoff) {
      base.startDate = toLocalISOString(cutoff);
    }
  }

  return base;
})();

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    // Guarda el rango y recorta el startDate a hoy–90 días si viene anterior al umbral
    setDateRange(
      state,
      action: PayloadAction<{ startDate: string; endDate: string }>
    ) {
      const now = new Date();
      const cutoff = new Date(now);
      cutoff.setDate(now.getDate() - 90);

      const incoming = new Date(action.payload.startDate);
      state.startDate =
        incoming < cutoff ? toLocalISOString(cutoff) : action.payload.startDate;

      state.endDate = action.payload.endDate;

      localStorageSetItem("CALENDAR", { ...state });
    },

    // Actualiza solo el filtro fijo
    setFixedFilter(state, action: PayloadAction<string>) {
      state.fixedFilter = action.payload;
      localStorageSetItem("CALENDAR", { ...state });
    },
  },
});

export const { setDateRange, setFixedFilter } = calendarSlice.actions;
export default calendarSlice.reducer;
