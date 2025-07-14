import { getFuelData } from "@/modules/fuel/services/fuelData/fuelData";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface LevelMessages {
  eventId: number;
  dateGps: string;
  dateServer: string;
  lat: number;
  lon: number;
  odometer: number;
  speed: number;
  ignition: number;
  deviceBattery: number;
  mainPower: number;
  currentFuel: number;
  tanks: string;
}

interface Charges {
  address: string;
  dateGps: string;
  deviceBattery: number;
  endDate: string;
  eventId: number;
  finalFuel: number;
  ignition: number;
  initialFuel: number;
  lat: number;
  lon: number;
  magnitude: number;
  mainPower: number;
  odometer: number;
  origin: number;
  speed: number;
  startDate: string;
}

interface Discharges {
  address: string;
  dateGps: string;
  deviceBattery: number;
  endDate: string;
  eventId: number;
  finalFuel: number;
  ignition: number;
  initialFuel: number;
  lat: number;
  lon: number;
  magnitude: number;
  mainPower: number;
  odometer: number;
  origin: number;
  speed: number;
  startDate: string;
}

interface DailyPerformances {
  startDate: string;
  endDate: string;
  averagePerformance: number;
  createdAt: string;
  updateAt: string;
  fuelConsumed: number;
  initialLevel: number;
  finalLevel: number;
  initialOdometer: number;
  finalOdometer: number;
}

interface PerformancesBetweenCharges {
  endDatePerformance: string;
  startDatePerformace: string;
  fuelConsumed: number;
  initialLevel: number;
  finalLevel: number;
  averagePerformance: number;
  initialOdometer: number;
  finalOdometer: number;
}

// Este arreglo quizá haya que calcularlo con speed e ignition, EN 3 ARREGLOS
// interface OperationalBehavior {
//   startDate: string;
//   endDate: string;
//   status: number; // estados: estacionado, encendido y en movimiento
// }

export interface FuelDataValues {
  imei: number;
  levelMessages: LevelMessages[];
  charges: Charges[];
  discharges: Discharges[];
  dailyPerformances: DailyPerformances[];
  performancesBetweenCharges: PerformancesBetweenCharges[];
  // operationalBehavior: OperationalBehavior[];
}

interface Data {
  statusCode: number;
  message: string;
  value: FuelDataValues;
}

interface InitialState {
  fuelDataData: Data | null;
  fuelDataStatus: string;
}

export const fetchFuelData = createAsyncThunk(
  "fuelData/fetch",
  async ({
    imei,
    startDate,
    endDate,
  }: {
    imei: string;
    startDate: string;
    endDate: string;
  }) => {
    return getFuelData(imei, startDate, endDate);
  }
);

const initialState: InitialState = {
  fuelDataData: null,
  fuelDataStatus: "idle",
};

// Slice del servicio
const fuelDataSlice = createSlice({
  name: "fuelData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFuelData.pending, (state) => {
        state.fuelDataStatus = "loading";
      })
      .addCase(fetchFuelData.fulfilled, (state, action) => {
        state.fuelDataStatus = "succeeded";
        state.fuelDataData = action.payload;
      })
      .addCase(fetchFuelData.rejected, (state) => {
        state.fuelDataStatus = "failed";
      });
  },
});

export default fuelDataSlice.reducer;
