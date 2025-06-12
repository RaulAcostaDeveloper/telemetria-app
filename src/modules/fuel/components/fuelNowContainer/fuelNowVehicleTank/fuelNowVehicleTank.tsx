interface Props {
  numberOfTanks: number;
}

export const FuelNowVehicleTank = ({ numberOfTanks }: Props) => {
  return <div>tanks: {numberOfTanks}</div>;
};
