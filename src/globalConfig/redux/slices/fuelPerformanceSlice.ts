import { getFuelPerformance } from "@/modules/fuel/services/fuelPerformance/fuelPerformance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface FuelPerformanceValues {
  deviceId: string;
  distanceTraveled: number;
  finalFuel: number;
  fuelCharged: number;
  fuelConsumed: number;
  initialFuel: number;
  operationTime: number;
  performanceByDistance: number;
  performanceByTime: number;
}

interface Data {
  statusCode: number;
  message: string;
  value: FuelPerformanceValues;
}

interface InitialState {
  fuelPerformanceData: Data | null;
  fuelPerformanceStatus: string;
}

export const fetchFuelPerformance = createAsyncThunk(
  "fuelPerformance/fetch",
  async ({
    imei,
    startDate,
    endDate,
  }: {
    imei: string;
    startDate: string;
    endDate: string;
  }) => {
    return getFuelPerformance(imei, startDate, endDate);
  }
);

const initialState: InitialState = {
  fuelPerformanceData: null,
  fuelPerformanceStatus: "idle",
};

// Slice del servicio
const fuelPerformanceSlice = createSlice({
  name: "fuelPerformance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFuelPerformance.pending, (state) => {
        state.fuelPerformanceStatus = "loading";
      })
      .addCase(fetchFuelPerformance.fulfilled, (state, action) => {
        state.fuelPerformanceStatus = "succeeded";
        state.fuelPerformanceData = action.payload;
      })
      .addCase(fetchFuelPerformance.rejected, (state) => {
        state.fuelPerformanceStatus = "failed";
      });
  },
});

export default fuelPerformanceSlice.reducer;
