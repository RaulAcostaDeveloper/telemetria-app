export interface TooltipField<T = any> {
  label: string;
  value: (data: T) => string | number | undefined | null;
}

// Tooltips para diferentes series de datos
export function getChargesTooltipFields(LANGUAGE: any): TooltipField[] {
  return [
    { label: LANGUAGE.initialFuel, value: (c) => `${c.initialFuel} L` },
    { label: LANGUAGE.finalFuel, value: (c) => `${c.finalFuel} L` },
    { label: LANGUAGE.magnitude, value: (c) => `${c.magnitude} (V)` },
    { label: LANGUAGE.address, value: (c) => c.address },
    { label: LANGUAGE.lat, value: (c) => c.lat },
    { label: LANGUAGE.lon, value: (c) => c.lon },
    { label: LANGUAGE.odometer, value: (c) => `${c.odometer} L` },
    { label: LANGUAGE.speed, value: (c) => `${c.speed}  km/h` },
    { label: LANGUAGE.ignition, value: (c) => c.ignition },
    {
      label: LANGUAGE.deviceBattery,
      value: (c) => `${c.deviceBattery} (%)`,
    },
    { label: LANGUAGE.mainPower, value: (c) => `${c.mainPower} (V)` },
    { label: LANGUAGE.eventId, value: (c) => c.eventId },
  ];
}

export function getLabelsForChargeGeoMap(
  LANGUAGE: any,
  data: any
): TooltipField[] {
  return [
    { label: LANGUAGE.initialFuel, value: `${data.initialFuel} L` },
    { label: LANGUAGE.finalFuel, value: `${data.finalFuel} L` },
    { label: LANGUAGE.magnitude, value: `${data.magnitude} (V)` },
    { label: LANGUAGE.address, value: data.address },
    { label: LANGUAGE.lat, value: data.lat },
    { label: LANGUAGE.lon, value: data.lon },
    { label: LANGUAGE.odometer, value: `${data.odometer} L` },
    { label: LANGUAGE.speed, value: `${data.speed}  km/h` },
    { label: LANGUAGE.ignition, value: data.ignition },
    {
      label: LANGUAGE.deviceBattery,
      value: `${data.deviceBattery} (%)`,
    },
    { label: LANGUAGE.mainPower, value: `${data.mainPower} (V)` },
    { label: LANGUAGE.eventId, value: data.eventId },
  ];
}

// Constructor del tooltip
function buildTooltipSection(
  label: string,
  value: string | number | null | undefined
): string {
  return `
  <div style="width: 100%; font-size: 18px; display: flex; justify-content: space-between;">
    <strong>${label}:</strong> <p>${value}</p>
  </div>
  `;
}

export function createTooltipFormatter<T = any>(
  fields: TooltipField<T>[]
): (this: Highcharts.Point & { options: { custom: T } }) => string {
  return function (
    this: Highcharts.Point & { options: { custom: T } }
  ): string {
    const c = this.options.custom;

    const content = fields
      .map(({ label, value }) => buildTooltipSection(label, value(c)))
      .join("");

    return `
      <div style="width: 240px; padding: 7px; font-size: 14px; display: flex; flex-direction: column; gap: 5px;">
        ${content}
      </div>
    `;
  };
}
