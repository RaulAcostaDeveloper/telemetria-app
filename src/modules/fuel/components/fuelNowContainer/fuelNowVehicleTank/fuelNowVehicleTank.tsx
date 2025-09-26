import LoaderAnimation from "@/global/components/loaderAnimation/loaderAnimation";
import styles from "./fuelNowVehicleTank.module.css";
import { GaugeGraphic } from "@/global/components";

interface Props {
  tankValues: number[] | undefined;
  title: string;
}

export const FuelNowVehicleTank = ({ tankValues, title }: Props) => {
  return (
    <>
      <>
        {tankValues ? (
          <>
            {tankValues.map((value, index) => (
              <div key={index} className={styles.graphic}>
                <GaugeGraphic
                  value={value}
                  metric="L"
                  max={45}
                  title={title + " " + (index + 1)}
                />
              </div>
            ))}
          </>
        ) : (
          <div>
            <LoaderAnimation />
          </div>
        )}
      </>
    </>
  );
};
