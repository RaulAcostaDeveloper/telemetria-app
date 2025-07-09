import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getFuelMetrics } from "@/modules/fuel/services/fuelMetrics/fuelMetrics";

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
  eventId: number;
  address: string;
  lat: number;
  lon: number;
  odometer: number;
  speed: number;
  ignition: number;
  deviceBattery: number;
  mainPower: number;
  magnitude: number;
  initialFuel: number;
  finalFuel: number;
  startDate: string;
  endDate: string;
  origin: number;
}

interface Discharges {
  eventId: number;
  address: string;
  lat: number;
  lon: number;
  odometer: number;
  speed: number;
  ignition: number;
  deviceBattery: number;
  mainPower: number;
  magnitude: number;
  initialFuel: number;
  finalFuel: number;
  startDate: string;
  endDate: string;
  origin: number;
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

export interface FuelMetricsValues {
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
  value: FuelMetricsValues;
}

interface InitialState {
  fuelMetricsData: Data | null;
  fuelMetricsStatus: string;
}

export const fetchFuelMetrics = createAsyncThunk(
  "fuelMetrics/fetch",
  async ({
    imei,
    startDate,
    endDate,
  }: {
    imei: string;
    startDate: string;
    endDate: string;
  }) => {
    return getFuelMetrics(imei, startDate, endDate);
  }
);

const initialState: InitialState = {
  fuelMetricsData: null,
  fuelMetricsStatus: "idle",
};

// Slice del servicio
const fuelMetricsSlice = createSlice({
  name: "fuelMetrics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFuelMetrics.pending, (state) => {
        state.fuelMetricsStatus = "loading";
      })
      .addCase(fetchFuelMetrics.fulfilled, (state, action) => {
        state.fuelMetricsStatus = "succeeded";
        state.fuelMetricsData = action.payload;
      })
      .addCase(fetchFuelMetrics.rejected, (state) => {
        state.fuelMetricsStatus = "failed";
      });
  },
});

export default fuelMetricsSlice.reducer;
