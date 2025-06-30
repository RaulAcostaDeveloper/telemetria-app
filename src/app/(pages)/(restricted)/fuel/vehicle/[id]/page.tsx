"use client";
import {
  FuelNowContainer,
  FuelPerformanceMetrics,
} from "@/modules/fuel/components";
import { FuelHighChart } from "@/modules/fuel/components/fuelHighChart/fuelHighChart";
import { TabsContent } from "@/modules/global/components";
import { useLanguage } from "@/modules/global/language/components/languageProvider/languageProvider";

interface Page {
  params: {
    id: string;
  };
}

export default function FuelVehicle({ params }: Page) {
  const { id } = params; // id es el imei del dispositivo
  console.log("Imei: ", id);

  const LANGUAGE = useLanguage();
  const vehicleTabs = [
    LANGUAGE.fuelVehicle.tabs.behavior,
    LANGUAGE.fuelVehicle.tabs.reports,
    LANGUAGE.fuelVehicle.tabs.fuelNow,
    // LANGUAGE.fuelVehicle.tabs.charges,
    // LANGUAGE.fuelVehicle.tabs.discharges,
  ];
  return (
    <div>
      <TabsContent
        tabOptions={vehicleTabs}
        tabContents={[
          <div key={0}>
            <FuelHighChart LANGUAGE={LANGUAGE} />
          </div>,
          <div key={1}>
            <FuelPerformanceMetrics LANGUAGE={LANGUAGE} />
          </div>,
          <div key={2}>
            <FuelNowContainer LANGUAGE={LANGUAGE} />
          </div>,
        ]}
      />
    </div>
  );
}
