import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getObdTravelMetrics } from "@/modules/telemetryObd/services/travel-metrics/travel-metrics";

interface ObdTravelMetricsTimeTraveledDetails {
  lat: number;
  lon: number;
  dateGPS: string;
  course: number;
  speed: null | number;
  speeding: true;
  rpm: null | number;
  driverTime: null | number;
  driverDistance: null | number;
  driverIdleTime: null | number;
  totalEngineHours: null | number;
}

export interface ObdTravelMetricsDataValues {
  deviceID: string;
  totalTimeTraveled: null | number;
  rpmAverage: null | number;
  timeTraveledDetails: ObdTravelMetricsTimeTraveledDetails[];
}

interface Data {
  statusCode: number;
  message: string;
  value: null;
}

interface InitialState {
  obdTravelMetricsData: Data | null;
  obdTravelMetricsStatus: string;
}

export const fetchObdTravelMetrics = createAsyncThunk(
  "obdTravelMetrics/fetch",
  async ({
    deviceId,
    startDate,
    endDate,
  }: {
    deviceId: string;
    startDate: string;
    endDate: string;
  }) => {
    return getObdTravelMetrics(deviceId, startDate, endDate);
  }
);

const initialState: InitialState = {
  obdTravelMetricsData: null,
  obdTravelMetricsStatus: "idle",
};

// Slice del servicio
const obdTravelMetricsSlice = createSlice({
  name: "obdTravelMetrics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchObdTravelMetrics.pending, (state) => {
        state.obdTravelMetricsStatus = "loading";
      })
      .addCase(fetchObdTravelMetrics.fulfilled, (state, action) => {
        state.obdTravelMetricsStatus = "succeeded";
        state.obdTravelMetricsData = action.payload;
      })
      .addCase(fetchObdTravelMetrics.rejected, (state) => {
        state.obdTravelMetricsStatus = "failed";
      });
  },
});

export default obdTravelMetricsSlice.reducer;
