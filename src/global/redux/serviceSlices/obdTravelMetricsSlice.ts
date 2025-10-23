import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { SERVICE_STATUS } from "./types/serviceTypes";
import { getObdTravelMetrics } from "@/modules/telemetryObd/services/travel-metrics/travel-metrics";
import { toLocalDateTime } from "@/global/utils/utils";

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
  maxSpeedAllowed: number | null;
  averageSpeed: number | null;
  totalIdleTime: number | null;
  totalEngineTime: number;
  totalDistanceTraveled: number | null;
  timeTraveledDetails: ObdTravelMetricsTimeTraveledDetails[];
}

interface ObdTravelMetricsData {
  statusCode: number;
  message: string;
  value: ObdTravelMetricsDataValues | null;
}

interface InitialState {
  obdTravelMetricsData: ObdTravelMetricsData | null;
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

const travelMetricsFormatter = (
  data: ObdTravelMetricsData | null
): ObdTravelMetricsData | null => {
  if (data && data.value) {
    const timeTraveledDetails = data.value.timeTraveledDetails.map(
      (messages) => ({
        ...messages,
        dateGPS: toLocalDateTime(messages.dateGPS),
      })
    );

    return {
      ...data,
      value: {
        ...data.value,
        timeTraveledDetails,
      },
    };
  }
  return null;
};

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
        state.obdTravelMetricsData = travelMetricsFormatter(action.payload);
      })
      .addCase(fetchObdTravelMetrics.rejected, (state) => {
        state.obdTravelMetricsStatus = SERVICE_STATUS.failed;
      });
  },
});

export const { resetObdTravelMetricsSlice } = obdTravelMetricsSlice.actions;

export default obdTravelMetricsSlice.reducer;
