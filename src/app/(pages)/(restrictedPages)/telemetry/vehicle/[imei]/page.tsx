import { ObdReportDataFetcher } from "@/modules/telemetryObd/components/obdReportDataFetcher/obdReportDataFetcher";
import { ObdReportDataProvider } from "@/modules/telemetryObd/components";

interface Page {
  params: {
    imei: string;
  };
}

export default function TelemetryVehicle({ params }: Page) {
  const { imei } = params; // imei del vehiculo

  return (
    <>
      <ObdReportDataFetcher imei={imei} />
      <ObdReportDataProvider />
    </>
  );
}
