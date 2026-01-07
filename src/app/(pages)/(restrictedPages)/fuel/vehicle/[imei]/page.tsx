import { FuelReportContainer } from "@/modules/fuel/components/fuelReportContainer/fuelReportContainer";

interface Page {
  params: {
    imei: string;
  };
}

export default function FuelVehicle({ params }: Page) {
  const { imei } = params; // imei del vehiculo

  return <FuelReportContainer imei={imei} />;
}
