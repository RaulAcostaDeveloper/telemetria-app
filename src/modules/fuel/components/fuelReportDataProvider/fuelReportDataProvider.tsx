"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// import { formatToLocalIso8601 } from "@/modules/global/utils/utils";
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
import { StatusNoInfoComponent } from "@/modules/global/components/statusNoInfoComponent/statusNoInfoComponent";

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

    const levelMessages = fuelDataData?.value?.levelMessages;
    if (!levelMessages) return;

    levelMessages.forEach((el, i) => {
      const nextDateGps = levelMessages[i + 1];
      const endDate = nextDateGps?.dateGps ?? el.dateServer; // fallback por si es el último

      if (el.ignition === false && el.speed === 0) {
        engineOff.push({
          startDate: el.dateGps,
          endDate,
          speed: el.speed,
        });
      } else if (el.ignition === false && el.speed >= 1) {
        engineOffCoasting.push({
          startDate: el.dateGps,
          endDate,
          speed: el.speed,
        });
      } else if (el.ignition === true && el.speed === 0) {
        engineOnIdle.push({
          startDate: el.dateGps,
          endDate,
          speed: el.speed,
        });
      } else if (el.ignition === true && el.speed >= 1) {
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
    { text: LANGUAGE.fuelVehicle.tabs.behavior },
    { text: LANGUAGE.fuelVehicle.tabs.reports },
    { text: LANGUAGE.fuelVehicle.tabs.fuelNow },
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
      dispatch(fetchVehicleByImei({ imei }));
    }
  }, [isAuthenticated, imei]);

  return (
    <div className={styles.fuelReportDataProvider}>
      <TabsContent
        tabOptions={vehicleTabs}
        tabContents={[
          <div key={0}>
            {fuelDataStatus === "succeeded" && fuelDataData?.value && (
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
            )}

            <StatusNoInfoComponent
              LANGUAGE={LANGUAGE}
              hasData={!!fuelDataData?.value}
              infoStatus={fuelDataStatus}
              messageIfEmpty={LANGUAGE.notifications.nullValue}
            />
          </div>,
          <div key={1}>
            {fuelPerformanceStatus === "succeeded" &&
              fuelPerformanceData?.value && (
                <>
                  <FuelPerformanceMetrics
                    LANGUAGE={LANGUAGE}
                    fuelPerformanceData={fuelPerformanceData.value}
                  />
                </>
              )}

            <StatusNoInfoComponent
              LANGUAGE={LANGUAGE}
              hasData={!!fuelPerformanceData?.value}
              infoStatus={fuelPerformanceStatus}
              messageIfEmpty={LANGUAGE.notifications.nullValue}
            />
          </div>,
          <div key={2}>
            {lastFuelReportStatus === "succeeded" &&
              lastFuelReportData?.value && (
                <>
                  <FuelNowContainer
                    LANGUAGE={LANGUAGE}
                    imei={imei}
                    lastFuelReportData={lastFuelReportData.value}
                  />
                </>
              )}

            <StatusNoInfoComponent
              LANGUAGE={LANGUAGE}
              hasData={!!lastFuelReportData?.value}
              infoStatus={lastFuelReportStatus}
              messageIfEmpty={LANGUAGE.notifications.nullValue}
            />
          </div>,
        ]}
      />
    </div>
  );
};
