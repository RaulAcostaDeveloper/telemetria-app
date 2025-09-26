import { LanguageInterface } from "../language/constants/language.model";
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
      value: (data) => `${data.initialFuel ?? "ND"} L`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.finalFuel,
      value: (data) => `${data.finalFuel ?? "ND"} L`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.totalCharges,
      value: (data) => `${data.magnitude ?? "ND"} L`,
    },
    { label: LANGUAGE.highCharts.tooltips.lat, value: (data) => data.lat },
    { label: LANGUAGE.highCharts.tooltips.lon, value: (data) => data.lon },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.odometer,
      value: (data) => `${data.odometer ?? "ND"} Km`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.speed,
      value: (data) => `${data.speed ?? "ND"}  Km/h`,
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
      value: (data) => `${data.deviceBattery ?? "ND"} (%)`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.mainPower,
      value: (data) => `${data.mainPower ?? "ND"} (V)`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.address,
      value: (data) => data.address ?? "ND",
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
      value: (data) => `${data.initialFuel ?? "ND"} L`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.finalFuel,
      value: (data) => `${data.finalFuel ?? "ND"} L`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.totalDischarges,
      value: (data) => `${data.magnitude ?? "ND"} L`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.odometer,
      value: (data) => `${data.odometer ?? "ND"} Km`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.speed,
      value: (data) => `${data.speed ?? "ND"}  km/h`,
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
      value: (data) => `${data.deviceBattery ?? "ND"} (%)`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.mainPower,
      value: (data) => `${data.mainPower ?? "ND"} (V)`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.address,
      value: (data) => data.address ?? "ND",
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
      value: (data) => `${data.odometer ?? "ND"} Km`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.speed,
      value: (data) => `${data.speed ?? "ND"}  km/h`,
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
      value: (data) => `${data.deviceBattery ?? "ND"} (%)`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.mainPower,
      value: (data) => `${data.mainPower ?? "ND"} (V)`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.tanks,
      value: (data) => `${data.tanks ?? "ND"} (L)`,
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
      value: (data) => `${data.averagePerformance ?? "ND"}  Km/h`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.fuelConsumed,
      value: (data) => `${data.fuelConsumed ?? "ND"} L`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.initialLevel,
      value: (data) => `${data.initialLevel ?? "ND"} L`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.finalLevel,
      value: (data) => `${data.finalLevel ?? "ND"}  L`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.initialOdometer,
      value: (data) => `${data.initialOdometer ?? "ND"}  Km`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.finalOdometer,
      value: (data) => `${data.finalOdometer ?? "ND"} Km`,
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
      value: (data) => `${data.value ?? "ND"}`,
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
      value: (data) => `${data.value ?? "ND"} Km`,
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
      value: (data) => `${data.value ?? "ND"} H`,
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
