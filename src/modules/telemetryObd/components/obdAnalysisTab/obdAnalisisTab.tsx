import styles from "./obdAnalisisTab.module.css";
import { LanguageInterface } from "@/modules/global/language/constants/language.model";
import { MetricItem } from "@/modules/fuel/components/fuelPerformanceMetrics/metricItem/metricItem";
import { ObdAnalyticsData } from "@/modules/global/dataMock/obdAnalysis/obdAnalysis";

interface Props {
  LANGUAGE: LanguageInterface;
  obdAnalyticsData: ObdAnalyticsData;
}

export const ObdAnalysisTab = ({ LANGUAGE, obdAnalyticsData }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.cuadricula}>
        <MetricItem
          LANGUAGE={LANGUAGE}
          metric=""
          name={LANGUAGE.onBoardDiagnosticsVehicle.analysisTab.plate}
          value={obdAnalyticsData.plate}
        />
        <MetricItem
          LANGUAGE={LANGUAGE}
          metric=""
          name={LANGUAGE.onBoardDiagnosticsVehicle.analysisTab.vehicle}
          value={obdAnalyticsData.vehicle}
        />
        <MetricItem
          LANGUAGE={LANGUAGE}
          metric="Km"
          name={LANGUAGE.onBoardDiagnosticsVehicle.analysisTab.km}
          value={obdAnalyticsData.km}
        />
        <MetricItem
          LANGUAGE={LANGUAGE}
          metric="H"
          name={LANGUAGE.onBoardDiagnosticsVehicle.analysisTab.workingShift}
          value={obdAnalyticsData.workingShift}
        />
        <MetricItem
          LANGUAGE={LANGUAGE}
          metric=""
          name={LANGUAGE.onBoardDiagnosticsVehicle.analysisTab.fuelType}
          value={obdAnalyticsData.fuelType}
        />
        <MetricItem
          LANGUAGE={LANGUAGE}
          metric="L"
          name={LANGUAGE.onBoardDiagnosticsVehicle.analysisTab.fuelConsumed}
          value={obdAnalyticsData.fuelConsumed}
          isLast
        />
      </div>
      <div className={styles.cuadricula}>
        <MetricItem
          LANGUAGE={LANGUAGE}
          metric="Km/L"
          name={
            LANGUAGE.onBoardDiagnosticsVehicle.analysisTab.averageConsumption
          }
          value={obdAnalyticsData.averageConsumption}
        />
        <MetricItem
          LANGUAGE={LANGUAGE}
          metric="L/H"
          name={LANGUAGE.onBoardDiagnosticsVehicle.analysisTab.litersPerHour}
          value={obdAnalyticsData.litersPerHour}
        />
        <MetricItem
          LANGUAGE={LANGUAGE}
          metric="Km"
          name={LANGUAGE.onBoardDiagnosticsVehicle.analysisTab.totalDistance}
          value={obdAnalyticsData.totalDistance}
        />
        <MetricItem
          LANGUAGE={LANGUAGE}
          metric="H"
          name={LANGUAGE.onBoardDiagnosticsVehicle.analysisTab.totalEngineHours}
          value={obdAnalyticsData.totalEngineHours}
        />
        <MetricItem
          LANGUAGE={LANGUAGE}
          metric="L"
          name={
            LANGUAGE.onBoardDiagnosticsVehicle.analysisTab.totalFuelConsumed
          }
          value={obdAnalyticsData.totalFuelConsumed}
        />
      </div>
    </div>
  );
};
