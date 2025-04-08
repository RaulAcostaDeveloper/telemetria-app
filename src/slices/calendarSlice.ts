import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  localStorageGetItem,
  localStorageSetItem,
} from "@/modules/global/localStorage/utils/storageService";

// Definición de la interfaz que contiene el estado del calendario, incluyendo el filtro fijo.
export interface CalendarState {
  startDate: string | null;
  endDate: string | null;
  fixedFilter: string;
}

// Si estamos en el navegador, se intenta obtener el estado almacenado en localStorage.
const storedCalendar: CalendarState | null =
  typeof window !== "undefined"
    ? localStorageGetItem<CalendarState>("CALENDAR")
    : null;

// Estado inicial: si se encontró un estado guardado, se utiliza ese valor (asegurando que fixedFilter tenga un valor),
// de lo contrario se inicializan en null y una cadena vacía para el filtro.
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
    // Guarda el rango de fechas como dos valores ISO 8601 y actualiza el localStorage.
    setDateRange(
      state,
      action: PayloadAction<{ startDate: string; endDate: string }>
    ) {
      state.startDate = action.payload.startDate;
      state.endDate = action.payload.endDate;
      localStorageSetItem("CALENDAR", { ...state });
    },
    // Actualiza el filtro fijo (fixedFilter) y guarda la actualización en localStorage.
    setFixedFilter(state, action: PayloadAction<string>) {
      state.fixedFilter = action.payload;
      localStorageSetItem("CALENDAR", { ...state });
    },
  },
});

export const { setDateRange, setFixedFilter } = calendarSlice.actions;
export default calendarSlice.reducer;
