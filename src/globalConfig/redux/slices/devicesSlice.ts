import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { SERVICE_STATUS } from "../types/serviceTypes";
import { getDevices } from "@/modules/management/services/devices/devices";
import { ndIfEmpty } from "@/globalConfig/utils/utils";

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

/** Asigna "ND" a valores null, undefined y cadenas vacias.*/
function setObjNDIfEmpty(payload: Data): Data {
  if (!payload?.value) return payload;

  const normalize = (v: unknown) => ndIfEmpty(v as never).toString();

  const devicesIn = payload.value.devices ?? [];
  const devices = devicesIn.map((device) => ({
    ...device, // preserva device.id y demás campos
    name: normalize(device.name),
    type: normalize(device.type),
    brand: normalize(device.brand),
    createdAt: normalize(device.createdAt),
    model: normalize(device.model),
    imei: normalize(device.imei),
    phoneNumber: normalize(device.phoneNumber),
    status: normalize(device.status),
    registrationDate: normalize(device.registrationDate),
  }));

  return {
    ...payload,
    value: {
      ...payload.value,
      devices,
    },
  };
}

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
        state.devicesData = setObjNDIfEmpty(action.payload);
      })
      .addCase(fetchDevices.rejected, (state) => {
        state.devicesStatus = SERVICE_STATUS.failed;
      });
  },
});

export default devicesSlice.reducer;
