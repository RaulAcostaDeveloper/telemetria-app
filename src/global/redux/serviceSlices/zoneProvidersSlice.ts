import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { SERVICE_STATUS } from "./types/serviceTypes";
import { getZoneProviders } from "@/modules/zones/services/providers/providers";

export interface ZoneTypes {
  name: string;
  id: string;
}

export interface ArrayProviders {
  zoneTypes: ZoneTypes[];
}

export interface ZoneProvidersData {
  statusCode: number;
  message: string;
  value: ArrayProviders | null;
}

interface InitialState {
  zoneProvidersData: ZoneProvidersData | null;
  zoneProvidersStatus: SERVICE_STATUS;
}

export const fetchZoneProviders = createAsyncThunk(
  "zoneProviders/fetch",
  async (logoutState: () => void) => {
    return getZoneProviders({ logoutState });
  },
);

const initialState: InitialState = {
  zoneProvidersData: null,
  zoneProvidersStatus: SERVICE_STATUS.idle,
};

// Slice del servicio
const zoneProvidersSlice = createSlice({
  name: "zoneProviders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchZoneProviders.pending, (state) => {
        state.zoneProvidersStatus = SERVICE_STATUS.loading;
      })
      .addCase(fetchZoneProviders.fulfilled, (state, action) => {
        state.zoneProvidersStatus = SERVICE_STATUS.succeeded;
        state.zoneProvidersData = action.payload;
      })
      .addCase(fetchZoneProviders.rejected, (state) => {
        state.zoneProvidersStatus = SERVICE_STATUS.failed;
      });
  },
});

export default zoneProvidersSlice.reducer;
