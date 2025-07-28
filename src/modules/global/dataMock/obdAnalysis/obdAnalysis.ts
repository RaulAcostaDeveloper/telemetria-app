export interface ObdAnalyticsData {
  plate: string;
  vehicle: string;
  km: number;
  workingShift: number;
  fuelType: string;
  fuelConsumed: number;
  averageConsumption: number;
  litersPerHour: number;
  totalDistance: number;
  totalEngineHours: number;
  totalFuelConsumed: number;
}

export const obdAnalyticsDataMock: ObdAnalyticsData = {
  plate: "F87ACW",
  vehicle: "March 2015",
  km: 351,
  workingShift: 17.2,
  fuelType: "Diesel",
  fuelConsumed: 28.4,
  averageConsumption: 12.4,
  litersPerHour: 1.7,
  totalDistance: 1735489,
  totalEngineHours: 150.6,
  totalFuelConsumed: 322.9,
};
