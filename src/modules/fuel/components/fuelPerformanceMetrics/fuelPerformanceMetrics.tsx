import { MetricItem } from "./metricItem/metricItem";
import styles from "./fuelPerformanceMetrics.module.css";
import { FuelPerformanceValues } from "@/global/redux/serviceSlices/fuelPerformanceSlice";
import { LanguageInterface } from "@/global/language/constants/language.model";

interface Props {
  LANGUAGE: LanguageInterface;
  fuelPerformanceData: FuelPerformanceValues;
}

export const FuelPerformanceMetrics = ({
  LANGUAGE,
  fuelPerformanceData,
}: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.cuadricula}>
        <MetricItem
          LANGUAGE={LANGUAGE}
          metric="Km/L"
          name={LANGUAGE.fuelVehicle.vehicleReports.distanceEfficiency}
          value={fuelPerformanceData.performanceByDistance.toLocaleString(
            "en-US"
          )}
        />
        <MetricItem
          LANGUAGE={LANGUAGE}
          metric="Km"
          name={LANGUAGE.fuelVehicle.vehicleReports.distanceTravelled}
          value={fuelPerformanceData.distanceTraveled?.toLocaleString("en-US")}
        />
        <MetricItem
          LANGUAGE={LANGUAGE}
          metric="L"
          name={LANGUAGE.fuelVehicle.vehicleReports.fuelConsumed}
          value={fuelPerformanceData.fuelConsumed?.toLocaleString("en-US")}
        />
        <MetricItem
          LANGUAGE={LANGUAGE}
          isLast
          metric="Km/h"
          name={LANGUAGE.fuelVehicle.vehicleReports.maxSpeed}
          value={fuelPerformanceData.maxSpeed?.toLocaleString("en-US")}
        />
      </div>
      <div className={styles.cuadricula}>
        <MetricItem
          LANGUAGE={LANGUAGE}
          metric="L"
          name={LANGUAGE.fuelVehicle.vehicleReports.fuelStart}
          value={fuelPerformanceData.initialFuel?.toLocaleString("en-US")}
        />
        <MetricItem
          LANGUAGE={LANGUAGE}
          metric="L"
          name={LANGUAGE.fuelVehicle.vehicleReports.fuelEnd}
          value={fuelPerformanceData.finalFuel?.toLocaleString("en-US")}
        />
        <MetricItem
          LANGUAGE={LANGUAGE}
          metric="L"
          name={LANGUAGE.fuelVehicle.vehicleReports.fuelLoaded}
          value={fuelPerformanceData.fuelCharged?.toLocaleString("en-US")}
        />
        <MetricItem
          LANGUAGE={LANGUAGE}
          metric="L"
          isLast
          name={LANGUAGE.fuelVehicle.vehicleReports.fuelUnloaded}
          value={fuelPerformanceData.fuelDischarged.toLocaleString("en-US")}
        />
      </div>
    </div>
  );
};
