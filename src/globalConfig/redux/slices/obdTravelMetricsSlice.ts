import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { SERVICE_STATUS } from "../types/serviceTypes";
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
  value: ObdTravelMetricsDataValues | null;
}

interface InitialState {
  obdTravelMetricsData: Data | null;
  obdTravelMetricsStatus: SERVICE_STATUS;
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
  obdTravelMetricsStatus: SERVICE_STATUS.idle,
};

// Slice del servicio
const obdTravelMetricsSlice = createSlice({
  name: "obdTravelMetrics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchObdTravelMetrics.pending, (state) => {
        state.obdTravelMetricsStatus = SERVICE_STATUS.loading;
      })
      .addCase(fetchObdTravelMetrics.fulfilled, (state, action) => {
        state.obdTravelMetricsStatus = SERVICE_STATUS.succeeded;
        state.obdTravelMetricsData = action.payload;
      })
      .addCase(fetchObdTravelMetrics.rejected, (state) => {
        state.obdTravelMetricsStatus = SERVICE_STATUS.failed;
      });
  },
});

export default obdTravelMetricsSlice.reducer;
