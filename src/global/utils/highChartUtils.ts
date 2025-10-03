import { LanguageInterface } from "../language/constants/language.model";
import { ndIfEmpty } from "./ndIfEmpty";
import { formatDateTime } from "./utils";

type StringObject = Record<string, string>;

export interface TooltipField {
  label: string;
  value: (data: StringObject) => string;
}

// Constructor del tooltip
function buildTooltipSection(label: string, value: string): string {
  return `
  <div style="width: 100%; font-size: 18px; display: flex; justify-content: space-between;">
    <strong style="margin-right: 10px;">${label}:</strong> <p>${value}</p>
  </div>
  `;
}

export function createTooltipFormatter(
  fields: TooltipField[]
): (this: Highcharts.Point & { options: { custom: string } }) => string {
  return function (
    this: Highcharts.Point & { options: { custom: string } }
  ): string {
    const c = this.options.custom;

    const content = fields
      .map(({ label, value }) => buildTooltipSection(label, value(c)))
      .join("");

    return `
      <div style="width: auto; padding: 7px; font-size: 14px; display: flex; flex-direction: column; gap: 5px;">
        ${content}
      </div>
    `;
  };
}

// Tooltips para diferentes series de datos

export function getChargesTooltipFields(
  LANGUAGE: LanguageInterface
): TooltipField[] {
  return [
    {
      label: LANGUAGE.highCharts.tooltips.date,
      value: (data) => `${formatDateTime(data.dateGps)}`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.initialFuel,
      value: (data) => `${ndIfEmpty(data.initialFuel)} L`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.finalFuel,
      value: (data) => `${ndIfEmpty(data.finalFuel)} L`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.totalCharges,
      value: (data) => `${ndIfEmpty(data.magnitude)} L`,
    },
    { label: LANGUAGE.highCharts.tooltips.lat, value: (data) => data.lat },
    { label: LANGUAGE.highCharts.tooltips.lon, value: (data) => data.lon },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.odometer,
      value: (data) => `${ndIfEmpty(data.odometer)} Km`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.speed,
      value: (data) => `${ndIfEmpty(data.speed)}  Km/h`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.ignition,
      value: (data) =>
        `${
          data.ignition
            ? LANGUAGE.highCharts.tooltips.fuel.on
            : LANGUAGE.highCharts.tooltips.fuel.off
        }`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.deviceBattery,
      value: (data) => `${ndIfEmpty(data.deviceBattery)} (%)`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.mainPower,
      value: (data) => `${ndIfEmpty(data.mainPower)} (V)`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.address,
      value: (data) => `${ndIfEmpty(data.address)}`,
    },
  ];
}

export function getDisChargesTooltipFields(
  LANGUAGE: LanguageInterface
): TooltipField[] {
  return [
    {
      label: LANGUAGE.highCharts.tooltips.date,
      value: (data) => `${formatDateTime(data.dateGps)}`,
    },
    { label: LANGUAGE.highCharts.tooltips.lat, value: (data) => data.lat },
    { label: LANGUAGE.highCharts.tooltips.lon, value: (data) => data.lon },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.initialFuel,
      value: (data) => `${ndIfEmpty(data.initialFuel)} L`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.finalFuel,
      value: (data) => `${ndIfEmpty(data.finalFuel)} L`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.totalDischarges,
      value: (data) => `${ndIfEmpty(data.magnitude)} L`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.odometer,
      value: (data) => `${ndIfEmpty(data.odometer)} Km`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.speed,
      value: (data) => `${ndIfEmpty(data.speed)}  km/h`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.ignition,
      value: (data) =>
        `${
          data.ignition
            ? LANGUAGE.highCharts.tooltips.fuel.on
            : LANGUAGE.highCharts.tooltips.fuel.off
        }`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.deviceBattery,
      value: (data) => `${ndIfEmpty(data.deviceBattery)} (%)`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.mainPower,
      value: (data) => `${ndIfEmpty(data.mainPower)} (V)`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.address,
      value: (data) => `${ndIfEmpty(data.address)}`,
    },
  ];
}

