import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  localStorageGetItem,
  localStorageSetItem,
} from "@/global/localStorage/utils/storageService";
import { STORAGE_KEYS } from "@/global/localStorage/constants/storageKeys";
import { toLocalISOString } from "@/global/utils/dateUtils";

// NOTA: startDate (desde) es la fecha más lejana. endDate (hasta) es la fecha más cercana.

// Interfaz del estado
export interface CalendarState {
  startDate: string;
  endDate: string;
  fixedFilter: string;
}

const initialState: CalendarState = (() => {
  const dateNow = new Date();
  const lastDayAllowed = new Date(dateNow);
  lastDayAllowed.setDate(dateNow.getDate() - 90);

  const storageCalendar = localStorageGetItem<CalendarState>(
    STORAGE_KEYS.CALENDAR
  );
  // Caso 1: storageCalendar no existe o trae fechas nulas
  if (
    !storageCalendar ||
    !storageCalendar.startDate ||
    !storageCalendar.endDate
  ) {
    localStorageSetItem(STORAGE_KEYS.CALENDAR, {
      startDate: toLocalISOString(lastDayAllowed),
      endDate: toLocalISOString(dateNow),
      fixedFilter: "",
    });
    return {
      startDate: toLocalISOString(lastDayAllowed),
      endDate: toLocalISOString(dateNow),
      fixedFilter: "",
    };
  }

  const calendarStart = new Date(storageCalendar.startDate);
  const calendarEnd = new Date(storageCalendar.endDate);

  // Caso 2: storageCalendar tiene fechas no permitidas (mayor a 90 días)
  if (calendarStart < lastDayAllowed || calendarEnd < lastDayAllowed) {
    localStorageSetItem(STORAGE_KEYS.CALENDAR, {
      startDate: toLocalISOString(lastDayAllowed),
      endDate: toLocalISOString(dateNow),
      fixedFilter: "",
    });
    return {
      startDate: toLocalISOString(lastDayAllowed),
      endDate: toLocalISOString(dateNow),
      fixedFilter: "",
    };
  }

  // Caso 3: storageCalendar es válido
  return {
    ...storageCalendar,
    fixedFilter: storageCalendar.fixedFilter || "", // Lo que tenga en fixedFilter o simplemente ""
  };
})();

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setDateRange(
      state,
      action: PayloadAction<{ startDate: string; endDate: string }>
    ) {
      const dateNow = new Date();
      const lastDayAllowed = new Date(dateNow);
      lastDayAllowed.setDate(dateNow.getDate() - 90);
      // Excepción de 1 día adicional para permitir seleccionar horas faltantes del día.
      // Ej: 90 dias atras a partir de las 11 horas de hoy, requieren 11 horas más =~ 1 día adicional.
      const lastDayAllowedPlus1 = new Date(dateNow);
      lastDayAllowedPlus1.setDate(dateNow.getDate() - 91);

      const incomingStartDate = new Date(action.payload.startDate);
      const incomingEndDate = new Date(action.payload.endDate);

      // Verifica que las fechas que vengan no sean mayor a 90 días
      state.startDate =
        incomingStartDate < lastDayAllowedPlus1
          ? toLocalISOString(lastDayAllowedPlus1)
          : action.payload.startDate;

      state.endDate =
        incomingEndDate < lastDayAllowed
          ? toLocalISOString(dateNow)
          : action.payload.endDate;

      localStorageSetItem(STORAGE_KEYS.CALENDAR, { ...state });
    },

    // Actualiza solo el filtro
    setFixedFilter(state, action: PayloadAction<string>) {
      state.fixedFilter = action.payload;
      localStorageSetItem(STORAGE_KEYS.CALENDAR, { ...state });
    },
  },
});

export const { setDateRange, setFixedFilter } = calendarSlice.actions;
export default calendarSlice.reducer;
