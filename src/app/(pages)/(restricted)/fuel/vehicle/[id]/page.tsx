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
import { fetchFuelMetrics } from "@/globalConfig/redux/slices/fuelMetricsSlice";
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

  const { fuelMetricsData, fuelMetricsStatus } = useSelector(
    (state: RootState) => state.fuelMetrics
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
        fetchFuelMetrics({
          imei: "863457051709333", // id.toString(),
          startDate: "2024-08-05T00:00:00", // formatToLocalIso8601(startDate), "2024-08-05T00:00:00"
          endDate: "2024-09-07T00:00:00", // formatToLocalIso8601(endDate), "2024-09-07T00:00:00"
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
            {fuelMetricsStatus === "succeeded" && fuelMetricsData ? (
              <>
                <FuelBehaviorTab
                  LANGUAGE={LANGUAGE}
                  fuelMetricsData={fuelMetricsData.value}
                />
              </>
            ) : (
              // Añadir un loading
              <div>...</div>
            )}
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
