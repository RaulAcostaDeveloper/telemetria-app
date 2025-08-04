import { LanguageInterface } from "@/modules/global/language/constants/language.model";
import { formatDateTime } from "@/modules/global/utils/utils";

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
      value: `${data.initialFuel} L`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.finalFuel,
      value: `${data.finalFuel} L`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.totalCharges,
      value: `${data.magnitude} L`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.odometer,
      value: `${data.odometer} Km`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.speed,
      value: `${data.speed}  km/h`,
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
      value: `${data.deviceBattery} (%)`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.mainPower,
      value: `${data.mainPower} (V)`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.address,
      value: `${data.address}`,
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
      value: `${data.initialFuel} L`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.finalFuel,
      value: `${data.finalFuel} L`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.totalDischarges,
      value: `${data.magnitude} L`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.odometer,
      value: `${data.odometer} Km`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.speed,
      value: `${data.speed}  km/h`,
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
      value: `${data.deviceBattery} (%)`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.mainPower,
      value: `${data.mainPower} (V)`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.address,
      value: `${data.address}`,
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
      value: `${data.odometer} Km`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.speed,
      value: `${data.speed}  km/h`,
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
      value: `${data.deviceBattery} (%)`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.mainPower,
      value: `${data.mainPower} (V)`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.tanks,
      value: `${data.tanks} (L)`,
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
    { label: LANGUAGE.highCharts.tooltips.rpm.rpm, value: `${data.value}` },
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
      value: `${data.value} Km`,
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
      value: `${data.value} H`,
    },
  ];
}
