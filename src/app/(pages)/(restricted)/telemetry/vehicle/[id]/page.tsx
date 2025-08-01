import { ObdReportDataProvider } from "@/modules/telemetryObd/components";

interface Page {
  params: {
    imei: string;
  };
}

export default function TelemetryVehicle({ params }: Page) {
  const { imei } = params; // imei del vehiculo

  return <ObdReportDataProvider imei={imei} />;
}
