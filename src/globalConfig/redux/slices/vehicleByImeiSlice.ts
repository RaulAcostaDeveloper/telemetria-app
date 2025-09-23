import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { SERVICE_STATUS } from "../types/serviceTypes";
import { getVehicleByImei } from "@/modules/management/services/vehicles/vehicleByImei";
import { useAuth } from "@/modules/auth/utils";

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
  value: VehicleByImei | null;
}

interface InitialState {
  vehicleByImeiData: Data | null;
  vehicleByImeiStatus: SERVICE_STATUS;
}

export const fetchVehicleByImei = createAsyncThunk(
  "vehicleByImei/fetch",
  async ({ imei }: { imei: string }) => {
    const { logoutState } = useAuth();
    return getVehicleByImei(imei, logoutState);
  }
);

const initialState: InitialState = {
  vehicleByImeiData: null,
  vehicleByImeiStatus: SERVICE_STATUS.idle,
};

// Slice del servicio
const vehicleByImeiSlice = createSlice({
  name: "vehicleById",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVehicleByImei.pending, (state) => {
        state.vehicleByImeiStatus = SERVICE_STATUS.loading;
      })
      .addCase(fetchVehicleByImei.fulfilled, (state, action) => {
        state.vehicleByImeiStatus = SERVICE_STATUS.succeeded;
        state.vehicleByImeiData = action.payload;
      })
      .addCase(fetchVehicleByImei.rejected, (state) => {
        state.vehicleByImeiStatus = SERVICE_STATUS.failed;
      });
  },
});

export default vehicleByImeiSlice.reducer;
