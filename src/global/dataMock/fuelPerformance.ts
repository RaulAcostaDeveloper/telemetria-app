import { FuelPerformanceValues } from "../redux/serviceSlices/fuelPerformanceSlice";

export const fuelPerformanceDataMock: FuelPerformanceValues = {
  deviceId: "862095040123456",
  distanceTraveled: 49,
  finalFuel: 64.1,
  fuelCharged: 18,
  fuelConsumed: 3.9,
  initialFuel: 68,
  operationTime: 540, // segundos (~9 minutos)
  performanceByDistance: 12.56, // km por litro aprox
  performanceByTime: 0.43, // litros por minuto aprox
  fuelDischarged: 9,
  maxSpeed: 45,
};
