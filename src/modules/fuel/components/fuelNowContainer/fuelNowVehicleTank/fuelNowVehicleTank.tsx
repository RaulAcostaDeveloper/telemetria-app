import styles from "./fuelNowVehicleTank.module.css";
import { ErrorMessage } from "@/global/components/errorMessage/errorMessage";
import { GaugeGraphic } from "../../gaugeGraphic/gaugeGraphic";
import { LanguageInterface } from "@/global/language/constants/language.model";

interface Props {
  LANGUAGE: LanguageInterface;
  tankValues: number[] | undefined;
  title: string;
  averageTankSize: number;
}

export const FuelNowVehicleTank = ({
  tankValues,
  title,
  averageTankSize,
  LANGUAGE,
}: Props) => {
  return (
    <>
      {tankValues && averageTankSize > 1 ? (
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
      ) : (
        <ErrorMessage message={LANGUAGE.notifications.graphicError} />
      )}
    </>
  );
};
