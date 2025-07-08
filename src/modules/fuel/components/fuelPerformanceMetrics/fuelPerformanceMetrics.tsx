import { MetricItem } from "./metricItem/metricItem";
import styles from "./fuelPerformanceMetrics.module.css";
import { LanguageInterface } from "@/modules/global/language/constants/language.model";

const fuelPerformanceMetrics = {
  distanceEfficiency: 1820.7, // km/L
  distanceTravelled: 1500, // km
  timeEfficiency: 3.2, // L/h
  operatingHours: 17.5, // h
  fuelConsumed: 850, // L
  fuelStart: 150, // L
  fuelEnd: 100, // L
  fuelLoaded: 800, // L
};

interface Props {
  LANGUAGE: LanguageInterface;
}

export const FuelPerformanceMetrics = ({ LANGUAGE }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.cuadricula}>
        <MetricItem
          LANGUAGE={LANGUAGE}
          metric="Km/L"
          name={LANGUAGE.fuelVehicle.vehicleReports.distanceEfficiency}
          value={fuelPerformanceMetrics.distanceEfficiency.toLocaleString(
            "en-US"
          )}
        />
        <MetricItem
          LANGUAGE={LANGUAGE}
          metric="Km"
          name={LANGUAGE.fuelVehicle.vehicleReports.distanceTravelled}
          value={fuelPerformanceMetrics.distanceTravelled.toLocaleString(
            "en-US"
          )}
        />
        <MetricItem
          LANGUAGE={LANGUAGE}
          metric="L/H"
          name={LANGUAGE.fuelVehicle.vehicleReports.timeEfficiency}
          value={fuelPerformanceMetrics.timeEfficiency.toLocaleString("en-US")}
        />
        <MetricItem
          LANGUAGE={LANGUAGE}
          isLast
          metric="H"
          name={LANGUAGE.fuelVehicle.vehicleReports.operatingHours}
          value={fuelPerformanceMetrics.operatingHours.toLocaleString("en-US")}
        />
      </div>
      <div className={styles.cuadricula}>
        <MetricItem
          LANGUAGE={LANGUAGE}
          metric="L"
          name={LANGUAGE.fuelVehicle.vehicleReports.fuelConsumed}
          value={fuelPerformanceMetrics.fuelConsumed.toLocaleString("en-US")}
        />
        <MetricItem
          LANGUAGE={LANGUAGE}
          metric="L"
          name={LANGUAGE.fuelVehicle.vehicleReports.fuelStart}
          value={fuelPerformanceMetrics.fuelStart.toLocaleString("en-US")}
        />
        <MetricItem
          LANGUAGE={LANGUAGE}
          metric="L"
          name={LANGUAGE.fuelVehicle.vehicleReports.fuelEnd}
          value={fuelPerformanceMetrics.fuelEnd.toLocaleString("en-US")}
        />
        <MetricItem
          LANGUAGE={LANGUAGE}
          isLast
          metric="L"
          name={LANGUAGE.fuelVehicle.vehicleReports.fuelLoaded}
          value={fuelPerformanceMetrics.fuelLoaded.toLocaleString("en-US")}
        />
      </div>
    </div>
  );
};
