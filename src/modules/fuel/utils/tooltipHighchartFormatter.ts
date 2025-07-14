type StringObject = Record<string, string>;
type DataObject = Record<string, string | number>;

export interface TooltipField {
  label: string;
  value: (data: StringObject) => string;
}

export interface TooltipGeoField {
  label: string;
  value: string;
}

// Tooltips para diferentes series de datos
export function getChargesTooltipFields(
  LANGUAGE: StringObject
): TooltipField[] {
  return [
    { label: LANGUAGE.date, value: (c) => `${c.dateGps}` },
    { label: LANGUAGE.initialFuel, value: (c) => `${c.initialFuel} L` },
    { label: LANGUAGE.finalFuel, value: (c) => `${c.finalFuel} L` },
    { label: LANGUAGE.totalCharges, value: (c) => `${c.magnitude} L` },
    // { label: LANGUAGE.address, value: (c) => c.address },
    { label: LANGUAGE.lat, value: (c) => c.lat },
    { label: LANGUAGE.lon, value: (c) => c.lon },
    { label: LANGUAGE.odometer, value: (c) => `${c.odometer} Km` },
    { label: LANGUAGE.speed, value: (c) => `${c.speed}  km/h` },
    { label: LANGUAGE.ignition, value: (c) => c.ignition },
    {
      label: LANGUAGE.deviceBattery,
      value: (c) => `${c.deviceBattery} (%)`,
    },
    { label: LANGUAGE.mainPower, value: (c) => `${c.mainPower} (V)` },
  ];
}

export function getDisChargesTooltipFields(
  LANGUAGE: StringObject
): TooltipField[] {
  return [
    { label: LANGUAGE.date, value: (c) => `${c.dateGps}` },
    {
      label: LANGUAGE.initialFuel,
      value: (c) => `${c.initialFuel} L`,
    },
    { label: LANGUAGE.finalFuel, value: (c) => `${c.finalFuel} L` },
    { label: LANGUAGE.totalDischarges, value: (c) => `${c.magnitude} L` },
    // { label: LANGUAGE.address, value: (c) => c.address },
    { label: LANGUAGE.lat, value: (c) => c.lat },
    { label: LANGUAGE.lon, value: (c) => c.lon },
    { label: LANGUAGE.odometer, value: (c) => `${c.odometer} Km` },
    { label: LANGUAGE.speed, value: (c) => `${c.speed}  km/h` },
    { label: LANGUAGE.ignition, value: (c) => c.ignition },
    {
      label: LANGUAGE.deviceBattery,
      value: (c) => `${c.deviceBattery} (%)`,
    },
    { label: LANGUAGE.mainPower, value: (c) => `${c.mainPower} (V)` },
  ];
}

export function getLevelMessagesTooltipFields(
  LANGUAGE: StringObject
): TooltipField[] {
  return [
    { label: LANGUAGE.date, value: (c) => `${c.dateGps}` },
    { label: LANGUAGE.lat, value: (c) => c.lat },
    { label: LANGUAGE.lon, value: (c) => c.lon },
    { label: LANGUAGE.odometer, value: (c) => `${c.odometer} Km` },
    { label: LANGUAGE.speed, value: (c) => `${c.speed}  km/h` },
    { label: LANGUAGE.ignition, value: (c) => c.ignition },
    {
      label: LANGUAGE.deviceBattery,
      value: (c) => `${c.deviceBattery} (%)`,
    },
    { label: LANGUAGE.mainPower, value: (c) => `${c.mainPower} (V)` },
    { label: LANGUAGE.tanks, value: (c) => `${c.tanks} (L)` },
  ];
}

