import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getVehicleByImei } from "@/modules/management/services/vehicles/vehicleByImei";

export interface VehicleByImei {
  id: string;
  name: string;
  clientOwnerName: string;
  plate: string;
  driver: string;
  group: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  serialNumber: string;
  economicNumber: string;
  vehicleType: string;
  createdAt: string;
  imeIs: string[] | []; //Un vehículo puede no tener IMEIs asignadas
}

interface Data {
  code: number;
  message: string;
  value: VehicleByImei;
}

interface InitialState {
  vehicleByImeiData: Data | null;
  vehicleByImeiStatus: string;
}

export const fetchVehicleByImei = createAsyncThunk(
  "vehicleByImei/fetch",
  async ({ imei }: { imei: string }) => {
    return getVehicleByImei(imei);
  }
);

const initialState: InitialState = {
  vehicleByImeiData: null,
  vehicleByImeiStatus: "idle",
};

// Slice del servicio
const vehicleByImeiSlice = createSlice({
  name: "vehicleById",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVehicleByImei.pending, (state) => {
        state.vehicleByImeiStatus = "loading";
      })
      .addCase(fetchVehicleByImei.fulfilled, (state, action) => {
        state.vehicleByImeiStatus = "succeeded";
        state.vehicleByImeiData = action.payload;
      })
      .addCase(fetchVehicleByImei.rejected, (state) => {
        state.vehicleByImeiStatus = "failed";
      });
  },
});

export default vehicleByImeiSlice.reducer;
