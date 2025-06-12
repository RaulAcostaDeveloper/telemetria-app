import styles from "./fuelNowVehicleTank.module.css";
import { GaugeGraphic } from "@/modules/global/components";

interface Props {
  tankValues: number[];
  title: string;
}

export const FuelNowVehicleTank = ({ tankValues, title }: Props) => {
  return (
    <div className={styles.container}>
      {tankValues.map((value, index) => (
        <div key={index} className={styles.graphic}>
          <GaugeGraphic
            value={value}
            metric="L"
            max={70}
            title={title + " " + (index + 1)}
          />
        </div>
      ))}
    </div>
  );
};
