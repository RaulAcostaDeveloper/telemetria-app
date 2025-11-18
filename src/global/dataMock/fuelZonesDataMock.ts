export interface FuelZonesDataMock {
  id: string;
  zoneName: string;
  profileName: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  totalEvents: number;
  totalLitersCharges: number;
  totalLitersDischarges: number;
}

export const fuelZonesDataMock: FuelZonesDataMock[] = [
  {
    id: "ede1ecd4-0f35-4070-9ac7-00034cce965e",
    zoneName: "Zona Norte",
    profileName: "Operador A",
    country: "México",
    state: "Nuevo León",
    city: "Monterrey",
    zipCode: "64000",
    totalEvents: 18,
    totalLitersCharges: 12500,
    totalLitersDischarges: 8700,
  },
  {
    id: "ede1ecd4-0f35-4070-9ac7-00034cce965e",
    zoneName: "Zona Sur",
    profileName: "Supervisor B",
    country: "México",
    state: "Chiapas",
    city: "Tuxtla Gutiérrez",
    zipCode: "29000",
    totalEvents: 22,
    totalLitersCharges: 9800,
    totalLitersDischarges: 9100,
  },
  {
    id: "ede1ecd4-0f35-4070-9ac7-00034cce965e",
    zoneName: "Zona Centro",
    profileName: "Administrador C",
    country: "México",
    state: "Ciudad de México",
    city: "CDMX",
    zipCode: "01000",
    totalEvents: 35,
    totalLitersCharges: 15200,
    totalLitersDischarges: 14800,
  },
  {
    id: "ede1ecd4-0f35-4070-9ac7-00034cce965e",
    zoneName: "Zona Este",
    profileName: "Operador D",
    country: "México",
    state: "Veracruz",
    city: "Veracruz",
    zipCode: "91700",
    totalEvents: 12,
    totalLitersCharges: 7600,
    totalLitersDischarges: 5400,
  },
  {
    id: "ede1ecd4-0f35-4070-9ac7-00034cce965e",
    zoneName: "Zona Oeste",
    profileName: "Técnico E",
    country: "México",
    state: "Jalisco",
    city: "Guadalajara",
    zipCode: "44100",
    totalEvents: 27,
    totalLitersCharges: 13300,
    totalLitersDischarges: 12000,
  },
];
