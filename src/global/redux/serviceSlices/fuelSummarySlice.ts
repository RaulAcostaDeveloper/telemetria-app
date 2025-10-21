import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { SERVICE_STATUS } from "./types/serviceTypes";
import { getFuelSummary } from "@/modules/fuel/services/fuelSummary/fuelSummary";
import { toLocalDateTime } from "@/global/utils/utils";

// Tipado de los datos
export interface Devices {
  imei: string;
  lastFuelLevel: number | null;
  lastReportDate: string | null;
  name: string;
  plate: string;
  fuelLoadCount: number | null;
  fuelUnloadCount: number | null;
  performanceOdometer: number | null;
  performanceHorometer: number;
  fuelLoaded: number | null;
  fuelUnloaded: number | null;
}

export interface SummaryFuelValues {
  clientId: number;
  unitsAnalyzed: number;
  inventory: number;
  performanceOdometer: number;
  performanceHorometer: number;
  fuelCharged: number;
  fuelDischarged: number;
  devices: Devices[];
  totalDistanceTraveled: number;
}

interface FuelSummaryData {
  statusCode: number;
  message: string;
  value: SummaryFuelValues | null;
}

interface InitialState {
  fuelSummaryData: FuelSummaryData | null;
  fuelSummaryStatus: SERVICE_STATUS;
}

// Función middleware de redux para interceptar con caché
export const fetchFuelSummary = createAsyncThunk(
  "fuelSummary/fetch",
  async ({
    startDate,
    endDate,
    logoutState,
  }: {
    startDate: string;
    endDate: string;
    logoutState: () => void;
  }) => {
    return getFuelSummary({ startDate, endDate, logoutState });
  }
);

const fuelSummaryFormatter = (
  data: FuelSummaryData | null
): FuelSummaryData | null => {
  if (data && data.value) {
    const devices = data.value.devices.map((messages) => ({
      ...messages,
      lastReportDate: toLocalDateTime(messages.lastReportDate ?? ""),
    }));

    return {
      ...data,
      value: {
        ...data.value,
        devices,
      },
    };
  }
  return null;
};

const initialState: InitialState = {
  fuelSummaryData: null,
  fuelSummaryStatus: SERVICE_STATUS.idle,
};

// Slice del servicio
const fuelSummarySlice = createSlice({
  name: "fuelSummary",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFuelSummary.pending, (state) => {
        state.fuelSummaryStatus = SERVICE_STATUS.loading;
      })
      .addCase(fetchFuelSummary.fulfilled, (state, action) => {
        state.fuelSummaryStatus = SERVICE_STATUS.succeeded;
        state.fuelSummaryData = fuelSummaryFormatter(action.payload);
      })
      .addCase(fetchFuelSummary.rejected, (state) => {
        state.fuelSummaryStatus = SERVICE_STATUS.failed;
      });
  },
});

export default fuelSummarySlice.reducer;
