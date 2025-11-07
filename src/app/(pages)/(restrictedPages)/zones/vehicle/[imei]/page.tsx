import { ZonesDataProvider } from "@/modules/zones/components/zonesDataProvider/zonesDataProvider";
interface Page {
  params: {
    imei: string;
  };
}

export default function ZonesVehicle({ params }: Page) {
  const { imei } = params; // imei del vehiculo
  return (
    <>
      <ZonesDataProvider imei={imei} />
    </>
  );
}
