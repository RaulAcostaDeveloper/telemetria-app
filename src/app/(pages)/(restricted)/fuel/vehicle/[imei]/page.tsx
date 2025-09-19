import { FuelReportDataFetcher } from "@/modules/fuel/components/fuelReportDataFetcher/fuelReportDataFetcher";
import { FuelReportDataProvider } from "@/modules/fuel/components";

interface Page {
  params: {
    imei: string;
  };
}

export default function FuelVehicle({ params }: Page) {
  const { imei } = params; // imei del vehiculo

  return (
    <>
      <FuelReportDataFetcher imei={imei} />
      <FuelReportDataProvider />
    </>
  );
}
