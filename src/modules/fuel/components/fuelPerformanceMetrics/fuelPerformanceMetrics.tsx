import { MetricItem } from "./metricItem/metricItem";
import styles from "./fuelPerformanceMetrics.module.css";
import { LanguageInterface } from "@/modules/global/language/constants/language.model";

const temporalDataMock = {
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
          value={temporalDataMock.distanceEfficiency.toLocaleString("en-US")}
        />
        <MetricItem
          LANGUAGE={LANGUAGE}
          metric="Km"
          name={LANGUAGE.fuelVehicle.vehicleReports.distanceTravelled}
          value={temporalDataMock.distanceTravelled.toLocaleString("en-US")}
        />
        <MetricItem
          LANGUAGE={LANGUAGE}
          metric="L/H"
          name={LANGUAGE.fuelVehicle.vehicleReports.timeEfficiency}
          value={temporalDataMock.timeEfficiency.toLocaleString("en-US")}
        />
        <MetricItem
          LANGUAGE={LANGUAGE}
          isLast
          metric="H"
          name={LANGUAGE.fuelVehicle.vehicleReports.operatingHours}
          value={temporalDataMock.operatingHours.toLocaleString("en-US")}
        />
      </div>
      <div className={styles.cuadricula}>
        <MetricItem
          LANGUAGE={LANGUAGE}
          metric="L"
          name={LANGUAGE.fuelVehicle.vehicleReports.fuelConsumed}
          value={temporalDataMock.fuelConsumed.toLocaleString("en-US")}
        />
        <MetricItem
          LANGUAGE={LANGUAGE}
          metric="L"
          name={LANGUAGE.fuelVehicle.vehicleReports.fuelStart}
          value={temporalDataMock.fuelStart.toLocaleString("en-US")}
        />
        <MetricItem
          LANGUAGE={LANGUAGE}
          metric="L"
          name={LANGUAGE.fuelVehicle.vehicleReports.fuelEnd}
          value={temporalDataMock.fuelEnd.toLocaleString("en-US")}
        />
        <MetricItem
          LANGUAGE={LANGUAGE}
          isLast
          metric="L"
          name={LANGUAGE.fuelVehicle.vehicleReports.fuelLoaded}
          value={temporalDataMock.fuelLoaded.toLocaleString("en-US")}
        />
      </div>
    </div>
  );
};
