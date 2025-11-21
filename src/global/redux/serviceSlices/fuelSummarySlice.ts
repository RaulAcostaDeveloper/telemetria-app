import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { SERVICE_STATUS } from "./types/serviceTypes";
import { getFuelSummary } from "@/modules/fuel/services/fuelSummary/fuelSummary";
import { toLocalDateTime } from "@/global/utils/utils";

// Tipado de los datos
export interface Devices {
  imei: string;
  lastFuelLevel: number | null;
  lastReportDate: string | null;
  name: string;
  plate: string;
  fuelLoadCount: number | null;
  fuelUnloadCount: number | null;
  performanceOdometer: number | null;
  performanceHorometer: number;
  fuelLoaded: number | null;
  fuelUnloaded: number | null;
}

export interface Charges {
  address: string;
  dateGps: string;
  deviceBattery: number;
  endDate: string;
  eventId: number;
  finalFuel: number;
  idIndexEvent?: string;
  ignition: true;
  imei: string;
  initialFuel: number;
  lat: number;
  lon: number;
  magnitude: number;
  mainPower: number;
  odometer: number;
  origin: number;
  speed: number;
  startDate: string;
  zoneId: string;
}

export interface Discharges {
  address: string;
  dateGps: string;
  deviceBattery: number;
  endDate: string;
  eventId: number;
  finalFuel: number;
  idIndexEvent?: string;
  ignition: true;
  imei: string;
  initialFuel: number;
  lat: number;
  lon: number;
  magnitude: number;
  mainPower: number;
  odometer: number;
  origin: number;
  speed: number;
  startDate: string;
  zoneId: string;
}

export interface SummaryFuelValues {
  clientId: number;
  unitsAnalyzed: number;
  inventory: number;
  performanceOdometer: number;
  performanceHorometer: number;
  fuelCharged: number;
  fuelDischarged: number;
  devices: Devices[];
  totalDistanceTraveled: number;
  charges: Charges[];
  discharges: Discharges[];
}

interface FuelSummaryData {
  statusCode: number;
  message: string;
  value: SummaryFuelValues | null;
}

interface InitialState {
  fuelSummaryData: FuelSummaryData | null;
  fuelSummaryStatus: SERVICE_STATUS;
}

// Función middleware de redux para interceptar con caché
export const fetchFuelSummary = createAsyncThunk(
  "fuelSummary/fetch",
  async ({
    startDate,
    endDate,
    logoutState,
  }: {
    startDate: string;
    endDate: string;
    logoutState: () => void;
  }) => {
    return getFuelSummary({ startDate, endDate, logoutState });
  }
);

function getPlateFromImei(devicesArr: Devices[], imei: string): string {
  const deviceTarget = devicesArr.find((d) => d.imei === imei);
  const validator = deviceTarget?.plate ? deviceTarget.plate : "";
  return validator;
}

const fuelSummaryFormatter = (
  data: FuelSummaryData | null
): FuelSummaryData | null => {
  if (data && data.value) {
    const devices = data.value.devices.map((messages) => ({
      ...messages,
      lastReportDate: toLocalDateTime(messages.lastReportDate ?? ""),
    }));
    const charges = data.value.charges.map((v, i) => ({
      ...v,
      idIndexEvent: `${i}-${v.eventId}`,
      imei: `${getPlateFromImei(devices, v.imei)} (${v.imei})`,
    }));
    const discharges = data.value.discharges.map((v, i) => ({
      ...v,
      idIndexEvent: `${i}-${v.eventId}`,
      imei: `${getPlateFromImei(devices, v.imei)} (${v.imei})`,
    }));

    //const discharges

    return {
      ...data,
      value: {
        ...data.value,
        devices,
        charges,
        discharges,
      },
    };
  }
  return null;
};

const initialState: InitialState = {
  fuelSummaryData: null,
  fuelSummaryStatus: SERVICE_STATUS.idle,
};

// Slice del servicio
const fuelSummarySlice = createSlice({
  name: "fuelSummary",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFuelSummary.pending, (state) => {
        state.fuelSummaryStatus = SERVICE_STATUS.loading;
      })
      .addCase(fetchFuelSummary.fulfilled, (state, action) => {
        state.fuelSummaryStatus = SERVICE_STATUS.succeeded;
        state.fuelSummaryData = fuelSummaryFormatter(action.payload);
      })
      .addCase(fetchFuelSummary.rejected, (state) => {
        state.fuelSummaryStatus = SERVICE_STATUS.failed;
      });
  },
});

export default fuelSummarySlice.reducer;

//Ejemplo de formato de fecha recibido: "2023-05-15T14:30:00Z". Usaremos la fecha SIN la "Z".
