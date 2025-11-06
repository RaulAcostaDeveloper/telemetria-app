export interface ZonesDataMock {
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

export const zonesDataMock: ZonesDataMock[] = [
  {
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
