import styles from "./obdAnalisisTab.module.css";
import { LanguageInterface } from "@/modules/global/language/constants/language.model";
import { MetricItem } from "@/modules/fuel/components/fuelPerformanceMetrics/metricItem/metricItem";
import { ObdTravelMetricsDataValues } from "@/globalConfig/redux/slices/obdTravelMetricsSlice";

interface Props {
  LANGUAGE: LanguageInterface;
  obdAnalyticsData: ObdTravelMetricsDataValues;
}

export const ObdAnalysisTab = ({ LANGUAGE, obdAnalyticsData }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.cuadricula}>
        <MetricItem
          LANGUAGE={LANGUAGE}
          metric=""
          name={LANGUAGE.onBoardDiagnosticsVehicle.analysisTab.plate}
          value={"vehicle.plate"} // pendiente
        />
        <MetricItem
          LANGUAGE={LANGUAGE}
          metric=""
          name={LANGUAGE.onBoardDiagnosticsVehicle.analysisTab.vehicle}
          value={"vehicle.name"} // pendiente
        />
        <MetricItem
          LANGUAGE={LANGUAGE}
          metric="km"
          name={LANGUAGE.onBoardDiagnosticsVehicle.analysisTab.km}
          value={"value.driverDistance"} // pendiente
        />
        <MetricItem
          LANGUAGE={LANGUAGE}
          metric=""
          name={LANGUAGE.onBoardDiagnosticsVehicle.analysisTab.averageRpm}
          value={obdAnalyticsData.rpmAverage?.toString() ?? "NA"}
          isLast
        />
      </div>
      <div className={styles.cuadricula}>
        <MetricItem
          LANGUAGE={LANGUAGE}
          metric="km"
          name={LANGUAGE.onBoardDiagnosticsVehicle.analysisTab.totalDistance}
          value={obdAnalyticsData.totalTimeTraveled?.toString() ?? "NA"}
        />
        <MetricItem
          LANGUAGE={LANGUAGE}
          metric="h"
          name={LANGUAGE.onBoardDiagnosticsVehicle.analysisTab.totalEngineHours}
          value={"value.totalEngineHours"} // pendiente
        />
        <MetricItem
          LANGUAGE={LANGUAGE}
          metric="km/h"
          name={LANGUAGE.onBoardDiagnosticsVehicle.analysisTab.allowedMaxSpeed}
          value={"value.allowedMaxSpeed"} // pendiente
        />
        <MetricItem
          LANGUAGE={LANGUAGE}
          metric="km/h"
          name={LANGUAGE.onBoardDiagnosticsVehicle.analysisTab.maxSpeed}
          value={"value.maxSpeed"} // pendiente
          isLast
        />
      </div>
    </div>
  );
};
