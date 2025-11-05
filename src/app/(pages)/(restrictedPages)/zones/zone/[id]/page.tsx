interface Page {
  params: {
    id: string;
  };
}

export default function TelemetryVehicle({ params }: Page) {
  const { id } = params; // imei del vehiculo

  return <>{id}</>;
}
