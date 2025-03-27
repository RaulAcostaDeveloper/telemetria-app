import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CalendarState {
  dateRangeSelected: string | null;
}

const initialState: CalendarState = {
  dateRangeSelected: null,
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setDateRangeSelected(state, action: PayloadAction<string>) {
      state.dateRangeSelected = action.payload;
    },
  },
});

export const { setDateRangeSelected } = calendarSlice.actions;

export default calendarSlice.reducer;
