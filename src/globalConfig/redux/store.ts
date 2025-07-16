import { configureStore } from "@reduxjs/toolkit";

import authReducer from "@/globalConfig/redux/slices/authSlice";
import brandsSlice from "@/globalConfig/redux/slices/brandsSlice";
import calendarReducer from "@/globalConfig/redux/slices/calendarSlice";
import devicesSlice from "@/globalConfig/redux/slices/devicesSlice";
import driversSlice from "@/globalConfig/redux/slices/driversSlice";
import fuelDataSlice from "@/globalConfig/redux/slices/fuelDataSlice";
import fuelPerformanceSlice from "@/globalConfig/redux/slices/fuelPerformanceSlice";
import fuelSummaryReducer from "@/globalConfig/redux/slices/fuelSummarySlice";
import groupsSlice from "@/globalConfig/redux/slices/groupsSlice";
import languageReducer from "@/globalConfig/redux/slices/languageSlice";
import vehiclesSlice from "@/globalConfig/redux/slices/vehiclesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    brands: brandsSlice,
    calendar: calendarReducer,
    devices: devicesSlice,
    drivers: driversSlice,
    fuelData: fuelDataSlice,
    fuelPerformance: fuelPerformanceSlice,
    fuelSummary: fuelSummaryReducer,
    groups: groupsSlice,
    languageOption: languageReducer,
    vehicles: vehiclesSlice,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
