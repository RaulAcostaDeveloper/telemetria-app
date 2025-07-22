import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getVehiclesAll } from "@/modules/management/services/vehicles/vehiclesAll";

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
  value: ArrayVehicles;
}

interface InitialState {
  vehiclesAllData: Data | null;
  vehiclesAllStatus: string;
}

export const fetchVehiclesAll = createAsyncThunk(
  "vehiclesAll/fetch",
  async ({ forceRefresh }: { forceRefresh: boolean }) => {
    return getVehiclesAll(forceRefresh);
  }
);

const initialState: InitialState = {
  vehiclesAllData: null,
  vehiclesAllStatus: "idle",
};

// Slice del servicio
const vehiclesAllSlice = createSlice({
  name: "vehiclesAll",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVehiclesAll.pending, (state) => {
        state.vehiclesAllStatus = "loading";
      })
      .addCase(fetchVehiclesAll.fulfilled, (state, action) => {
        state.vehiclesAllStatus = "succeeded";
        state.vehiclesAllData = action.payload;
      })
      .addCase(fetchVehiclesAll.rejected, (state) => {
        state.vehiclesAllStatus = "failed";
      });
  },
});

export default vehiclesAllSlice.reducer;
