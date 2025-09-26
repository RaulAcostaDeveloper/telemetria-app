import { configureStore } from "@reduxjs/toolkit";

import authReducer from "@/global/redux/serviceSlices/authSlice";
import brandsSlice from "@/global/redux/serviceSlices/brandsSlice";
import calendarReducer from "@/global/redux/slices/calendarSlice";
import devicesSlice from "@/global/redux/serviceSlices/devicesSlice";
import driversSlice from "@/global/redux/serviceSlices/driversSlice";
import fuelDataSlice from "@/global/redux/serviceSlices/fuelDataSlice";
import fuelPerformanceSlice from "@/global/redux/serviceSlices/fuelPerformanceSlice";
import fuelSummaryReducer from "@/global/redux/serviceSlices/fuelSummarySlice";
import groupsSlice from "@/global/redux/serviceSlices/groupsSlice";
import languageReducer from "@/global/redux/slices/languageSlice";
import lastFuelReportSlice from "@/global/redux/serviceSlices/lastFuelReportSlice";
import logoutSlice from "@/global/redux/serviceSlices/logoutSlice";
import obdRollupSlice from "@/global/redux/serviceSlices/obdRollupSlice";
import obdTravelMetricsSlice from "@/global/redux/serviceSlices/obdTravelMetricsSlice";
import topFuelReportSlice from "@/global/redux/serviceSlices/topFuelReportSlice";
import vehicleByImeiSlice from "@/global/redux/serviceSlices/vehicleByImeiSlice";
import vehiclesAllSlice from "@/global/redux/serviceSlices/vehiclesAllSlice";
import vehiclesSlice from "@/global/redux/serviceSlices/vehiclesSlice";

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
    obdTravelMetrics: obdTravelMetricsSlice,
    topFuelReport: topFuelReportSlice,
    vehicleByImei: vehicleByImeiSlice,
    vehicles: vehiclesSlice,
    vehiclesAll: vehiclesAllSlice,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
