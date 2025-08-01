import { FuelReportDataProvider } from "@/modules/fuel/components";

interface Page {
  params: {
    imei: string;
  };
}

export default function FuelVehicle({ params }: Page) {
  const { imei } = params; // imei del vehiculo

  return <FuelReportDataProvider imei={imei} />;
}
