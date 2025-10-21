import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { SERVICE_STATUS } from "./types/serviceTypes";
import { getDrivers } from "@/modules/management/services/drivers/drivers";

interface Drivers {
  id: number;
  name: string;
  email: string;
  lastName: string;
  address: string;
  entryDate: string;
  alias: string;
  groupName: string;
  license: string;
}

interface ArrayDrivers {
  drivers: Drivers[];
}

export interface DriversData {
  statusCode: number;
  message: string;
  value: ArrayDrivers | null;
}

interface InitialState {
  driversData: DriversData | null;
  driversStatus: SERVICE_STATUS;
}

export const fetchDrivers = createAsyncThunk(
  "drivers/fetch",
  async (logoutState: () => void) => {
    return getDrivers({ logoutState });
  }
);

const initialState: InitialState = {
  driversData: null,
  driversStatus: SERVICE_STATUS.idle,
};

// Slice del servicio
const driversSlice = createSlice({
  name: "drivers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDrivers.pending, (state) => {
        state.driversStatus = SERVICE_STATUS.loading;
      })
      .addCase(fetchDrivers.fulfilled, (state, action) => {
        state.driversStatus = SERVICE_STATUS.succeeded;
        state.driversData = action.payload;
      })
      .addCase(fetchDrivers.rejected, (state) => {
        state.driversStatus = SERVICE_STATUS.failed;
      });
  },
});

export default driversSlice.reducer;
