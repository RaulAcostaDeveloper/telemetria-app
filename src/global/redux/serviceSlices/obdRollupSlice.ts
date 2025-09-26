import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { SERVICE_STATUS } from "./types/serviceTypes";
import { getObdRollup } from "@/modules/telemetryObd/services/rollup/rollup";

interface ObdRollupDetails {
  name: string;
  plate: string;
  driverDistance: null | number; // totalDistance
  averageSpeed: number;
  driverTime: number; // totalEngineHours
  driverIdleTime: number; // totalIdleHours (estacionado)
  maxSpeed: number;
  imei: string;
}

export interface ObdRollupDataValues {
  accountID: number;
  unitsAnalyzed: number;
  driverTime: number;
  driverDistance: number;
  driverIdleTime: null | number;
  details: ObdRollupDetails[];
}

interface Data {
  statusCode: number;
  message: string;
  value: ObdRollupDataValues | null;
}

interface InitialState {
  obdRollupData: Data | null;
  obdRollupStatus: SERVICE_STATUS;
}

export const fetchObdRollup = createAsyncThunk(
  "obdRollup/fetch",
  async ({
    startDate,
    endDate,
    logoutState,
  }: {
    startDate: string;
    endDate: string;
    logoutState: () => void;
  }) => {
    return getObdRollup({ startDate, endDate, logoutState });
  }
);

const initialState: InitialState = {
  obdRollupData: null,
  obdRollupStatus: SERVICE_STATUS.idle,
};

// Slice del servicio
const obdRollupSlice = createSlice({
  name: "obdRollup",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchObdRollup.pending, (state) => {
        state.obdRollupStatus = SERVICE_STATUS.loading;
      })
      .addCase(fetchObdRollup.fulfilled, (state, action) => {
        state.obdRollupStatus = SERVICE_STATUS.succeeded;
        state.obdRollupData = action.payload;
      })
      .addCase(fetchObdRollup.rejected, (state) => {
        state.obdRollupStatus = SERVICE_STATUS.failed;
      });
  },
});

export default obdRollupSlice.reducer;
