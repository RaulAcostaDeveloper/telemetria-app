import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getObdRollup } from "@/modules/telemetryObd/services/rollup/rollup";

interface ObdRollupDetails {
  averageSpeed: number;
  driverTime: number; // totalEngineHours
  // totalDistance
  // totalIdleHours (estacionado)
  imei: string;
  maxSpeed: number;
  name: string;
  plate: string;
}

interface ObdRollupDataValues {
  accountID: number;
  unitsAnalyzed: number;
  driverTime: number;
  driverDistance: number;
  details: ObdRollupDetails[];
}

interface Data {
  statusCode: number;
  message: string;
  value: ObdRollupDataValues;
}

interface InitialState {
  obdRollupData: Data | null;
  obdRollupStatus: string;
}

export const fetchObdRollup = createAsyncThunk(
  "obdRollup/fetch",
  async ({
    accountId,
    startDate,
    endDate,
  }: {
    accountId: string;
    startDate: string;
    endDate: string;
  }) => {
    return getObdRollup(accountId, startDate, endDate);
  }
);

const initialState: InitialState = {
  obdRollupData: null,
  obdRollupStatus: "idle",
};

// Slice del servicio
const obdRollupSlice = createSlice({
  name: "obdRollup",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchObdRollup.pending, (state) => {
        state.obdRollupStatus = "loading";
      })
      .addCase(fetchObdRollup.fulfilled, (state, action) => {
        state.obdRollupStatus = "succeeded";
        state.obdRollupData = action.payload;
      })
      .addCase(fetchObdRollup.rejected, (state) => {
        state.obdRollupStatus = "failed";
      });
  },
});

export default obdRollupSlice.reducer;
