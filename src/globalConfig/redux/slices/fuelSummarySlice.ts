import { getFuelSummary } from "@/modules/fuel/services/fuelSummary/fuelSummary";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Tipado de los datos
interface Devices {
  imei: string;
  lastFuelLevel: number;
  lastReportDate: string;
  name: string;
  plate: string;
  fuelLoadCount: string;
  fuelUnloadCount: number;
  performanceOdometer: number;
  performanceHorometer: boolean;
  fuelLoaded: string;
  fuelUnloaded: number;
}

interface Values {
  clientId: number;
  unitsAnalyzed: number;
  inventory: number;
  performanceOdometer: number;
  performanceHorometer: number;
  fuelCharged: number;
  fuelDischarged: number;
  devices: Devices[];
}

interface Data {
  statusCode: number;
  message: string;
  value: Values;
}

interface InitialState {
  fuelSummaryData: Data | null;
  fuelSummaryStatus: string;
}

// Función middleware de redux para interceptar con caché
export const fetchFuelSummary = createAsyncThunk(
  "fuelSummary/fetch",
  async ({
    accountId,
    startDate,
    endDate,
    performanceType,
  }: {
    accountId: string;
    startDate: string;
    endDate: string;
    performanceType: string;
  }) => {
    return getFuelSummary(accountId, startDate, endDate, performanceType);
  }
);

const initialState: InitialState = {
  fuelSummaryData: null,
  fuelSummaryStatus: "idle",
};

// Slice del servicio
const fuelSummarySlice = createSlice({
  name: "fuelSummary",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFuelSummary.pending, (state) => {
        state.fuelSummaryStatus = "loading";
      })
      .addCase(fetchFuelSummary.fulfilled, (state, action) => {
        state.fuelSummaryStatus = "succeeded";
        state.fuelSummaryData = action.payload;
      })
      .addCase(fetchFuelSummary.rejected, (state) => {
        state.fuelSummaryStatus = "failed";
      });
  },
});

export default fuelSummarySlice.reducer;
