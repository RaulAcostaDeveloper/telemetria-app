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
import lastFuelReportSlice from "@/globalConfig/redux/slices/lastFuelReportSlice";
import logoutSlice from "@/globalConfig/redux/slices/logoutSlice";
import obdRollupSlice from "@/globalConfig/redux/slices/obdRollupSlice";
import testSessionSlice from "@/globalConfig/redux/slices/testSessionSlice";
import topFuelReportSlice from "@/globalConfig/redux/slices/topFuelReportSlice";
import vehicleByImeiSlice from "@/globalConfig/redux/slices/vehicleByImeiSlice";
import vehiclesAllSlice from "@/globalConfig/redux/slices/vehiclesAllSlice";
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
    lastFuelReport: lastFuelReportSlice,
    logoutSlice: logoutSlice,
    obdRollup: obdRollupSlice,
    testSession: testSessionSlice,
    topFuelReport: topFuelReportSlice,
    vehicleByImei: vehicleByImeiSlice,
    vehicles: vehiclesSlice,
    vehiclesAll: vehiclesAllSlice,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
