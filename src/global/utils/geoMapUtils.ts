import { LanguageInterface } from "@/global/language/constants/language.model";
import { legibleDate } from "@/global/utils/dateUtils";
import { ndIfEmpty } from "./ndIfEmpty";

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
      value: `${legibleDate(data.dateGps.toString(), LANGUAGE.localeLanguage)}`,
    },
    { label: LANGUAGE.highCharts.tooltips.lat, value: `${data.lat}` },
    { label: LANGUAGE.highCharts.tooltips.lon, value: `${data.lon}` },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.initialFuel,
      value: `${ndIfEmpty(data.initialFuel)} L`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.finalFuel,
      value: `${ndIfEmpty(data.finalFuel)} L`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.totalCharges,
      value: `${ndIfEmpty(data.magnitude)} L`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.odometer,
      value: `${ndIfEmpty(data.odometer)} Km`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.speed,
      value: `${ndIfEmpty(data.speed)}  km/h`,
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
      value: `${ndIfEmpty(data.deviceBattery)} (%)`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.mainPower,
      value: `${ndIfEmpty(data.mainPower)} (V)`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.address,
      value: `${ndIfEmpty(data.address)}`,
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
      value: `${legibleDate(data.dateGps.toString(), LANGUAGE.localeLanguage)}`,
    },
    { label: LANGUAGE.highCharts.tooltips.lat, value: `${data.lat}` },
    { label: LANGUAGE.highCharts.tooltips.lon, value: `${data.lon}` },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.initialFuel,
      value: `${ndIfEmpty(data.initialFuel)} L`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.finalFuel,
      value: `${ndIfEmpty(data.finalFuel)} L`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.totalDischarges,
      value: `${ndIfEmpty(data.magnitude)} L`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.odometer,
      value: `${ndIfEmpty(data.odometer)} Km`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.speed,
      value: `${ndIfEmpty(data.speed)}  km/h`,
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
      value: `${ndIfEmpty(data.deviceBattery)} (%)`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.mainPower,
      value: `${ndIfEmpty(data.mainPower)} (V)`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.address,
      value: `${ndIfEmpty(data.address)}`,
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
      value: `${legibleDate(data.dateGps.toString(), LANGUAGE.localeLanguage)}`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.lat,
      value: `${data.lat}`,
    },
    { label: LANGUAGE.highCharts.tooltips.lon, value: `${data.lon}` },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.odometer,
      value: `${ndIfEmpty(data.odometer)} Km`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.speed,
      value: `${ndIfEmpty(data.speed)}  km/h`,
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
      value: `${ndIfEmpty(data.deviceBattery)} (%)`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.mainPower,
      value: `${ndIfEmpty(data.mainPower)} (V)`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.tanksSum,
      value: `${ndIfEmpty(data.currentLevelSmoothly)} (L)`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.tanks,
      value: `${ndIfEmpty(data.tanks)} (L)`,
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
      value: `${legibleDate(data.dateGps.toString(), LANGUAGE.localeLanguage)}`,
    },
    { label: LANGUAGE.highCharts.tooltips.lat, value: `${data.lat}` },
    { label: LANGUAGE.highCharts.tooltips.lon, value: `${data.lon}` },
    {
      label: LANGUAGE.highCharts.tooltips.rpm.rpm,
      value: `${ndIfEmpty(data.value)}`,
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
      value: `${legibleDate(data.dateGps.toString(), LANGUAGE.localeLanguage)}`,
    },
    { label: LANGUAGE.highCharts.tooltips.lat, value: `${data.lat}` },
    { label: LANGUAGE.highCharts.tooltips.lon, value: `${data.lon}` },
    {
      label: LANGUAGE.highCharts.tooltips.distance.distanceTraveled,
      value: `${ndIfEmpty(data.value)} Km`,
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
      value: `${legibleDate(data.dateGps.toString(), LANGUAGE.localeLanguage)}`,
    },
    { label: LANGUAGE.highCharts.tooltips.lat, value: `${data.lat}` },
    { label: LANGUAGE.highCharts.tooltips.lon, value: `${data.lon}` },
    {
      label: LANGUAGE.highCharts.tooltips.timeTraveled.timeTraveled,
      value: `${ndIfEmpty(data.value)} H`,
    },
  ];
}
