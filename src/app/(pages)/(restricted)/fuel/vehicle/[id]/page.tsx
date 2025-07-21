"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  FuelNowContainer,
  FuelPerformanceMetrics,
} from "@/modules/fuel/components";
import { AppDispatch, RootState } from "@/globalConfig/redux/store";
import { FuelBehaviorTab } from "@/modules/fuel/components/fuelBehaviorTab/fuelBehaviorTab";
import { TabsContent } from "@/modules/global/components";
import { fetchFuelData } from "@/globalConfig/redux/slices/fuelDataSlice";
import { fetchFuelPerformance } from "@/globalConfig/redux/slices/fuelPerformanceSlice";
import { useAuth } from "@/modules/auth/utils";
import { useLanguage } from "@/modules/global/language/components/languageProvider/languageProvider";
// import { formatToLocalIso8601 } from "@/modules/global/utils/utils";

interface Page {
  params: {
    id: string;
  };
}

export default function FuelVehicle({ params }: Page) {
  const { id } = params; // id es el imei del dispositivo
  console.log("Imei: ", id);

  const { isAuthenticated } = useAuth();

  const dispatch = useDispatch<AppDispatch>();

  const { startDate, endDate } = useSelector(
    (state: RootState) => state.calendar
  );

  const { fuelDataData, fuelDataStatus } = useSelector(
    (state: RootState) => state.fuelData
  );

  const { fuelPerformanceData, fuelPerformanceStatus } = useSelector(
    (state: RootState) => state.fuelPerformance
  );

  const LANGUAGE = useLanguage();
  const vehicleTabs = [
    LANGUAGE.fuelVehicle.tabs.behavior,
    LANGUAGE.fuelVehicle.tabs.reports,
    LANGUAGE.fuelVehicle.tabs.fuelNow,
    // LANGUAGE.fuelVehicle.tabs.charges,
    // LANGUAGE.fuelVehicle.tabs.discharges,
  ];

  useEffect(() => {
    if (isAuthenticated && startDate && endDate) {
      dispatch(
        fetchFuelData({
          imei: "862524060822760", // id.toString(),
          startDate: "2024-08-17T00:00:00", // formatToLocalIso8601(startDate), "2024-08-05T00:00:00"
          endDate: "2024-08-21T00:00:00", // formatToLocalIso8601(endDate), "2024-09-07T00:00:00"
        })
      );

      dispatch(
        fetchFuelPerformance({
          imei: "862524060822760", // id.toString(),
          startDate: "2024-08-17T00:00:00", // formatToLocalIso8601(startDate), "2024-08-05T00:00:00"
          endDate: "2024-08-21T00:00:00", // formatToLocalIso8601(endDate), "2024-09-07T00:00:00"
        })
      );
    }
  }, [dispatch, isAuthenticated, startDate, endDate]);

  return (
    <div>
      <TabsContent
        tabOptions={vehicleTabs}
        tabContents={[
          <div key={0}>
            {fuelDataStatus === "succeeded" && fuelDataData ? (
              <>
                <FuelBehaviorTab
                  LANGUAGE={LANGUAGE}
                  fuelDataData={fuelDataData.value}
                />
              </>
            ) : (
              // Añadir un loading
              <div>...</div>
            )}
          </div>,
          <div key={1}>
            {fuelPerformanceStatus === "succeeded" && fuelPerformanceData ? (
              <>
                <FuelPerformanceMetrics
                  LANGUAGE={LANGUAGE}
                  fuelPerformanceData={fuelPerformanceData.value}
                />
              </>
            ) : (
              // Añadir un loading
              <div>...</div>
            )}
          </div>,
          <div key={2}>
            <FuelNowContainer LANGUAGE={LANGUAGE} />
          </div>,
        ]}
      />
    </div>
  );
}
