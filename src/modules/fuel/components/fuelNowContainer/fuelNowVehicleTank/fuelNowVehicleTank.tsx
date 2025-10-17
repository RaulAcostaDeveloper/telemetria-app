import { GaugeGraphic } from "../../gaugeGraphic/gaugeGraphic";
import styles from "./fuelNowVehicleTank.module.css";

interface Props {
  tankValues: number[] | undefined;
  title: string;
  averageTankSize: number;
}

export const FuelNowVehicleTank = ({
  tankValues,
  title,
  averageTankSize,
}: Props) => {
  return (
    <>
      <>
        {tankValues && 1 < averageTankSize && (
          <>
            {tankValues.map((value, index) => (
              <div key={index} className={styles.graphic}>
                <GaugeGraphic
                  value={value}
                  metric="L"
                  max={averageTankSize}
                  title={title + " " + (index + 1)}
                />
              </div>
            ))}
          </>
        )}
      </>
    </>
  );
};
