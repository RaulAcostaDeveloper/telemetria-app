export interface TooltipField<T = any> {
  label: string;
  getValue: (data: T) => string | number | undefined | null;
}

// Tooltips para diferentes series de datos
export function getChargesTooltipFields(LANGUAGE: any): TooltipField[] {
  return [
    { label: LANGUAGE.eventId, getValue: (c) => `${c.eventId} km` },
    { label: LANGUAGE.address, getValue: (c) => c.address },
    { label: LANGUAGE.lat, getValue: (c) => c.lat },
    { label: LANGUAGE.lon, getValue: (c) => `${c.lon} km/h` },
    { label: LANGUAGE.odometer, getValue: (c) => c.odometer },
    { label: LANGUAGE.speed, getValue: (c) => c.speed },
    { label: LANGUAGE.ignition, getValue: (c) => c.ignition },
    { label: LANGUAGE.deviceBattery, getValue: (c) => c.deviceBattery },
    { label: LANGUAGE.mainPower, getValue: (c) => c.mainPower },
    { label: LANGUAGE.magnitude, getValue: (c) => c.magnitude },
    { label: LANGUAGE.initialFuel, getValue: (c) => c.initialFuel },
    { label: LANGUAGE.finalFuel, getValue: (c) => c.finalFuel },
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
      .map(({ label, getValue }) => buildTooltipSection(label, getValue(c)))
      .join("");

    return `
      <div style="width: 240px; padding: 7px; font-size: 14px; display: flex; flex-direction: column; gap: 5px;">
        ${content}
      </div>
    `;
  };
}
