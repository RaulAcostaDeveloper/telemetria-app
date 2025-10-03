import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { SERVICE_STATUS } from "./types/serviceTypes";
import { getFuelPerformance } from "@/modules/fuel/services/fuelPerformance/fuelPerformance";

export interface FuelPerformanceValues {
  deviceId: string;
  distanceTraveled: number | null;
  finalFuel: number | null;
  fuelCharged: number | null;
  fuelConsumed: number | null;
  initialFuel: number | null;
  operationTime: number;
  performanceByDistance: number;
  performanceByTime: number;
  fuelDischarged: number;
}

interface Data {
  statusCode: number;
  message: string;
  value: FuelPerformanceValues | null;
}

interface InitialState {
  fuelPerformanceData: Data | null;
  fuelPerformanceStatus: SERVICE_STATUS;
}

export const fetchFuelPerformance = createAsyncThunk(
  "fuelPerformance/fetch",
  async ({
    imei,
    startDate,
    endDate,
    logoutState,
  }: {
    imei: string;
    startDate: string;
    endDate: string;
    logoutState: () => void;
  }) => {
    return getFuelPerformance({ imei, startDate, endDate, logoutState });
  }
);

const initialState: InitialState = {
  fuelPerformanceData: null,
  fuelPerformanceStatus: SERVICE_STATUS.idle,
};

// Slice del servicio
const fuelPerformanceSlice = createSlice({
  name: "fuelPerformance",
  initialState,
  reducers: {
    // Reiniciar el estado al desmontar el componente del reporte individual
    resetfuelPerformanceSlice: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFuelPerformance.pending, (state) => {
        state.fuelPerformanceStatus = SERVICE_STATUS.loading;
      })
      .addCase(fetchFuelPerformance.fulfilled, (state, action) => {
        state.fuelPerformanceStatus = SERVICE_STATUS.succeeded;
        state.fuelPerformanceData = action.payload;
      })
      .addCase(fetchFuelPerformance.rejected, (state) => {
        state.fuelPerformanceStatus = SERVICE_STATUS.failed;
      });
  },
});

export const { resetfuelPerformanceSlice } = fuelPerformanceSlice.actions;

export default fuelPerformanceSlice.reducer;
