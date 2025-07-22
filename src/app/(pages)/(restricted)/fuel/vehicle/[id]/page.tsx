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
import { fetchVehicleByImei } from "@/globalConfig/redux/slices/vehicleByImeiSlice";
import { useAuth } from "@/modules/auth/utils";
import { useLanguage } from "@/modules/global/language/components/languageProvider/languageProvider";
// import { formatToLocalIso8601 } from "@/modules/global/utils/utils";

interface Page {
  params: {
    imei: string;
  };
}

export default function FuelVehicle({ params }: Page) {
  const { imei } = params; // imei del vehiculo
  console.log("Imei: ", imei);

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
          imei: "862524060822760", // imei.toString(),
          startDate: "2024-08-17T00:00:00", // formatToLocalIso8601(startDate), "2024-08-05T00:00:00"
          endDate: "2024-08-21T00:00:00", // formatToLocalIso8601(endDate), "2024-09-07T00:00:00"
        })
      );

      dispatch(
        fetchFuelPerformance({
          imei: "862524060822760", // imei.toString(),
          startDate: "2024-08-17T00:00:00", // formatToLocalIso8601(startDate), "2024-08-05T00:00:00"
          endDate: "2024-08-21T00:00:00", // formatToLocalIso8601(endDate), "2024-09-07T00:00:00"
        })
      );
    }
  }, [dispatch, isAuthenticated, startDate, endDate]);

  // Actualiza datos del vehiculo cuando el imei no es ND ni indefinido.
  useEffect(() => {
    if (isAuthenticated && imei && imei.length > 3) {
      dispatch(fetchVehicleByImei({ imei: imei }));
    }
  }, [dispatch, isAuthenticated, imei]);

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
