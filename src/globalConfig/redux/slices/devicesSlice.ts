import { getDevices } from "@/modules/management/services/devices/devices";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ndIfEmpty } from "@/globalConfig/utils/utils";

interface Devices { 
  id: number,
  name: string,
  type: string,
  brand: string,
  createdAt: string,
  model: string,
  imei: string,
  phoneNumber: string,
  status: string,
  registrationDate: string,
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

/** Asigna "ND" a valores null, undefined y cadenas vacias.*/
function setObjNDIfEmpty(payload: Data){
  const revisedArr = payload.value.devices.map( (device) => {
    //No altera a device.id
    device.name = ndIfEmpty(device.name).toString();
    device.type = ndIfEmpty(device.type).toString();
    device.brand = ndIfEmpty(device.brand).toString();
    device.createdAt = ndIfEmpty(device.createdAt).toString();
    device.model = ndIfEmpty(device.model).toString();
    device.imei = ndIfEmpty(device.imei).toString();
    device.phoneNumber = ndIfEmpty(device.phoneNumber).toString();
    device.status = ndIfEmpty(device.status).toString();
    device.registrationDate = ndIfEmpty(device.registrationDate).toString();
    return device
  })
  payload.value.devices = revisedArr;
  return payload;
}


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
        state.devicesData = setObjNDIfEmpty(action.payload);
      })
      .addCase(fetchDevices.rejected, (state) => {
        state.devicesStatus = "failed";
      });
  },
});

export default devicesSlice.reducer;
