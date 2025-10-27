import { LanguageInterface } from "../language/constants/language.model";
import { ndIfEmpty } from "./ndIfEmpty";
import { formatDateTime } from "./utils";

type StringObject = Record<string, string>;

interface Separator {
  position: number;
  subtitle: string;
}

export interface TooltipField {
  label: string;
  value: (data: StringObject) => string;
  separator?: { position: number; subtitle: string };
}

// Constructor del tooltip
function buildTooltipSection(
  label: string,
  value: string,
  index: number,
  separator?: Separator
): string {
  let stringHTML = "";
  if (separator && index + 1 === separator.position) {
    stringHTML += `
    <div style="font-size: 18px; padding-top: 0.5em; text-align: center;">
      <div style="color: black;">───────  ${separator.subtitle}  ───────</div>
    </div>
    `;
  }
  stringHTML += `
  <div style="width: 100%; font-size: 18px; display: flex; justify-content: space-between;">
    <strong style="margin-right: 10px;">${label}:</strong> <p>${value}</p>
  </div>
  `;

  return stringHTML;
}

export function createTooltipFormatter(
  title: string,
  fields: TooltipField[]
): (this: Highcharts.Point & { options: { custom: string } }) => string {
  return function (
    this: Highcharts.Point & { options: { custom: string } }
  ): string {
    const c = this.options.custom;

    const content = fields
      .map(({ label, value, separator }, index) =>
        buildTooltipSection(label, value(c), index, separator)
      )
      .join("");

    const titleHTML = `<div style="width: 100%; font-size: 16px; font-weight: bold; display: inline-block; text-align: center;">
          ${title}
        </div>`;

    return `
      <div>
        <div style="width: auto; padding: 7px; font-size: 14px; display: flex; flex-direction: column; gap: 5px;">
        ${titleHTML}
        ${content}
        </div>
      <div>
    `;
  };
}

// Tooltips para diferentes series de datos

export function getChargesTooltipFields(
  LANGUAGE: LanguageInterface
): TooltipField[] {
  return [
    {
      label: LANGUAGE.highCharts.tooltips.startDate,
      value: (data) => `${formatDateTime(data.startDate)}`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.endDate,
      value: (data) => `${formatDateTime(data.endDate)}`,
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
    {
      label: LANGUAGE.highCharts.tooltips.fuel.initialFuel,
      value: (data) => `${ndIfEmpty(data.initialFuel)} L`,
      separator: {
        position: 11,
        subtitle: LANGUAGE.highCharts.tooltips.fuel.subtitleCharges,
      },
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.finalFuel,
      value: (data) => `${ndIfEmpty(data.finalFuel)} L`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.totalCharges,
      value: (data) => `${ndIfEmpty(data.magnitude)} L`,
    },
  ];
}

export function getDisChargesTooltipFields(
  LANGUAGE: LanguageInterface
): TooltipField[] {
  return [
    {
      label: LANGUAGE.highCharts.tooltips.startDate,
      value: (data) => `${formatDateTime(data.startDate)}`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.endDate,
      value: (data) => `${formatDateTime(data.endDate)}`,
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
      label: LANGUAGE.highCharts.tooltips.fuel.address,
      value: (data) => `${ndIfEmpty(data.address)}`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.initialFuel,
      value: (data) => `${ndIfEmpty(data.initialFuel)} L`,
      separator: {
        position: 11,
        subtitle: LANGUAGE.highCharts.tooltips.fuel.subtitleDischarges,
      },
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.finalFuel,
      value: (data) => `${ndIfEmpty(data.finalFuel)} L`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.totalDischarges,
      value: (data) => `${ndIfEmpty(data.magnitude)} L`,
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
      label: LANGUAGE.highCharts.tooltips.fuel.tanksSum,
      value: (data) => `${sumFuelTanks(data.tanks)} (L)`,
      separator: {
        position: 9,
        subtitle: LANGUAGE.highCharts.tooltips.fuel.subtitleFuelVariationCAN,
      },
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.tanksSum,
      value: (data) => `${ndIfEmpty(data.currentLevelSmoothly)} (L)`,
    },
  ];
}

export function getPerformancesBetweenChargesTooltipFields(
  LANGUAGE: LanguageInterface
): TooltipField[] {
  return [
    {
      label: LANGUAGE.highCharts.tooltips.startDate,
      value: (data) => `${formatDateTime(data.startDate)}`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.endDate,
      value: (data) => `${formatDateTime(data.dateGps)}`,
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
      value: (data) => `${data.kilometersTraveled} Km`,
    },
    {
      label: LANGUAGE.highCharts.tooltips.fuel.averagePerformance,
      value: (data) => `${ndIfEmpty(data.averagePerformance)}  Km/L`,
      separator: {
        position: 6,
        subtitle: LANGUAGE.highCharts.tooltips.fuel.subtitlePerformanceBetween,
      },
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
      separator: {
        position: 4,
        subtitle: LANGUAGE.highCharts.tooltips.rpm.subtitleTelemetryRPM,
      },
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
      separator: {
        position: 4,
        subtitle: LANGUAGE.highCharts.tooltips.distance.subtitleDistance,
      },
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
      separator: {
        position: 4,
        subtitle:
          LANGUAGE.highCharts.tooltips.timeTraveled.subtitleTimeTraveled,
      },
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
