// Slice del servicio
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { SERVICE_STATUS } from "./types/serviceTypes";
import { getLastFuelReport } from "@/modules/fuel/services/lastFuelReport/lastFuelReport";
import { toLocalDateTime } from "@/global/utils/utils";

export const fetchLastFuelReport = createAsyncThunk(
  "lastFuelReportStatus/fetch",
  async ({ imei, logoutState }: { imei: string; logoutState: () => void }) => {
    return getLastFuelReport({ imei, logoutState });
  }
);

const lastFuelReportFormatter = (
  data: LastFuelReportData | null
): LastFuelReportData | null => {
  if (data && data.value) {
    return {
      ...data,
      value: {
        ...data.value,
        dateGps: toLocalDateTime(data.value.dateGps),
        dateSvr: toLocalDateTime(data.value.dateSvr),
        dateAvl: toLocalDateTime(data.value.dateAvl),
      },
    };
  }
  return null;
};

export interface LastFuelReportValues {
  id: string;
  lmId: string;
  accountId: number;
  deviceId: string;
  eventId: number;
  dateGps: string;
  dateSvr: string;
  lat: number;
  lon: number;
  address: string;
  speed: number;
  course: number;
  height: number;
  odometer: number;
  hourmeter: number | null;
  externalPower: number;
  bckBatPercentaje: number;
  ignition: boolean;
  tanksLevels: string | null;
  adcVoltages: string | null;
  canCurrentLevel: number;
  dateAvl: string;
  sensorCurrentLevel: number | null;
  maxFuelCapacity: number;
}

interface LastFuelReportData {
  statusCode: number;
  message: string;
  value: LastFuelReportValues | null;
}

interface InitialState {
  lastFuelReportData: LastFuelReportData | null;
  lastFuelReportStatus: SERVICE_STATUS;
}

const initialState: InitialState = {
  lastFuelReportData: null,
  lastFuelReportStatus: SERVICE_STATUS.idle,
};

const lastFuelReportSlice = createSlice({
  name: "lastFuelReport",
  initialState,
  reducers: {
    // Reiniciar el estado al desmontar el componente del reporte individual
    resetLastFuelReportSlice: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLastFuelReport.pending, (state) => {
        state.lastFuelReportStatus = SERVICE_STATUS.loading;
      })
      .addCase(fetchLastFuelReport.fulfilled, (state, action) => {
        state.lastFuelReportStatus = SERVICE_STATUS.succeeded;
        state.lastFuelReportData = lastFuelReportFormatter(action.payload);
      })
      .addCase(fetchLastFuelReport.rejected, (state) => {
        state.lastFuelReportStatus = SERVICE_STATUS.failed;
      });
  },
});

export const { resetLastFuelReportSlice } = lastFuelReportSlice.actions;

export default lastFuelReportSlice.reducer;
