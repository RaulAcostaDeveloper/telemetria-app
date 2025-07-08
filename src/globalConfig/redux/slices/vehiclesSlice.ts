import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getVehicles } from "@/modules/management/services/vehicles/vehicles";

interface Vehicles {
  id: number;
  carNumber: string;
  carLabel: string;
  carShortcut: string;
}

interface ArrayVehicles {
  vehicles: Vehicles[];
}

interface Data {
  statusCode: number;
  message: string;
  value: ArrayVehicles;
}

interface InitialState {
  vehiclesData: Data | null;
  vehiclesStatus: string;
}

export const fetchVehicles = createAsyncThunk(
  "vehicles/fetch",
  async ({ accountId }: { accountId: string }) => {
    return getVehicles(accountId);
  }
);

const initialState: InitialState = {
  vehiclesData: null,
  vehiclesStatus: "idle",
};

// Slice del servicio
const vehiclesSlice = createSlice({
  name: "vehicles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVehicles.pending, (state) => {
        state.vehiclesStatus = "loading";
      })
      .addCase(fetchVehicles.fulfilled, (state, action) => {
        state.vehiclesStatus = "succeeded";
        state.vehiclesData = action.payload;
      })
      .addCase(fetchVehicles.rejected, (state) => {
        state.vehiclesStatus = "failed";
      });
  },
});

export default vehiclesSlice.reducer;
