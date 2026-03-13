import {
  ObdRollupDataValues,
  ObdRollupDetails,
} from "../redux/serviceSlices/obdRollupSlice";

export const obdRollupDetailsDataMock: ObdRollupDetails[] = [
  {
    name: "Unidad Norte 01",
    plate: "JAL-482-A",
    driverDistance: 348.7,
    averageSpeed: 62.4,
    driverTime: 7.8,
    driverIdleTime: 1.2,
    maxSpeed: 104,
    imei: "356789012345678",
  },
  {
    name: "Reparto Centro 12",
    plate: "CDMX-913-Z",
    driverDistance: 192.3,
    averageSpeed: 48.6,
    driverTime: 5.4,
    driverIdleTime: 0.9,
    maxSpeed: 87,
    imei: "867451230987654",
  },
  {
    name: "Transporte Ejecutivo 03",
    plate: "GDL-220-K",
    driverDistance: null,
    averageSpeed: 0,
    driverTime: 0,
    driverIdleTime: 0,
    maxSpeed: 0,
    imei: "352099001234567",
  },
  {
    name: "Carga Ligera 07",
    plate: "MTY-771-P",
    driverDistance: 421.9,
    averageSpeed: 66.8,
    driverTime: 8.6,
    driverIdleTime: 1.5,
    maxSpeed: 112,
    imei: "359881234567890",
  },
  {
    name: "Unidad Sur 05",
    plate: "PUE-558-M",
    driverDistance: 276.4,
    averageSpeed: 54.1,
    driverTime: 6.3,
    driverIdleTime: 1.1,
    maxSpeed: 96,
    imei: "354567890123456",
  },
];

export const obdRollupDataValuesDataMock: ObdRollupDataValues = {
  accountID: 101,
  unitsAnalyzed: 5,
  driverTime: 28.1,
  driverDistance: 1239.3,
  driverIdleTime: 4.7,
  details: obdRollupDetailsDataMock,
};
