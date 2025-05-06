import { configureStore } from "@reduxjs/toolkit";

import calendarReducer from "@/globalConfig/redux/slices/calendarSlice";
import fuelSummaryReducer from "@/globalConfig/redux/slices/fuelSummarySlice";

export const store = configureStore({
  reducer: {
    calendar: calendarReducer,
    fuelSummary: fuelSummaryReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
