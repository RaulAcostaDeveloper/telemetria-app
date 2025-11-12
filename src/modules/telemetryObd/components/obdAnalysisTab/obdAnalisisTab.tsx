import { DataShower } from "@/global/components/dataShower/datasShower";
import { LanguageInterface } from "@/global/language/constants/language.model";
import { ObdTravelMetricsDataValues } from "@/global/redux/serviceSlices/obdTravelMetricsSlice";
import { VehicleByImei } from "@/global/redux/serviceSlices/vehicleByImeiSlice";

interface Props {
  LANGUAGE: LanguageInterface;
  obdAnalyticsData: ObdTravelMetricsDataValues;
  vehicleByImeiData: VehicleByImei;
}

export const ObdAnalysisTab = ({
  LANGUAGE,
  obdAnalyticsData,
  vehicleByImeiData,
}: Props) => {
  const data: DataShower = {
    left: [
      {
        title: LANGUAGE.onBoardDiagnosticsVehicle.analysisTab.plate,
        value: vehicleByImeiData.plate,
      },
      {
        title: LANGUAGE.onBoardDiagnosticsVehicle.analysisTab.vehicle,
        value: vehicleByImeiData.name,
      },
      {
        title: LANGUAGE.management.tableColumns.year,
        value: vehicleByImeiData.year,
      },
      {
        title: LANGUAGE.onBoardDiagnosticsVehicle.analysisTab.totalEventNumber,
        value: obdAnalyticsData.timeTraveledDetails.length,
      },
      {
        title: LANGUAGE.onBoardDiagnosticsVehicle.analysisTab.averageRpm,
        value: obdAnalyticsData.rpmAverage,
      },
      {
        title: LANGUAGE.onBoardDiagnosticsVehicle.analysisTab.maxSpeed,
        value: obdAnalyticsData.maxSpeed,
        metric: "km/h",
      },
    ],
    right: [
      {
        title: LANGUAGE.onBoardDiagnosticsVehicle.analysisTab.km,
        value: obdAnalyticsData.totalDistanceTraveled,
        metric: "km",
      },
      {
        title: LANGUAGE.onBoardDiagnosticsVehicle.analysisTab.totalTimeTraveled,
        value: obdAnalyticsData.totalTimeTraveled,
        metric: "h",
      },
      {
        title: LANGUAGE.onBoardDiagnosticsVehicle.analysisTab.totalEngineHours,
        value: obdAnalyticsData.totalEngineTime,
        metric: "h",
      },
      {
        title: LANGUAGE.onBoardDiagnosticsVehicle.analysisTab.totalIdleTime,
        value: obdAnalyticsData.totalIdleTime,
        metric: "h",
      },
      {
        title: LANGUAGE.onBoardDiagnosticsVehicle.analysisTab.averageSpeed,
        value: obdAnalyticsData.averageSpeed,
        metric: "km/h",
      },
      {
        title: LANGUAGE.onBoardDiagnosticsVehicle.analysisTab.allowedMaxSpeed,
        value: obdAnalyticsData.maxSpeedAllowed,
        metric: "km/h",
      },
    ],
  };

  return <DataShower LANGUAGE={LANGUAGE} data={data} />;
};
