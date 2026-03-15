import {
  ArrayProviders,
  ZoneTypes,
} from "../redux/serviceSlices/zoneProvidersSlice";

const zoneTypes: ZoneTypes[] = [
  {
    id: "zt_01",
    name: "Gasolinera",
  },
  {
    id: "zt_02",
    name: "Patio Logístico",
  },
  {
    id: "zt_03",
    name: "Centro de Distribución",
  },
  {
    id: "zt_04",
    name: "Zona de Descanso",
  },
  {
    id: "zt_05",
    name: "Área Industrial",
  },
];

export const zoneProvidersDataMock: ArrayProviders = {
  zoneTypes,
};
