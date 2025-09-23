import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { SERVICE_STATUS } from "../types/serviceTypes";
import { getTopFuelReport } from "@/modules/fuel/services/topFuelReport/topFuelReport";
import { useAuth } from "@/modules/auth/utils";

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
    numberOfVehicles,
    startDate,
    endDate,
  }: {
    numberOfVehicles: number;
    startDate: string;
    endDate: string;
  }) => {
    const { logoutState } = useAuth();
    return getTopFuelReport(logoutState, numberOfVehicles, startDate, endDate);
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
