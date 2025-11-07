import { ZonesDataProvider } from "@/modules/zones/components/zonesDataProvider/zonesDataProvider";

interface Page {
  params: {
    id: string;
  };
}

export default function ZonesVehicle({ params }: Page) {
  const { id } = params;

  return (
    <>
      <ZonesDataProvider id={id} />
    </>
  );
}
