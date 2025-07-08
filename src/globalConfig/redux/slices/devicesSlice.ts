import { getDevices } from "@/modules/management/services/devices/devices";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface Devices { 
  id: number,
  model: string,
  modelVersion: string,
  status: string,
  statusAt: string,
  serial: string,
  sim: string,
  firmware: string,
  hardware: string,
  imei: string,
  lastDataAt: string,
}

interface ArrayDevices {
  devices: Devices[];
}

interface Data {
  statusCode: number;
  message: string;
  value: ArrayDevices;
}

interface InitialState {
  devicesData: Data | null;
  devicesStatus: string;
}

export const fetchDevices = createAsyncThunk(
  "devices/fetch",
  async ({ accountId }: { accountId: string }) => {
    return getDevices(accountId);
  }
);

const initialState: InitialState = {
  devicesData: null,
  devicesStatus: "idle",
};

// Slice del servicio
const devicesSlice = createSlice({
  name: "devices",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDevices.pending, (state) => {
        state.devicesStatus = "loading";
      })
      .addCase(fetchDevices.fulfilled, (state, action) => {
        state.devicesStatus = "succeeded";
        state.devicesData = action.payload;
      })
      .addCase(fetchDevices.rejected, (state) => {
        state.devicesStatus = "failed";
      });
  },
});

export default devicesSlice.reducer;
