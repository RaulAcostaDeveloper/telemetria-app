import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { SERVICE_STATUS } from "./types/serviceTypes";
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
    return getObdTravelMetrics({ imei, startDate, endDate, logoutState });
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
  reducers: {
    // Reiniciar el estado al desmontar el componente del reporte individual
    resetObdTravelMetricsSlice: () => initialState,
  },
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

export const { resetObdTravelMetricsSlice } = obdTravelMetricsSlice.actions;

export default obdTravelMetricsSlice.reducer;
