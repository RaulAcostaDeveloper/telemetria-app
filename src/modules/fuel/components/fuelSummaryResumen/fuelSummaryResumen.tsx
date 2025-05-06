import styles from "./fuelSummaryResumen.module.css";

interface Props {
  unitsAnalyzed: number;
  inventory: number;
  performanceOdometer: number;
  performanceHorometer: number;
  fuelCharged: number;
  fuelDischarged: number;
}

export const FuelSummaryResumen = ({
  unitsAnalyzed,
  inventory,
  performanceOdometer,
  performanceHorometer,
  fuelCharged,
  fuelDischarged,
}: Props) => {
  return (
    <div className={styles.fuelSummaryResumen}>
      <b>Fuel Summary - Data cargada</b>
      <p>unitsAnalyzed: {unitsAnalyzed}</p>
      <p>inventory: {inventory}</p>
      <p>performanceOdometer: {performanceOdometer}</p>
      <p>performanceHorometer: {performanceHorometer}</p>
      <p>fuelCharged: {fuelCharged}</p>
      <p>fuelDischarged: {fuelDischarged}</p>
    </div>
  );
};
