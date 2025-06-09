import { configureStore } from "@reduxjs/toolkit";

import authReducer from "@/globalConfig/redux/slices/authSlice";
import calendarReducer from "@/globalConfig/redux/slices/calendarSlice";
import fuelSummaryReducer from "@/globalConfig/redux/slices/fuelSummarySlice";
import languageReducer from "@/globalConfig/redux/slices/languageSlice";
import vehiclesSlice from "@/globalConfig/redux/slices/vehiclesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    calendar: calendarReducer,
    fuelSummary: fuelSummaryReducer,
    languageOption: languageReducer,
    vehicles: vehiclesSlice,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
