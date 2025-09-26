import { LanguageInterface } from "@/global/language/constants/language.model";
import { formatDateTime } from "@/global/utils/utils";

export type DataObject = Record<string, string | number>;

export interface TooltipGeoField {
  label: string;
  value: string;
}

export function getLabelsForChargeGeoMap(
  LANGUAGE: LanguageInterface,
  data: DataObject
): TooltipGeoField[] {
  return [
    {
      label: LANGUAGE.highCharts.tooltips.date,
      value: `${formatDateTime(data.dateGps.toString())}`,
    },
    { label: LANGUAGE.highCharts.tooltips.lat, value: `${data.lat}` },
    { label: LANGUAGE.highCharts.tooltips.lon, value: `${data.lon}` },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.initialFuel,
      value: `${data.initialFuel ?? "ND"} L`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.finalFuel,
      value: `${data.finalFuel ?? "ND"} L`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.totalCharges,
      value: `${data.magnitude ?? "ND"} L`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.odometer,
      value: `${data.odometer ?? "ND"} Km`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.speed,
      value: `${data.speed ?? "ND"}  km/h`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.ignition,
      value: `${
        data.ignition
          ? LANGUAGE.highCharts.tooltips.fuel.on
          : LANGUAGE.highCharts.tooltips.fuel.off
      }`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.deviceBattery,
      value: `${data.deviceBattery ?? "ND"} (%)`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.mainPower,
      value: `${data.mainPower ?? "ND"} (V)`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.address,
      value: `${data.address ?? "ND"}`,
    },
  ];
}

export function getLabelsForDischargeGeoMap(
  LANGUAGE: LanguageInterface,
  data: DataObject
): TooltipGeoField[] {
  return [
    {
      label: LANGUAGE.highCharts.tooltips.date,
      value: `${formatDateTime(data.dateGps.toString())}`,
    },
    { label: LANGUAGE.highCharts.tooltips.lat, value: `${data.lat}` },
    { label: LANGUAGE.highCharts.tooltips.lon, value: `${data.lon}` },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.initialFuel,
      value: `${data.initialFuel ?? "ND"} L`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.finalFuel,
      value: `${data.finalFuel ?? "ND"} L`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.totalDischarges,
      value: `${data.magnitude ?? "ND"} L`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.odometer,
      value: `${data.odometer ?? "ND"} Km`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.speed,
      value: `${data.speed ?? "ND"}  km/h`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.ignition,
      value: `${
        data.ignition
          ? LANGUAGE.highCharts.tooltips.fuel.on
          : LANGUAGE.highCharts.tooltips.fuel.off
      }`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.deviceBattery,
      value: `${data.deviceBattery ?? "ND"} (%)`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.mainPower,
      value: `${data.mainPower ?? "ND"} (V)`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.address,
      value: `${data.address ?? "ND"}`,
    },
  ];
}

export function getLabelsForLevelMessagesGeoMap(
  LANGUAGE: LanguageInterface,
  data: DataObject
): TooltipGeoField[] {
  return [
    {
      label: LANGUAGE.highCharts.tooltips.date,
      value: `${formatDateTime(data.dateGps.toString())}`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.lat,
      value: `${data.lat}`,
    },
    { label: LANGUAGE.highCharts.tooltips.lon, value: `${data.lon}` },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.odometer,
      value: `${data.odometer ?? "ND"} Km`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.speed,
      value: `${data.speed ?? "ND"}  km/h`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.ignition,
      value: `${
        data.ignition
          ? LANGUAGE.highCharts.tooltips.fuel.on
          : LANGUAGE.highCharts.tooltips.fuel.off
      }`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.deviceBattery,
      value: `${data.deviceBattery ?? "ND"} (%)`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.mainPower,
      value: `${data.mainPower ?? "ND"} (V)`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.tanks,
      value: `${data.tanks ?? "ND"} (L)`,
    },
  ];
}

export function getLabelsForRPMGeoMap(
  LANGUAGE: LanguageInterface,
  data: DataObject
): TooltipGeoField[] {
  return [
    {
      label: LANGUAGE.highCharts.tooltips.date,
      value: `${formatDateTime(data.dateGps.toString())}`,
    },
    { label: LANGUAGE.highCharts.tooltips.lat, value: `${data.lat}` },
    { label: LANGUAGE.highCharts.tooltips.lon, value: `${data.lon}` },
    {
      label: LANGUAGE.highCharts.tooltips.rpm.rpm,
      value: `${data.value ?? "ND"}`,
    },
  ];
}

export function getLabelsForDistanceGeoMap(
  LANGUAGE: LanguageInterface,
  data: DataObject
): TooltipGeoField[] {
  return [
    {
      label: LANGUAGE.highCharts.tooltips.date,
      value: `${formatDateTime(data.dateGps.toString())}`,
    },
    { label: LANGUAGE.highCharts.tooltips.lat, value: `${data.lat}` },
    { label: LANGUAGE.highCharts.tooltips.lon, value: `${data.lon}` },
    {
      label: LANGUAGE.highCharts.tooltips.distance.distanceTraveled,
      value: `${data.value ?? "ND"} Km`,
    },
  ];
}

export function getLabelsForTimeTraveledGeoMap(
  LANGUAGE: LanguageInterface,
  data: DataObject
): TooltipGeoField[] {
  return [
    {
      label: LANGUAGE.highCharts.tooltips.date,
      value: `${formatDateTime(data.dateGps.toString())}`,
    },
    { label: LANGUAGE.highCharts.tooltips.lat, value: `${data.lat}` },
    { label: LANGUAGE.highCharts.tooltips.lon, value: `${data.lon}` },
    {
      label: LANGUAGE.highCharts.tooltips.timeTraveled.timeTraveled,
      value: `${data.value ?? "ND"} H`,
    },
  ];
}
