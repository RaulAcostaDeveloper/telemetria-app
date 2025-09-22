import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { SERVICE_STATUS } from "../types/serviceTypes";
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
  value: ArrayVehicles | null;
}

interface InitialState {
  vehiclesData: Data | null;
  vehiclesStatus: SERVICE_STATUS;
}

export const fetchVehicles = createAsyncThunk("vehicles/fetch", async () => {
  return getVehicles();
});

const initialState: InitialState = {
  vehiclesData: null,
  vehiclesStatus: SERVICE_STATUS.idle,
};

/** Asigna "ND" a valores null, undefined y cadenas vacias.*/
function setObjNDIfEmpty(payload: Data) {
  if (!payload?.value) return payload;

  const S = (v: unknown) => ndIfEmpty(v as any).toString();
  const toImeiString = (v: unknown): string => {
    if (Array.isArray(v)) return S(v[0]); // usa el primero si viene como array
    return S(v); // si ya es string, normaliza
  };

  const revised =
    payload.value.vehicles?.map((vehicle) => ({
      ...vehicle, // preserva id, group, etc.
      plate: S(vehicle.plate),
      name: S(vehicle.name),
      brand: S(vehicle.brand),
      model: S(vehicle.model),
      vehicleType: S(vehicle.vehicleType),
      year: S(vehicle.year),
      driver: S(vehicle.driver),
      serialNumber: S(vehicle.serialNumber),
      imeIs: toImeiString(vehicle.imeIs), // <- string, no array
    })) ?? [];

  payload.value.vehicles = revised;
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
        state.vehiclesStatus = SERVICE_STATUS.loading;
      })
      .addCase(fetchVehicles.fulfilled, (state, action) => {
        state.vehiclesStatus = SERVICE_STATUS.succeeded;
        state.vehiclesData = setObjNDIfEmpty(action.payload);
      })
      .addCase(fetchVehicles.rejected, (state) => {
        state.vehiclesStatus = SERVICE_STATUS.failed;
      });
  },
});

export default vehiclesSlice.reducer;
