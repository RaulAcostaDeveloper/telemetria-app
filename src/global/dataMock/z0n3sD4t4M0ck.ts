import { TooltipGeoField } from "@/global/utils/geoMapUtils";

interface GeoData {
  lat: number;
  lon: number;
  title: string;
  rows: TooltipGeoField[];
}
interface MarkerData {
  id: number;
  position: { lat: number; lng: number };
  title: string;
}
interface loadData {
  vehicleId: string;
  date: string;
  loadValue: number;
}

export interface zoneDataMock {
  zoneId: string;
  zoneName: string;
  markersInZone: MarkerData[];
  geoData: GeoData;
  loads: loadData[];
  unloads: loadData[];
}

export const z0n3sD4t4M0ck: zoneDataMock[] = [
  {
    zoneId: "1",
    zoneName: "Zona Norte F",
    markersInZone: [
      {
        id: 1,
        position: {
          lat: 20.6663943,
          lng: -103.4160823,
        },
        title: "Parque Escaleno",
      },
      {
        id: 2,
        position: {
          lat: 20.6656916,
          lng: -103.4194916,
        },
        title: "Walmart",
      },
    ],
    geoData: {
      lat: 20.6663943,
      lon: -103.4160823,
      title: "Parque Escaleno",
      rows: [],
    },
    loads: [
      {
        vehicleId: "S170 (849494949494943)",
        date: "2025-09-19T14:03:22",
        loadValue: 580,
      },
      {
        vehicleId: "S171 (849494949494943)",
        date: "2025-09-20T14:03:22",
        loadValue: 400,
      },
      {
        vehicleId: "S172 (849494949494943)",
        date: "2025-09-20T16:03:22",
        loadValue: 200,
      },
    ],
    unloads: [
      {
        vehicleId: "S170 (849494949494943)",
        date: "2025/09/21T14:03:22",
        loadValue: 280,
      },
      {
        vehicleId: "S171 (849494949494943)",
        date: "2025/09/22T14:03:22",
        loadValue: 100,
      },
      {
        vehicleId: "S172 (849494949494943)",
        date: "2025/09/22T16:03:22",
        loadValue: 10,
      },
    ],
  },
  {
    zoneId: "2",
    zoneName: "Zona Sur F",
    markersInZone: [
      {
        id: 3,
        position: {
          lat: 20.6663943,
          lng: -103.4160823,
        },
        title: "Parque Escaleno",
      },
      {
        id: 4,
        position: {
          lat: 20.6656916,
          lng: -103.4194916,
        },
        title: "Walmart",
      },
    ],
    geoData: {
      lat: 20.6656916,
      lon: -103.4194916,
      title: "Walmart",
      rows: [],
    },
    loads: [
      {
        vehicleId: "S170 (849494949494943)",
        date: "2025-09-19T14:03:22",
        loadValue: 580,
      },
      {
        vehicleId: "S171 (849494949494943)",
        date: "2025-09-20T14:03:22",
        loadValue: 400,
      },
      {
        vehicleId: "S172 (849494949494943)",
        date: "2025-09-20T16:03:22",
        loadValue: 200,
      },
    ],
    unloads: [
      {
        vehicleId: "S170 (849494949494943)",
        date: "2025-09-21T14:03:22",
        loadValue: 280,
      },
      {
        vehicleId: "S171 (849494949494943)",
        date: "2025-09-22T14:03:22",
        loadValue: 100,
      },
      {
        vehicleId: "S172 (849494949494943)",
        date: "2025-09-22T16:03:22",
        loadValue: 10,
      },
    ],
  },
  /*   {
    geoData: {
      lat: 20.6695942,
      lon: -103.4186587,
      title: "Lonches Amparito",
      rows: [],
    },
  },
  {
    geoData: {
      lat: 20.6692594,
      lon: -103.4184047,
      title: "Pollo Pepe",
      rows: [],
    },
  },
  {
    geoData: {
      lat: 20.6604149,
      lon: -103.4212967,
      title: "The Home Depot Cordilleras",
      rows: [],
    },
  },
  {
    geoData: {
      lat: 20.6631444,
      lon: -103.4163634,
      title: "El Tablero",
      rows: [],
    },
  },
  {
    geoData: {
      lat: 20.6641483,
      lon: -103.4161971,
      title: "Cookie BAR GDL",
      rows: [],
    },
  }, */
];
