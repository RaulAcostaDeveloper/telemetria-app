import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { SERVICE_STATUS } from "./types/serviceTypes";
import { getTopFuelReport } from "@/modules/fuel/services/topFuelReport/topFuelReport";

interface ChargesTopReport {
  id: string;
  name: string;
  plate: string;
  brand: string;
  model: string;
  group: string;
  driver: string;
  vehicleType: string;
  clientOwnerName: string;
  economicNumber: string;
  serialNumber: string;
  imeis: [string];
  totalNumberCharges: number;
  totalLitersCharges: number | null;
}

interface DischargesTopReport {
  id: string;
  name: string;
  plate: string;
  brand: string;
  model: string;
  group: string;
  driver: string;
  vehicleType: string;
  clientOwnerName: string;
  economicNumber: string;
  serialNumber: string;
  imeis: [string];
  totalNumberDischarges: number;
  totalLitersDischarges: number | null;
}

interface TopFuelReportStatus {
  charges: ChargesTopReport[];
  discharges: DischargesTopReport[];
}

interface Data {
  statusCode: number;
  message: string;
  value: TopFuelReportStatus | null;
}

interface InitialState {
  topFuelReportData: Data | null;
  topFuelReportStatus: SERVICE_STATUS;
}

const initialState: InitialState = {
  topFuelReportData: null,
  topFuelReportStatus: SERVICE_STATUS.idle,
};

export const fetchTopFuelReport = createAsyncThunk(
  "topFuelReportStatus/fetch",
  async ({
    startDate,
    endDate,
    logoutState,
  }: {
    startDate: string;
    endDate: string;
    logoutState: () => void;
  }) => {
    return getTopFuelReport({ startDate, endDate, logoutState });
  }
);

const topFuelReportSlice = createSlice({
  name: "topFuelReport",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopFuelReport.pending, (state) => {
        state.topFuelReportStatus = SERVICE_STATUS.loading;
      })
      .addCase(fetchTopFuelReport.fulfilled, (state, action) => {
        state.topFuelReportStatus = SERVICE_STATUS.succeeded;
        state.topFuelReportData = action.payload;
      })
      .addCase(fetchTopFuelReport.rejected, (state) => {
        state.topFuelReportStatus = SERVICE_STATUS.failed;
      });
  },
});

export default topFuelReportSlice.reducer;
