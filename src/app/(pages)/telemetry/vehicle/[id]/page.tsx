interface Page {
  params: {
    id: string;
  };
}

export default function TelemetryVehicle({ params }: Page) {
  const { id } = params;

  return (
    <div>
      <b>{id}</b>
    </div>
  );
}
