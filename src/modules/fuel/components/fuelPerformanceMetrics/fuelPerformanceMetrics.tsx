import { DataShelf } from "@/global/components/dataShower/dataShelf";
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
  const data: DataShelf = {
    left: [
      {
        title: LANGUAGE.fuelVehicle.vehicleReports.distanceEfficiency,
        value:
          fuelPerformanceData.performanceByDistance.toLocaleString("en-US"),
        metric: "Km/L",
      },
      {
        title: LANGUAGE.fuelVehicle.vehicleReports.distanceTravelled,
        value: fuelPerformanceData.distanceTraveled?.toLocaleString("en-US"),
        metric: "Km",
      },
      {
        title: LANGUAGE.fuelVehicle.vehicleReports.fuelConsumed,
        value: fuelPerformanceData.fuelConsumed?.toLocaleString("en-US"),
        metric: "L",
      },
      {
        title: LANGUAGE.fuelVehicle.vehicleReports.maxSpeed,
        value: fuelPerformanceData.maxSpeed?.toLocaleString("en-US"),
        metric: "Km/h",
      },
    ],
    right: [
      {
        title: LANGUAGE.fuelVehicle.vehicleReports.fuelStart,
        value: fuelPerformanceData.initialFuel?.toLocaleString("en-US"),
        metric: "L",
      },
      {
        title: LANGUAGE.fuelVehicle.vehicleReports.fuelEnd,
        value: fuelPerformanceData.finalFuel?.toLocaleString("en-US"),
        metric: "L",
      },
      {
        title: LANGUAGE.fuelVehicle.vehicleReports.fuelLoaded,
        value: fuelPerformanceData.fuelCharged?.toLocaleString("en-US"),
        metric: "L",
      },
      {
        title: LANGUAGE.fuelVehicle.vehicleReports.fuelUnloaded,
        value: fuelPerformanceData.fuelDischarged.toLocaleString("en-US"),
        metric: "L",
      },
    ],
  };

  return <DataShelf LANGUAGE={LANGUAGE} data={data} />;
};
