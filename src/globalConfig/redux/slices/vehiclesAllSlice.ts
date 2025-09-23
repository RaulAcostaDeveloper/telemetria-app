import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { SERVICE_STATUS } from "../types/serviceTypes";
import { getVehiclesAll } from "@/modules/management/services/vehicles/vehiclesAll";
import { useAuth } from "@/modules/auth/utils";

interface Vehicle {
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

interface ArrayVehicles {
  vehicles: Vehicle[];
}

interface Data {
  code: number;
  message: string;
  value: ArrayVehicles | null;
}

interface InitialState {
  vehiclesAllData: Data | null;
  vehiclesAllStatus: SERVICE_STATUS;
}

export const fetchVehiclesAll = createAsyncThunk(
  "vehiclesAll/fetch",
  async ({ forceRefresh }: { forceRefresh: boolean }) => {
    const { logoutState } = useAuth();
    return getVehiclesAll(logoutState, forceRefresh);
  }
);

const initialState: InitialState = {
  vehiclesAllData: null,
  vehiclesAllStatus: SERVICE_STATUS.idle,
};

// Slice del servicio
const vehiclesAllSlice = createSlice({
  name: "vehiclesAll",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVehiclesAll.pending, (state) => {
        state.vehiclesAllStatus = SERVICE_STATUS.loading;
      })
      .addCase(fetchVehiclesAll.fulfilled, (state, action) => {
        state.vehiclesAllStatus = SERVICE_STATUS.succeeded;
        state.vehiclesAllData = action.payload;
      })
      .addCase(fetchVehiclesAll.rejected, (state) => {
        state.vehiclesAllStatus = SERVICE_STATUS.failed;
      });
  },
});

export default vehiclesAllSlice.reducer;