export function getPerformancesBetweenChargesTooltipFields(
  LANGUAGE: StringObject
): TooltipField[] {
  return [
    { label: LANGUAGE.date, value: (c) => `${c.dateGps}` },
    {
      label: LANGUAGE.averagePerformance,
      value: (c) => `${c.averagePerformance}  Km/h`,
    },
    { label: LANGUAGE.fuelConsumed, value: (c) => `${c.fuelConsumed} L` },
    { label: LANGUAGE.initialLevel, value: (c) => `${c.initialLevel} L` },
    { label: LANGUAGE.finalLevel, value: (c) => `${c.finalLevel}  L` },
    {
      label: LANGUAGE.initialOdometer,
      value: (c) => `${c.initialOdometer}  Km`,
    },
    {
      label: LANGUAGE.finalOdometer,
      value: (c) => `${c.finalOdometer} Km`,
    },
    {
      label: LANGUAGE.distanceTravelled,
      value: (c) => `${Number(c.finalOdometer) - Number(c.initialOdometer)} Km`,
    },
  ];
}

export function getLabelsForChargeGeoMap(
  LANGUAGE: StringObject,
  data: DataObject
): TooltipGeoField[] {
  return [
    { label: LANGUAGE.date, value: `${data.dateGps}` },
    { label: LANGUAGE.initialFuel, value: `${data.initialFuel} L` },
    { label: LANGUAGE.finalFuel, value: `${data.finalFuel} L` },
    { label: LANGUAGE.totalCharges, value: `${data.magnitude} L` },
    { label: LANGUAGE.address, value: `${data.address}` },
    { label: LANGUAGE.lat, value: `${data.lat}` },
    { label: LANGUAGE.lon, value: `${data.lon}` },
    { label: LANGUAGE.odometer, value: `${data.odometer} Km` },
    { label: LANGUAGE.speed, value: `${data.speed}  km/h` },
    { label: LANGUAGE.ignition, value: `${data.ignition}` },
    {
      label: LANGUAGE.deviceBattery,
      value: `${data.deviceBattery} (%)`,
    },
    { label: LANGUAGE.mainPower, value: `${data.mainPower} (V)` },
  ];
}

export function getLabelsForDischargeGeoMap(
  LANGUAGE: StringObject,
  data: DataObject
): TooltipGeoField[] {
  return [
    { label: LANGUAGE.date, value: `${data.dateGps}` },
    { label: LANGUAGE.initialFuel, value: `${data.initialFuel} L` },
    { label: LANGUAGE.finalFuel, value: `${data.finalFuel} L` },
    { label: LANGUAGE.totalDischarges, value: `${data.magnitude} L` },
    { label: LANGUAGE.address, value: `${data.address}` },
    { label: LANGUAGE.lat, value: `${data.lat}` },
    { label: LANGUAGE.lon, value: `${data.lon}` },
    { label: LANGUAGE.odometer, value: `${data.odometer} Km` },
    { label: LANGUAGE.speed, value: `${data.speed}  km/h` },
    { label: LANGUAGE.ignition, value: `${data.ignition}` },
    {
      label: LANGUAGE.deviceBattery,
      value: `${data.deviceBattery} (%)`,
    },
    { label: LANGUAGE.mainPower, value: `${data.mainPower} (V)` },
  ];
}

export function getLabelsForLevelMessagesGeoMap(
  LANGUAGE: StringObject,
  data: DataObject
): TooltipGeoField[] {
  return [
    { label: LANGUAGE.date, value: `${data.dateGps}` },
    {
      label: LANGUAGE.lat,
      value: `${data.lat}`,
    },
    { label: LANGUAGE.lon, value: `${data.lon}` },
    { label: LANGUAGE.odometer, value: `${data.odometer} Km` },
    { label: LANGUAGE.speed, value: `${data.speed}  km/h` },
    { label: LANGUAGE.ignition, value: `${data.ignition}` },
    { label: LANGUAGE.deviceBattery, value: `${data.deviceBattery} (%)` },
    { label: LANGUAGE.mainPower, value: `${data.mainPower} (V)` },
    { label: LANGUAGE.tanks, value: `${data.tanks} (L)` },
  ];
}

// Constructor del tooltip
function buildTooltipSection(label: string, value: string): string {
  return `
  <div style="width: 100%; font-size: 18px; display: flex; justify-content: space-between;">
    <strong>${label}:</strong> <p>${value}</p>
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
      <div style="width: 340px; padding: 7px; font-size: 14px; display: flex; flex-direction: column; gap: 5px;">
        ${content}
      </div>
    `;
  };
}
