import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { SERVICE_STATUS } from "./types/serviceTypes";
import { getDevices } from "@/modules/management/services/devices/devices";
import { toLocalDateTime } from "@/global/utils/utils";

export type statusNum = "0" | "1" | "2" | "3";

interface Devices {
  id: number;
  name: string;
  type: string;
  brand: string;
  createdAt: string;
  model: string;
  imei: string;
  phoneNumber: string;
  status: statusNum;
  registrationDate: string;
}

interface ArrayDevices {
  devices: Devices[];
}

interface DevicesData {
  statusCode: number;
  message: string;
  value: ArrayDevices | null;
}

interface InitialState {
  devicesData: DevicesData | null;
  devicesStatus: SERVICE_STATUS;
}

export const fetchDevices = createAsyncThunk(
  "devices/fetch",
  async (logoutState: () => void) => {
    return getDevices({ logoutState });
  }
);

const devicesFormatter = (data: DevicesData | null): DevicesData | null => {
  if (data && data.value) {
    const devices = data.value.devices.map((messages) => ({
      ...messages,
      createdAt: toLocalDateTime(messages.createdAt),
      registrationDate: toLocalDateTime(messages.registrationDate),
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
        state.devicesData = devicesFormatter(action.payload);
      })
      .addCase(fetchDevices.rejected, (state) => {
        state.devicesStatus = SERVICE_STATUS.failed;
      });
  },
});

export default devicesSlice.reducer;
