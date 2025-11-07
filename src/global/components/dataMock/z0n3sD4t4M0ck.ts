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

export interface zoneDataMock {
  markersInZone: MarkerData[];
  geoData: GeoData;
}

export const z0n3sD4t4M0ck: zoneDataMock[] = [
  {
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
  },
  {
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
