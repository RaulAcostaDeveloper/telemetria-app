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

// Estado inicial
const initialState: CalendarState = storedCalendar
  ? { ...storedCalendar, fixedFilter: storedCalendar.fixedFilter || "" }
  : {
      startDate: null,
      endDate: null,
      fixedFilter: "",
    };

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    // Guarda el rango y recorta el startDate a hoy–90 días si viene anterior a ese umbral
    setDateRange(
      state,
      action: PayloadAction<{ startDate: string; endDate: string }>
    ) {
      // 1) Calcular cutoff = hoy – 90 días
      const now = new Date();
      const cutoff = new Date(now);
      cutoff.setDate(now.getDate() - 90);

      // 2) Comparar incoming vs cutoff
      const incoming = new Date(action.payload.startDate);
      state.startDate =
        incoming < cutoff
          ? toLocalISOString(cutoff) // si es muy antiguo, guardo cutoff
          : action.payload.startDate; // si no, guardo la fecha tal cual

      // 3) Siempre guardo endDate sin modificaciones
      state.endDate = action.payload.endDate;

      // 4) Persisto en localStorage
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
