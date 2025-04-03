import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CalendarState {
  startDate: string | null;
  endDate: string | null;
}

const initialState: CalendarState = {
  startDate: null,
  endDate: null,
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    // Guarda el rango de fechas como dos valores ISO 8601
    setDateRange(
      state,
      action: PayloadAction<{ startDate: string; endDate: string }>
    ) {
      state.startDate = action.payload.startDate;
      state.endDate = action.payload.endDate;
    },
  },
});

export const { setDateRange } = calendarSlice.actions;
export default calendarSlice.reducer;
