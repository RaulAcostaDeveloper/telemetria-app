interface Page {
  params: {
    id: string;
  };
}

export default function FuelVehicle({ params }: Page) {
  const { id } = params;

  return (
    <div>
      <b>{id}</b>
    </div>
  );
}
