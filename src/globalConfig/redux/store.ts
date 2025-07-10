import { configureStore } from "@reduxjs/toolkit";

import authReducer from "@/globalConfig/redux/slices/authSlice";
import calendarReducer from "@/globalConfig/redux/slices/calendarSlice";
import devicesSlice from "@/globalConfig/redux/slices/devicesSlice";
import driversSlice from "@/globalConfig/redux/slices/driversSlice";
import fuelMetricsSlice from "@/globalConfig/redux/slices/fuelMetricsSlice";
import fuelSummaryReducer from "@/globalConfig/redux/slices/fuelSummarySlice";
import groupsSlice from "@/globalConfig/redux/slices/groupsSlice";
import languageReducer from "@/globalConfig/redux/slices/languageSlice";
import vehiclesSlice from "@/globalConfig/redux/slices/vehiclesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    calendar: calendarReducer,
    devices: devicesSlice,
    drivers: driversSlice,
    fuelMetrics: fuelMetricsSlice,
    fuelSummary: fuelSummaryReducer,
    groups: groupsSlice,
    languageOption: languageReducer,
    vehicles: vehiclesSlice,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
