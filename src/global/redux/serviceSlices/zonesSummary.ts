import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { SERVICE_STATUS } from "./types/serviceTypes";
import { getZonesSummary } from "@/modules/zones/services/zonesSummary/zonesSummary";

export interface Zone {
  zoneName: string;
  zoneId: string;
  profileName: string;
  country: string;
  state: string;
  city: string;
  postalCode: string;
  totalEvents: number;
  loadedLiters: number;
  unloadedLiters: number;
}

interface SummaryZonesValues {
  zones: Zone[];
}

interface ZonesSummaryData {
  statusCode: number;
  message: string;
  value: SummaryZonesValues | null;
}

interface InitialState {
  zonesSummaryData: ZonesSummaryData | null;
  zonesSummaryStatus: SERVICE_STATUS;
}

// Función middleware de redux para interceptar con caché
export const fetchZonesSummary = createAsyncThunk(
  "zonesSummary/fetch",
  async ({
    startDate,
    endDate,
    logoutState,
  }: {
    startDate: string;
    endDate: string;
    logoutState: () => void;
  }) => {
    return getZonesSummary({ startDate, endDate, logoutState });
  },
);

const initialState: InitialState = {
  zonesSummaryData: null,
  zonesSummaryStatus: SERVICE_STATUS.idle,
};

// Slice del servicio
const zonesSummarySlice = createSlice({
  name: "zonesSummary",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchZonesSummary.pending, (state) => {
        state.zonesSummaryStatus = SERVICE_STATUS.loading;
      })
      .addCase(fetchZonesSummary.fulfilled, (state, action) => {
        state.zonesSummaryStatus = SERVICE_STATUS.succeeded;
        state.zonesSummaryData = action.payload;
      })
      .addCase(fetchZonesSummary.rejected, (state) => {
        state.zonesSummaryStatus = SERVICE_STATUS.failed;
      });
  },
});

export default zonesSummarySlice.reducer;
