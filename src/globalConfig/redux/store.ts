import { configureStore } from "@reduxjs/toolkit";

import calendarReducer from "@/globalConfig/redux/slices/calendarSlice";
import fuelSummaryReducer from "@/globalConfig/redux/slices/fuelSummarySlice";
import languageReducer from "@/globalConfig/redux/slices/languageSlice";
import authReducer from "@/globalConfig/redux/slices/authSlice";

export const store = configureStore({
  reducer: {
    calendar: calendarReducer,
    fuelSummary: fuelSummaryReducer,
    languageOption: languageReducer,
    auth: authReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
