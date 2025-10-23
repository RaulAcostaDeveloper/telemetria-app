import styles from "./obdAnalisisTab.module.css";
import { LanguageInterface } from "@/global/language/constants/language.model";
import { MetricItem } from "@/modules/fuel/components/fuelPerformanceMetrics/metricItem/metricItem";
import { ObdTravelMetricsDataValues } from "@/global/redux/serviceSlices/obdTravelMetricsSlice";
import { VehicleByImei } from "@/global/redux/serviceSlices/vehicleByImeiSlice";

interface Props {
  LANGUAGE: LanguageInterface;
  maxSpeed: number | string;
  obdAnalyticsData: ObdTravelMetricsDataValues;
  vehicleByImeiData: VehicleByImei;
}

export const ObdAnalysisTab = ({
  LANGUAGE,
  maxSpeed,
  obdAnalyticsData,
  vehicleByImeiData,
}: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.cuadricula}>
        <MetricItem
          LANGUAGE={LANGUAGE}
          metric=""
          name={LANGUAGE.onBoardDiagnosticsVehicle.analysisTab.plate}
          value={vehicleByImeiData.plate}
        />
        <MetricItem
          LANGUAGE={LANGUAGE}
          metric=""
          name={LANGUAGE.onBoardDiagnosticsVehicle.analysisTab.vehicle}
          value={vehicleByImeiData.name}
        />
        <MetricItem
          LANGUAGE={LANGUAGE}
          metric=""
          name={LANGUAGE.management.tableColumns.year}
          value={vehicleByImeiData.year}
        />
        <MetricItem
          LANGUAGE={LANGUAGE}
          metric=""
          name={LANGUAGE.onBoardDiagnosticsVehicle.analysisTab.totalEventNumber}
          value={obdAnalyticsData.timeTraveledDetails.length}
        />
        <MetricItem
          LANGUAGE={LANGUAGE}
          metric=""
          name={LANGUAGE.onBoardDiagnosticsVehicle.analysisTab.averageRpm}
          value={obdAnalyticsData.rpmAverage?.toString()}
        />
        <MetricItem
          LANGUAGE={LANGUAGE}
          metric="km/h"
          name={LANGUAGE.onBoardDiagnosticsVehicle.analysisTab.maxSpeed}
          value={maxSpeed}
          isLast
        />
      </div>
      <div className={styles.cuadricula}>
        <MetricItem
          LANGUAGE={LANGUAGE}
          metric="km"
          name={LANGUAGE.onBoardDiagnosticsVehicle.analysisTab.km}
          value={obdAnalyticsData.totalDistanceTraveled}
        />
        <MetricItem
          LANGUAGE={LANGUAGE}
          metric="h"
          name={
            LANGUAGE.onBoardDiagnosticsVehicle.analysisTab.totalTimeTraveled
          }
          value={obdAnalyticsData.totalTimeTraveled?.toString()}
        />
        <MetricItem
          LANGUAGE={LANGUAGE}
          metric="h"
          name={LANGUAGE.onBoardDiagnosticsVehicle.analysisTab.totalEngineHours}
          value={obdAnalyticsData.totalEngineTime}
        />
        <MetricItem
          LANGUAGE={LANGUAGE}
          metric="h"
          name={LANGUAGE.onBoardDiagnosticsVehicle.analysisTab.totalIdleTime}
          value={obdAnalyticsData.totalIdleTime}
        />
        <MetricItem
          LANGUAGE={LANGUAGE}
          metric="km/h"
          name={LANGUAGE.onBoardDiagnosticsVehicle.analysisTab.averageSpeed}
          value={obdAnalyticsData.averageSpeed}
        />
        <MetricItem
          LANGUAGE={LANGUAGE}
          metric="km/h"
          name={LANGUAGE.onBoardDiagnosticsVehicle.analysisTab.allowedMaxSpeed}
          value={obdAnalyticsData.maxSpeedAllowed}
          isLast
        />
      </div>
    </div>
  );
};
