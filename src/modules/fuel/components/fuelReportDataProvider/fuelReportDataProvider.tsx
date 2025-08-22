"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// import { formatToLocalIso8601 } from "@/modules/global/utils/utils";
import LoaderAnimation from "@/modules/global/components/loaderAnimation/loaderAnimation";
import styles from "./fuelReportDataProvider.module.css";
import {
  FuelNowContainer,
  FuelPerformanceMetrics,
} from "@/modules/fuel/components";
import { AppDispatch, RootState } from "@/globalConfig/redux/store";
import { FuelBehaviorTab } from "@/modules/fuel/components/fuelBehaviorTab/fuelBehaviorTab";
import { TabsContent } from "@/modules/global/components";
import { fetchFuelData } from "@/globalConfig/redux/slices/fuelDataSlice";
import { fetchFuelPerformance } from "@/globalConfig/redux/slices/fuelPerformanceSlice";
import { fetchLastFuelReport } from "@/globalConfig/redux/slices/lastFuelReportSlice";
import { fetchVehicleByImei } from "@/globalConfig/redux/slices/vehicleByImeiSlice";
import { useAuth } from "@/modules/auth/utils";
import { useLanguage } from "@/modules/global/language/components/languageProvider/languageProvider";

export interface OBValue {
  startDate: string;
  endDate: string;
  speed: number;
}

interface Props {
  imei: string;
}

export const FuelReportDataProvider = ({ imei }: Props) => {
  // Operational Behavior (Estacionado, apagado, Avanzando, apagado y avanzando)
  const [opBEngineOff, setOpBEngineOff] = useState<OBValue[]>([]);
  const [opBEngineOffCoast, setOpBEngineOffCoast] = useState<OBValue[]>([]);
  const [opBEngineOnIdle, setOpBEngineOnIdle] = useState<OBValue[]>([]);
  const [opBEngineOnMoving, setOpBEngineOnMoving] = useState<OBValue[]>([]);

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

  const { lastFuelReportData, lastFuelReportStatus } = useSelector(
    (state: RootState) => state.lastFuelReport
  );

  useEffect(() => {
    const engineOff: OBValue[] = [];
    const engineOffCoasting: OBValue[] = [];
    const engineOnIdle: OBValue[] = [];
    const engineOnMoving: OBValue[] = [];

    const levelMessages = fuelDataData?.value.levelMessages;
    if (!levelMessages) return;

    levelMessages.forEach((el, i) => {
      const nextDateGps = levelMessages[i + 1];
      const endDate = nextDateGps?.dateGps ?? el.dateServer; // fallback por si es el último

      if (el.ignition === 0 && el.speed === 0) {
        engineOff.push({
          startDate: el.dateGps,
          endDate,
          speed: el.speed,
        });
      } else if (el.ignition === 0 && el.speed >= 1) {
        engineOffCoasting.push({
          startDate: el.dateGps,
          endDate,
          speed: el.speed,
        });
      } else if (el.ignition === 1 && el.speed === 0) {
        engineOnIdle.push({
          startDate: el.dateGps,
          endDate,
          speed: el.speed,
        });
      } else if (el.ignition === 1 && el.speed >= 1) {
        engineOnMoving.push({
          startDate: el.dateGps,
          endDate,
          speed: el.speed,
        });
      }
    });

    setOpBEngineOff(engineOff);
    setOpBEngineOffCoast(engineOffCoasting);
    setOpBEngineOnIdle(engineOnIdle);
    setOpBEngineOnMoving(engineOnMoving);
  }, [fuelDataData]);

  const LANGUAGE = useLanguage();
  const vehicleTabs = [
    LANGUAGE.fuelVehicle.tabs.behavior,
    LANGUAGE.fuelVehicle.tabs.reports,
    LANGUAGE.fuelVehicle.tabs.fuelNow,
  ];

  useEffect(() => {
    if (isAuthenticated && startDate && endDate) {
      dispatch(
        fetchFuelData({
          imei: imei, // imei.toString(),
          startDate: "2024-08-17T00:00:00", // formatToLocalIso8601(startDate), "2024-08-05T00:00:00"
          endDate: "2024-08-21T00:00:00", // formatToLocalIso8601(endDate), "2024-09-07T00:00:00"
        })
      );

      dispatch(
        fetchFuelPerformance({
          imei: imei, // imei.toString(),
          startDate: "2024-08-17T00:00:00", // formatToLocalIso8601(startDate), "2024-08-05T00:00:00"
          endDate: "2024-08-21T00:00:00", // formatToLocalIso8601(endDate), "2024-09-07T00:00:00"
        })
      );

      dispatch(
        fetchLastFuelReport({
          imei: "862524060822760", // imei.toString(),
        })
      );
    }
  }, [dispatch, isAuthenticated, startDate, endDate, imei]);

  // Actualiza datos del vehiculo cuando el imei no es ND ni indefinido.
  useEffect(() => {
    if (isAuthenticated && imei && imei.length > 3) {
      dispatch(fetchVehicleByImei({ imei: imei }));
    }
  }, [dispatch, isAuthenticated, imei]);

  return (
    <div className={styles.fuelReportDataProvider}>
      <TabsContent
        tabOptions={vehicleTabs}
        tabContents={[
          <div key={0}>
            {fuelDataStatus === "succeeded" && fuelDataData ? (
              <>
                <FuelBehaviorTab
                  LANGUAGE={LANGUAGE}
                  fuelDataData={fuelDataData.value}
                  opBEngineOff={opBEngineOff}
                  opBEngineOffCoasting={opBEngineOffCoast}
                  opBEngineOnIdle={opBEngineOnIdle}
                  opBEngineOnMoving={opBEngineOnMoving}
                />
              </>
            ) : (
              <div>
                <LoaderAnimation />
              </div>
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
              <div>
                <LoaderAnimation />
              </div>
            )}
          </div>,
          <div key={2}>
            {lastFuelReportStatus === "succeeded" && lastFuelReportData ? (
              <>
                <FuelNowContainer
                  LANGUAGE={LANGUAGE}
                  imei={imei}
                  lastFuelReportData={lastFuelReportData.value}
                />
              </>
            ) : (
              <div>
                <LoaderAnimation />
              </div>
            )}
          </div>,
        ]}
      />
    </div>
  );
};
