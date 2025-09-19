"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import GeoModal, {
  GeoModalData,
} from "@/modules/global/components/geoModal/geoModal";
import styles from "./fuelReportDataProvider.module.css";
import {
  FuelNowContainer,
  FuelPerformanceMetrics,
} from "@/modules/fuel/components";
import { DataErrorHandler } from "@/modules/global/components/DataErrorHandler/DataErrorHandler";
import { FuelBehaviorTab } from "@/modules/fuel/components/fuelBehaviorTab/fuelBehaviorTab";
import { RootState } from "@/globalConfig/redux/store";
import { SERVICE_STATUS } from "@/globalConfig/redux/types/serviceTypes";
import { TabsContent } from "@/modules/global/components";
import { useLanguage } from "@/modules/global/language/components/languageProvider/languageProvider";

export interface OBValue {
  startDate: string;
  endDate: string;
  speed: number;
}

export const FuelReportDataProvider = () => {
  const LANGUAGE = useLanguage();

  // Operational Behavior (Estacionado, apagado, Avanzando, apagado y avanzando)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [geoModalData, setGeoModalData] = useState<GeoModalData>();
  const [opBEngineOff, setOpBEngineOff] = useState<OBValue[]>([]);
  const [opBEngineOffCoast, setOpBEngineOffCoast] = useState<OBValue[]>([]);
  const [opBEngineOnIdle, setOpBEngineOnIdle] = useState<OBValue[]>([]);
  const [opBEngineOnMoving, setOpBEngineOnMoving] = useState<OBValue[]>([]);

  const { fuelDataData, fuelDataStatus } = useSelector(
    (state: RootState) => state.fuelData
  );

  const { fuelPerformanceData, fuelPerformanceStatus } = useSelector(
    (state: RootState) => state.fuelPerformance
  );

  const { lastFuelReportData, lastFuelReportStatus } = useSelector(
    (state: RootState) => state.lastFuelReport
  );

  const vehicleTabs = [
    { text: LANGUAGE.fuelVehicle.tabs.behavior },
    { text: LANGUAGE.fuelVehicle.tabs.reports },
    { text: LANGUAGE.fuelVehicle.tabs.fuelNow },
  ];

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

  useEffect(() => {
    if (lastFuelReportData?.value) {
      setGeoModalData({
        lat: parseFloat(lastFuelReportData?.value.lat.toString()),
        lon: parseFloat(lastFuelReportData?.value.lon.toString()),
        title: LANGUAGE.geoModalTitles.fuelNowTitle,
        rows: [],
      });
    }
  }, [lastFuelReportData, LANGUAGE]);

  return (
    <div className={styles.fuelReportDataProvider}>
      <TabsContent
        tabOptions={vehicleTabs}
        tabContents={[
          <div key={0}>
            {fuelDataStatus === SERVICE_STATUS.succeeded &&
              fuelDataData?.value && (
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

            <DataErrorHandler
              LANGUAGE={LANGUAGE}
              hasData={!!fuelDataData?.value}
              infoStatus={fuelDataStatus}
            />
          </div>,
          <div key={1}>
            {fuelPerformanceStatus === SERVICE_STATUS.succeeded &&
              fuelPerformanceData?.value && (
                <>
                  <FuelPerformanceMetrics
                    LANGUAGE={LANGUAGE}
                    fuelPerformanceData={fuelPerformanceData.value}
                  />
                </>
              )}

            <DataErrorHandler
              LANGUAGE={LANGUAGE}
              hasData={!!fuelPerformanceData?.value}
              infoStatus={fuelPerformanceStatus}
            />
          </div>,
          <div key={2}>
            {lastFuelReportStatus === SERVICE_STATUS.succeeded &&
              lastFuelReportData?.value && (
                <>
                  <FuelNowContainer
                    LANGUAGE={LANGUAGE}
                    isModalOpen={isModalOpen}
                    lastFuelReportData={lastFuelReportData.value}
                    setIsModalOpen={setIsModalOpen}
                  />
                </>
              )}

            <DataErrorHandler
              LANGUAGE={LANGUAGE}
              hasData={!!lastFuelReportData?.value}
              infoStatus={lastFuelReportStatus}
            />
          </div>,
        ]}
      />
      {isModalOpen && geoModalData && (
        <GeoModal
          LANGUAGE={LANGUAGE}
          closeModal={() => setIsModalOpen(false)}
          geoModalData={geoModalData}
          height={600}
          width={600}
        />
      )}
    </div>
  );
};
