import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { SERVICE_STATUS } from "./types/serviceTypes";
import { getVehicles } from "@/modules/management/services/vehicles/vehicles";

interface Group {
  id: string;
  name: string;
}

export interface Vehicles {
  id: number;
  plate: string;
  name: string;
  brand: string;
  model: string;
  vehicleType: string;
  year: string;
  serialNumber: string;
  driver: string;
  group: Group[];
  imeIs: string[]; //Un vehículo puede no tener IMEIs asignadas
}

interface ArrayVehicles {
  vehicles: Vehicles[];
}

interface Data {
  statusCode: number;
  message: string;
  value: ArrayVehicles | null;
}

interface InitialState {
  vehiclesData: Data | null;
  vehiclesStatus: SERVICE_STATUS;
}

export const fetchVehicles = createAsyncThunk(
  "vehicles/fetch",
  async (logoutState: () => void) => {
    return getVehicles({ logoutState });
  }
);

const initialState: InitialState = {
  vehiclesData: null,
  vehiclesStatus: SERVICE_STATUS.idle,
};

// Slice del servicio
const vehiclesSlice = createSlice({
  name: "vehicles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVehicles.pending, (state) => {
        state.vehiclesStatus = SERVICE_STATUS.loading;
      })
      .addCase(fetchVehicles.fulfilled, (state, action) => {
        state.vehiclesStatus = SERVICE_STATUS.succeeded;
        state.vehiclesData = action.payload;
      })
      .addCase(fetchVehicles.rejected, (state) => {
        state.vehiclesStatus = SERVICE_STATUS.failed;
      });
  },
});

export default vehiclesSlice.reducer;
