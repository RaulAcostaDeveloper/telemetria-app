import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getVehicles } from "@/modules/management/services/vehicles/vehicles";
import { ndIfEmpty } from "@/globalConfig/utils/utils";

interface Group {
  id: string;
  name: string;
}

/* imeIs llega del payload como string[] | [], pero es procesado en setObjNDIfEmpty()
  para regresar como string. */
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
  imeIs: string; //Un vehículo puede no tener IMEIs asignadas
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

/** Asigna "ND" a valores null, undefined y cadenas vacias.*/
function setObjNDIfEmpty(payload: Data) {
  const revisedArr = payload.value.vehicles.map((vehicle) => {
    //No altera a vehicle.id
    vehicle.plate = ndIfEmpty(vehicle.plate).toString();
    vehicle.name = ndIfEmpty(vehicle.name).toString();
    vehicle.brand = ndIfEmpty(vehicle.brand).toString();
    vehicle.model = ndIfEmpty(vehicle.model).toString();
    vehicle.vehicleType = ndIfEmpty(vehicle.vehicleType).toString();
    vehicle.year = ndIfEmpty(vehicle.year).toString();
    vehicle.driver = ndIfEmpty(vehicle.driver).toString();
    // vehicle.group = ndIfEmpty(vehicle.group[0].name).toString();
    vehicle.serialNumber = ndIfEmpty(vehicle.serialNumber).toString();
    vehicle.imeIs = ndIfEmpty(vehicle.imeIs[0]).toString();
    return vehicle;
  });
  payload.value.vehicles = revisedArr;
  return payload;
}

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
        state.vehiclesData = setObjNDIfEmpty(action.payload);
      })
      .addCase(fetchVehicles.rejected, (state) => {
        state.vehiclesStatus = "failed";
      });
  },
});

export default vehiclesSlice.reducer;
