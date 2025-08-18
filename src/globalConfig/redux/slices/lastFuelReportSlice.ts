// Slice del servicio
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getLastFuelReport } from "@/modules/fuel/services/lastFuelReport/lastFuelReport";

export const fetchLastFuelReport = createAsyncThunk(
  "lastFuelReportStatus/fetch",
  async ({ imei }: { imei: string }) => {
    return getLastFuelReport(imei);
  }
);

interface LastFuelReportStatus {
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
  hourmeter: number;
  externalPower: number;
  bckBatPercentaje: number;
  ignition: number;
  currentLevel: number;
  tanksLevels: string;
  adcVoltages: string;
}

interface Data {
  statusCode: number;
  message: string;
  value: LastFuelReportStatus;
}

interface InitialState {
  lastFuelReportData: Data | null;
  lastFuelReportStatus: string;
}

const initialState: InitialState = {
  lastFuelReportData: null,
  lastFuelReportStatus: "idle",
};

const lastFuelReportSlice = createSlice({
  name: "lastFuelReport",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLastFuelReport.pending, (state) => {
        state.lastFuelReportStatus = "loading";
      })
      .addCase(fetchLastFuelReport.fulfilled, (state, action) => {
        state.lastFuelReportStatus = "succeeded";
        state.lastFuelReportData = action.payload;
      })
      .addCase(fetchLastFuelReport.rejected, (state) => {
        state.lastFuelReportStatus = "failed";
      });
  },
});

export default lastFuelReportSlice.reducer;
