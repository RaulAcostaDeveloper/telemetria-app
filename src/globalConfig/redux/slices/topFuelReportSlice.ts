import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
  totalLitersCharges: number;
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
  totalLitersDischarges: number;
}

interface TopFuelReportStatus {
  charges: ChargesTopReport[];
  discharges: DischargesTopReport[];
}

interface Data {
  statusCode: number;
  message: string;
  value: TopFuelReportStatus;
}

interface InitialState {
  topFuelReportData: Data | null;
  topFuelReportStatus: string;
}

const initialState: InitialState = {
  topFuelReportData: null,
  topFuelReportStatus: "idle",
};

export const fetchTopFuelReport = createAsyncThunk(
  "topFuelReportStatus/fetch",
  async ({
    accountId,
    numberOfVehicles,
    startDate,
    endDate,
  }: {
    accountId: string;
    numberOfVehicles: number;
    startDate: string;
    endDate: string;
  }) => {
    return getTopFuelReport(accountId, numberOfVehicles, startDate, endDate);
  }
);

const topFuelReportSlice = createSlice({
  name: "topFuelReport",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopFuelReport.pending, (state) => {
        state.topFuelReportStatus = "loading";
      })
      .addCase(fetchTopFuelReport.fulfilled, (state, action) => {
        state.topFuelReportStatus = "succeeded";
        state.topFuelReportData = action.payload;
      })
      .addCase(fetchTopFuelReport.rejected, (state) => {
        state.topFuelReportStatus = "failed";
      });
  },
});

export default topFuelReportSlice.reducer;