export function getLevelMessagesTooltipFields(
  LANGUAGE: LanguageInterface
): TooltipField[] {
  return [
    {
      label: LANGUAGE.highCharts.tooltips.date,
      value: (data) => `${formatDateTime(data.dateGps)}`,
    },
    { label: LANGUAGE.highCharts.tooltips.lat, value: (data) => data.lat },
    { label: LANGUAGE.highCharts.tooltips.lon, value: (data) => data.lon },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.odometer,
      value: (data) => `${ndIfEmpty(data.odometer)} Km`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.speed,
      value: (data) => `${ndIfEmpty(data.speed)}  km/h`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.ignition,
      value: (data) =>
        `${
          data.ignition
            ? LANGUAGE.highCharts.tooltips.fuel.on
            : LANGUAGE.highCharts.tooltips.fuel.off
        }`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.deviceBattery,
      value: (data) => `${ndIfEmpty(data.deviceBattery)} (%)`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.mainPower,
      value: (data) => `${ndIfEmpty(data.mainPower)} (V)`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.tanks,
      value: (data) => `${ndIfEmpty(data.tanks)} (L)`,
    },
  ];
}

export function getPerformancesBetweenChargesTooltipFields(
  LANGUAGE: LanguageInterface
): TooltipField[] {
  return [
    {
      label: LANGUAGE.highCharts.tooltips.date,
      value: (data) => `${formatDateTime(data.dateGps)}`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.averagePerformance,
      value: (data) => `${ndIfEmpty(data.averagePerformance)}  Km/h`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.fuelConsumed,
      value: (data) => `${ndIfEmpty(data.fuelConsumed)} L`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.initialLevel,
      value: (data) => `${ndIfEmpty(data.initialLevel)} L`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.finalLevel,
      value: (data) => `${ndIfEmpty(data.finalLevel)}  L`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.initialOdometer,
      value: (data) => `${ndIfEmpty(data.initialOdometer)}  Km`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.finalOdometer,
      value: (data) => `${ndIfEmpty(data.finalOdometer)} Km`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.distanceTravelled,
      value: (data) =>
        `${Number(data.finalOdometer) - Number(data.initialOdometer)} Km`,
    },
  ];
}

export function getRPMTooltipFields(
  LANGUAGE: LanguageInterface
): TooltipField[] {
  return [
    {
      label: LANGUAGE.highCharts.tooltips.date,
      value: (data) => `${formatDateTime(data.dateGps)}`,
    },
    { label: LANGUAGE.highCharts.tooltips.lat, value: (data) => data.lat },
    { label: LANGUAGE.highCharts.tooltips.lon, value: (data) => data.lon },
    {
      label: LANGUAGE.highCharts.tooltips.rpm.rpm,
      value: (data) => `${ndIfEmpty(data.value)}`,
    },
  ];
}

export function getDistanceTooltipFields(
  LANGUAGE: LanguageInterface
): TooltipField[] {
  return [
    {
      label: LANGUAGE.highCharts.tooltips.date,
      value: (data) => `${formatDateTime(data.dateGps)}`,
    },
    { label: LANGUAGE.highCharts.tooltips.lat, value: (data) => data.lat },
    { label: LANGUAGE.highCharts.tooltips.lon, value: (data) => data.lon },
    {
      label: LANGUAGE.highCharts.tooltips.distance.distanceTraveled,
      value: (data) => `${ndIfEmpty(data.value)} Km`,
    },
  ];
}

export function getTimeTraveledTooltipFields(
  LANGUAGE: LanguageInterface
): TooltipField[] {
  return [
    {
      label: LANGUAGE.highCharts.tooltips.date,
      value: (data) => `${formatDateTime(data.dateGps)}`,
    },
    { label: LANGUAGE.highCharts.tooltips.lat, value: (data) => data.lat },
    { label: LANGUAGE.highCharts.tooltips.lon, value: (data) => data.lon },
    {
      label: LANGUAGE.highCharts.tooltips.timeTraveled.timeTraveled,
      value: (data) => `${ndIfEmpty(data.value)} H`,
    },
  ];
}

/* export function getDrivenTooltipFields(
  LANGUAGE: LanguageInterface
): TooltipField[] {
  return [
    {
      label: LANGUAGE.highCharts.tooltips.telemetryOBD.xAxisDriven,
      value: (data) => `${data.x}`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.telemetryOBD.yAxis,
      value: (data) => `${data.y}`,
    },
  ];
} */
