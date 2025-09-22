// Slice del servicio
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { SERVICE_STATUS } from "../types/serviceTypes";
import { getLastFuelReport } from "@/modules/fuel/services/lastFuelReport/lastFuelReport";
import { useAuth } from "@/modules/auth/utils";

export const fetchLastFuelReport = createAsyncThunk(
  "lastFuelReportStatus/fetch",
  async ({ imei }: { imei: string }) => {
    // Obtengo la funcion logoutState que ejecutaré en caso de codigo 401
    const { logoutState } = useAuth();
    return getLastFuelReport(imei, logoutState);
  }
);

export interface LastFuelReportData {
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
}

interface Data {
  statusCode: number;
  message: string;
  value: LastFuelReportData | null;
}

interface InitialState {
  lastFuelReportData: Data | null;
  lastFuelReportStatus: SERVICE_STATUS;
}

const initialState: InitialState = {
  lastFuelReportData: null,
  lastFuelReportStatus: SERVICE_STATUS.idle,
};

const lastFuelReportSlice = createSlice({
  name: "lastFuelReport",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLastFuelReport.pending, (state) => {
        state.lastFuelReportStatus = SERVICE_STATUS.loading;
      })
      .addCase(fetchLastFuelReport.fulfilled, (state, action) => {
        state.lastFuelReportStatus = SERVICE_STATUS.succeeded;
        state.lastFuelReportData = action.payload;
      })
      .addCase(fetchLastFuelReport.rejected, (state) => {
        state.lastFuelReportStatus = SERVICE_STATUS.failed;
      });
  },
});

export default lastFuelReportSlice.reducer;
