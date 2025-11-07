interface Page {
  params: {
    id: string;
  };
}

export default function ZonesVehicle({ params }: Page) {
  const { id } = params; // imei del vehiculo

  return <>{id}</>;
}
