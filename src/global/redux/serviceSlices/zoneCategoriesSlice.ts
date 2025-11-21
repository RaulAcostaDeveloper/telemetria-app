import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { SERVICE_STATUS } from "./types/serviceTypes";
import { getZoneCategories } from "@/modules/zones/services/categories/categories";

interface ZoneCategories {
  name: string;
  id: string;
}

interface ArrayCategories {
  zoneCategories: ZoneCategories[];
}

export interface ZoneCategoriesData {
  statusCode: number;
  message: string;
  value: ArrayCategories | null;
}

interface InitialState {
  zoneCategoriesData: ZoneCategoriesData | null;
  zoneCategoriesStatus: SERVICE_STATUS;
}

export const fetchZoneCategories = createAsyncThunk(
  "zoneCategories/fetch",
  async (logoutState: () => void) => {
    return getZoneCategories({ logoutState });
  }
);

const initialState: InitialState = {
  zoneCategoriesData: null,
  zoneCategoriesStatus: SERVICE_STATUS.idle,
};

// Slice del servicio
const zoneCategoriesSlice = createSlice({
  name: "zoneCategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchZoneCategories.pending, (state) => {
        state.zoneCategoriesStatus = SERVICE_STATUS.loading;
      })
      .addCase(fetchZoneCategories.fulfilled, (state, action) => {
        state.zoneCategoriesStatus = SERVICE_STATUS.succeeded;
        state.zoneCategoriesData = action.payload;
      })
      .addCase(fetchZoneCategories.rejected, (state) => {
        state.zoneCategoriesStatus = SERVICE_STATUS.failed;
      });
  },
});

export default zoneCategoriesSlice.reducer;
