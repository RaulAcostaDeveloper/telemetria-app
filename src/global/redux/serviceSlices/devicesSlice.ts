import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { SERVICE_STATUS } from "./types/serviceTypes";
import { getDevices } from "@/modules/management/services/devices/devices";

interface Devices {
  id: number;
  name: string;
  type: string;
  brand: string;
  createdAt: string;
  model: string;
  imei: string;
  phoneNumber: string;
  status: string;
  registrationDate: string;
}

interface ArrayDevices {
  devices: Devices[];
}

interface Data {
  statusCode: number;
  message: string;
  value: ArrayDevices | null;
}

interface InitialState {
  devicesData: Data | null;
  devicesStatus: SERVICE_STATUS;
}

export const fetchDevices = createAsyncThunk(
  "devices/fetch",
  async (logoutState: () => void) => {
    return getDevices({ logoutState });
  }
);

const initialState: InitialState = {
  devicesData: null,
  devicesStatus: SERVICE_STATUS.idle,
};

// Slice del servicio
const devicesSlice = createSlice({
  name: "devices",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDevices.pending, (state) => {
        state.devicesStatus = SERVICE_STATUS.loading;
      })
      .addCase(fetchDevices.fulfilled, (state, action) => {
        state.devicesStatus = SERVICE_STATUS.succeeded;
        state.devicesData = action.payload;
      })
      .addCase(fetchDevices.rejected, (state) => {
        state.devicesStatus = SERVICE_STATUS.failed;
      });
  },
});

export default devicesSlice.reducer;
