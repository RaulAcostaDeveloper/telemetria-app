import { TooltipGeoField } from "@/global/utils/geoMapUtils";

interface GeoData {
  lat: number;
  lon: number;
  title: string;
  rows: TooltipGeoField[];
}

export interface zoneDataMock {
  fechaCargaNoConciliada: string;
  address: string;
  odometer: number; //Km
  speed: number; //Km/h
  ignition: true;
  battery: number | null; //%
  mainEnergy: number | null; //V
  origin: string | null;
  magnitude: number | null; //L
  startFuel: number | null; //L
  endFuel: number | null; //L
  initialDate: string;
  endDate: string;
  geoData: GeoData;
}

export const z0n3sD4t4M0ck: zoneDataMock[] = [
  {
    fechaCargaNoConciliada: "2025-10-02T13:00:00",
    address:
      "Calle San Felipe Neri Número 3920, CP:45040 Zapopan, Jalisco, México.",
    odometer: 1689.9, //Km
    speed: 0.0, //Km/h
    ignition: true,
    battery: 100, //%
    mainEnergy: 13.31, //V
    origin: "FCM",
    magnitude: 102.0, //L
    startFuel: 243.0, //L
    endFuel: 345.0, //L
    initialDate: "2025-10-01T08:00:00",
    endDate: "2025-10-02T17:00:00",
    geoData: {
      lat: 20.6663943,
      lon: -103.4160823,
      title: "Parque Escaleno",
      rows: [],
    },
  },
  {
    fechaCargaNoConciliada: "2025-10-02T13:00:00",
    address:
      "Calle San Felipe Neri Número 3920, CP:45040 Zapopan, Jalisco, México.",
    odometer: 1689.9, //Km
    speed: 0.0, //Km/h
    ignition: true,
    battery: 100, //%
    mainEnergy: 13.31, //V
    origin: "FCM",
    magnitude: 102.0, //L
    startFuel: 243.0, //L
    endFuel: 345.0, //L
    initialDate: "2025-10-01T08:00:00",
    endDate: "2025-10-02T17:00:00",
    geoData: {
      lat: 20.6656916,
      lon: -103.4194916,
      title: "Walmart",
      rows: [],
    },
  },
  {
    fechaCargaNoConciliada: "",
    address: "",
    odometer: 1689.9, //Km
    speed: 0.0, //Km/h
    ignition: true,
    battery: 100, //%
    mainEnergy: 13.31, //V
    origin: "FCM",
    magnitude: 102.0, //L
    startFuel: 243.0, //L
    endFuel: 345.0, //L
    initialDate: "",
    endDate: "",
    geoData: {
      lat: 20.6695942,
      lon: -103.4186587,
      title: "Lonches Amparito",
      rows: [],
    },
  },
  {
    fechaCargaNoConciliada: "",
    address: "",
    odometer: 1689.9, //Km
    speed: 0.0, //Km/h
    ignition: true,
    battery: 100, //%
    mainEnergy: 13.31, //V
    origin: "FCM",
    magnitude: 102.0, //L
    startFuel: 243.0, //L
    endFuel: 345.0, //L
    initialDate: "",
    endDate: "",
    geoData: {
      lat: 20.6692594,
      lon: -103.4184047,
      title: "Pollo Pepe",
      rows: [],
    },
  },
  {
    fechaCargaNoConciliada: "",
    address: "",
    odometer: 1689.9, //Km
    speed: 0.0, //Km/h
    ignition: true,
    battery: 100, //%
    mainEnergy: 13.31, //V
    origin: "FCM",
    magnitude: 102.0, //L
    startFuel: 243.0, //L
    endFuel: 345.0, //L
    initialDate: "",
    endDate: "",
    geoData: {
      lat: 20.6604149,
      lon: -103.4212967,
      title: "The Home Depot Cordilleras",
      rows: [],
    },
  },
  {
    fechaCargaNoConciliada: "",
    address: "",
    odometer: 1689.9, //Km
    speed: 0.0, //Km/h
    ignition: true,
    battery: 100, //%
    mainEnergy: 13.31, //V
    origin: "FCM",
    magnitude: 102.0, //L
    startFuel: 243.0, //L
    endFuel: 345.0, //L
    initialDate: "",
    endDate: "",
    geoData: {
      lat: 20.6631444,
      lon: -103.4163634,
      title: "El Tablero",
      rows: [],
    },
  },
  {
    fechaCargaNoConciliada: "",
    address: "",
    odometer: 1689.9, //Km
    speed: 0.0, //Km/h
    ignition: true,
    battery: 100, //%
    mainEnergy: 13.31, //V
    origin: "FCM",
    magnitude: 102.0, //L
    startFuel: 243.0, //L
    endFuel: 345.0, //L
    initialDate: "",
    endDate: "",
    geoData: {
      lat: 20.6641483,
      lon: -103.4161971,
      title: "Cookie BAR GDL",
      rows: [],
    },
  },
];
