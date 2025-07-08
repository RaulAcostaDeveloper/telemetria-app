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

interface Values {
  imei: number;
  levelMessages: LevelMessages[];
  charges: Charges[];
  discharges: Discharges[];
  dailyPerformances: DailyPerformances[];
  performancesBetweenCharges: PerformancesBetweenCharges[];
  // operationalBehavior: OperationalBehavior[];
}

interface FuelVehicleMetricsDataMock {
  statusCode: number;
  message: string;
  value: Values[];
}

export const fuelVehicleMetricsDataMock: FuelVehicleMetricsDataMock = {
  statusCode: 200,
  message: "OK",
  value: [
    {
      imei: 4894894161653,
      levelMessages: [
        {
          eventId: 0,
          dateGps: "2023-05-15T14:30:00Z",
          dateServer: "2023-05-15T14:30:00Z",
          lat: 0,
          lon: 0,
          odometer: 0,
          speed: 0,
          ignition: 0,
          deviceBattery: 0,
          mainPower: 0,
          currentFuel: 0,
          tanks: "150|160|290",
        },
        {
          eventId: 2001,
          dateGps: "2024-07-11T09:30:00.000Z",
          dateServer: "2024-07-11T10:00:00.000Z",
          lat: 20.1234567,
          lon: -100.9876543,
          odometer: 46000.8,
          speed: 45,
          ignition: 1,
          deviceBattery: 97,
          mainPower: 13.102,
          currentFuel: 125,
          tanks: "150|160|290",
        },
        {
          eventId: 2001,
          dateGps: "2024-07-11T10:00:00.000Z",
          dateServer: "2024-07-11T10:00:00.000Z",
          lat: 20.1234567,
          lon: -100.9876543,
          odometer: 46000.8,
          speed: 45,
          ignition: 1,
          deviceBattery: 97,
          mainPower: 13.102,
          currentFuel: 624,
          tanks: "150|160|290",
        },
        {
          eventId: 2001,
          dateGps: "2024-07-13T09:30:00.000Z",
          dateServer: "2024-07-11T10:00:00.000Z",
          lat: 20.1234567,
          lon: -100.9876543,
          odometer: 46000.8,
          speed: 45,
          ignition: 1,
          deviceBattery: 97,
          mainPower: 13.102,
          currentFuel: 582,
          tanks: "150|160|290",
        },
        {
          eventId: 2001,
          dateGps: "2024-07-13T09:50:00.000Z",
          dateServer: "2024-07-11T10:00:00.000Z",
          lat: 20.1234567,
          lon: -100.9876543,
          odometer: 46000.8,
          speed: 45,
          ignition: 1,
          deviceBattery: 97,
          mainPower: 13.102,
          currentFuel: 865,
          tanks: "150|160|290",
        },
        {
          eventId: 2001,
          dateGps: "2024-07-14T01:50:00.000Z",
          dateServer: "2024-07-11T10:00:00.000Z",
          lat: 20.1234567,
          lon: -100.9876543,
          odometer: 46000.8,
          speed: 45,
          ignition: 1,
          deviceBattery: 97,
          mainPower: 13.102,
          currentFuel: 682,
          tanks: "150|160|290",
        },
      ],
      charges: [
        {
          eventId: 2002,
          address: "Calle Reforma 123",
          lat: 20.127,
          lon: -100.993,
          odometer: 46020.0,
          speed: 0.0,
          ignition: 0,
          deviceBattery: 98,
          mainPower: 13.5,
          magnitude: 200,
          initialFuel: 600,
          finalFuel: 800,
          startDate: "2024-07-11T09:15:00.000Z",
          endDate: "2024-07-11T09:30:00.000Z",
          origin: 0,
        },
        {
          eventId: 2002,
          address: "Blvd Principal 789",
          lat: 20.128,
          lon: -100.9935,
          odometer: 46025.3,
          speed: 0.0,
          ignition: 0,
          deviceBattery: 97,
          mainPower: 13.4,
          magnitude: 180,
          initialFuel: 800,
          finalFuel: 980,
          startDate: "2024-07-11T09:45:00.000Z",
          endDate: "2024-07-11T10:00:00.000Z",
          origin: 0,
        },
      ],
      discharges: [
        {
          eventId: 2003,
          address: "Blvd Central 789",
          lat: 20.1255,
          lon: -100.9905,
          odometer: 46850.9,
          speed: 12.0,
          ignition: 1,
          deviceBattery: 92,
          mainPower: 12.8,
          magnitude: 180,
          initialFuel: 1120,
          finalFuel: 940,
          startDate: "2024-07-13T09:10:00.000Z",
          endDate: "2024-07-13T09:30:00.000Z",
          origin: 0,
        },
        {
          eventId: 2003,
          address: "Av Insurgentes 456",
          lat: 20.1245,
          lon: -100.9915,
          odometer: 46860.1,
          speed: 15.0,
          ignition: 1,
          deviceBattery: 93,
          mainPower: 12.75,
          magnitude: 150,
          initialFuel: 980,
          finalFuel: 830,
          startDate: "2024-07-13T09:30:00.000Z",
          endDate: "2024-07-13T09:50:00.000Z",
          origin: 0,
        },
      ],
      dailyPerformances: [
        {
          startDate: "2024-07-11T09:15:00.000Z",
          endDate: "2023-05-15T14:30:00Z",
          averagePerformance: 2.6,
          createdAt: "2024-07-11T09:30:00.000Z",
          updateAt: "2024-07-11T09:30:00.000Z",
          fuelConsumed: 115,
          initialLevel: 200,
          finalLevel: 85,
          initialOdometer: 56000,
          finalOdometer: 56600,
        },
        {
          startDate: "2024-07-11T09:15:00.000Z",
          endDate: "2024-07-11T09:30:00.000Z",
          averagePerformance: 2.5,
          createdAt: "2024-07-11T09:30:00.000Z",
          updateAt: "2024-07-11T09:30:00.000Z",
          fuelConsumed: 115,
          initialLevel: 200,
          finalLevel: 85,
          initialOdometer: 56000,
          finalOdometer: 56600,
        },
        {
          startDate: "2024-07-11T09:15:00.000Z",
          endDate: "2024-07-11T10:00:00.000Z",
          averagePerformance: 4.6,
          createdAt: "2024-07-11T09:30:00.000Z",
          updateAt: "2024-07-11T09:30:00.000Z",
          fuelConsumed: 115,
          initialLevel: 200,
          finalLevel: 85,
          initialOdometer: 56000,
          finalOdometer: 56600,
        },
        {
          startDate: "2024-07-11T09:15:00.000Z",
          endDate: "2024-07-13T09:30:00.000Z",
          averagePerformance: 2.9,
          createdAt: "2024-07-11T09:30:00.000Z",
          updateAt: "2024-07-11T09:30:00.000Z",
          fuelConsumed: 115,
          initialLevel: 200,
          finalLevel: 85,
          initialOdometer: 56000,
          finalOdometer: 56600,
        },
        {
          startDate: "2024-07-11T09:15:00.000Z",
          endDate: "2024-07-13T09:50:00.000Z",
          averagePerformance: 1.6,
          createdAt: "2024-07-11T09:30:00.000Z",
          updateAt: "2024-07-11T09:30:00.000Z",
          fuelConsumed: 115,
          initialLevel: 200,
          finalLevel: 85,
          initialOdometer: 56000,
          finalOdometer: 56600,
        },
        {
          startDate: "2024-07-11T09:15:00.000Z",
          endDate: "2024-07-14T01:50:00.000Z",
          averagePerformance: 2.6,
          createdAt: "2024-07-11T09:30:00.000Z",
          updateAt: "2024-07-11T09:30:00.000Z",
          fuelConsumed: 115,
          initialLevel: 200,
          finalLevel: 85,
          initialOdometer: 56000,
          finalOdometer: 56600,
        },
      ],
      performancesBetweenCharges: [
        {
          endDatePerformance: "2024-07-11T09:15:00.000Z",
          startDatePerformace: "2024-07-11T09:15:00.000Z",
          fuelConsumed: 115,
          initialLevel: 200,
          finalLevel: 85,
          averagePerformance: 2.6,
          initialOdometer: 56000,
          finalOdometer: 56600,
        },
        {
          endDatePerformance: "2024-07-11T09:15:00.000Z",
          startDatePerformace: "2024-07-11T09:15:00.000Z",
          fuelConsumed: 115,
          initialLevel: 200,
          finalLevel: 85,
          averagePerformance: 2.6,
          initialOdometer: 56000,
          finalOdometer: 56600,
        },
        {
          endDatePerformance: "2024-07-11T09:15:00.000Z",
          startDatePerformace: "2024-07-11T09:15:00.000Z",
          fuelConsumed: 115,
          initialLevel: 200,
          finalLevel: 85,
          averagePerformance: 2.6,
          initialOdometer: 56000,
          finalOdometer: 56600,
        },
      ],
    },
  ],
};
