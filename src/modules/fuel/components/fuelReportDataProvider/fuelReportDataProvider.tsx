"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import GeoModal, { GeoModalData } from "@/global/components/geoModal/geoModal";
import styles from "./fuelReportDataProvider.module.css";
import { DataErrorHandler } from "@/global/components/DataErrorHandler/DataErrorHandler";
import { FuelBehaviorTab } from "@/modules/fuel/components/fuelBehaviorTab/fuelBehaviorTab";
import { FuelDataData } from "@/global/redux/serviceSlices/fuelDataSlice";
import { FuelNowTab } from "../fuelNowTab/fuelNowTab";
import { FuelPerformanceMetrics } from "@/modules/fuel/components";
import { Insights, ListAlt, LocalGasStation } from "@mui/icons-material";
import { RootState } from "@/global/redux/store";
import { SERVICE_STATUS } from "@/global/redux/serviceSlices/types/serviceTypes";
import { TabsContent } from "@/global/components";
import { toLocalDateTime } from "@/global/utils/utils";
import { useLanguage } from "@/global/language/components/languageProvider/languageProvider";

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
  const [fuelDataDataFormated, setFuelDataDataFormated] =
    useState<FuelDataData>();

  const { fuelDataData, fuelDataStatus } = useSelector(
    (state: RootState) => state.fuelData
  );

  const { fuelPerformanceData, fuelPerformanceStatus } = useSelector(
    (state: RootState) => state.fuelPerformance
  );

  const vehicleTabs = [
    { text: LANGUAGE.fuelVehicle.tabs.behavior, icon: Insights },
    { text: LANGUAGE.fuelVehicle.tabs.reports, icon: ListAlt },
    { text: LANGUAGE.fuelVehicle.tabs.fuelNow, icon: LocalGasStation },
  ];

  useEffect(() => {
    if (fuelDataData?.value) {
      const levelMessages = fuelDataData.value.levelMessages.map(
        (messages) => ({
          ...messages,
          dateGps: toLocalDateTime(messages.dateGps),
          dateServer: toLocalDateTime(messages.dateServer),
          dateAvl: toLocalDateTime(messages.dateAvl),
        })
      );

      const charges = fuelDataData.value.charges.map((charges) => ({
        ...charges,
        dateGps: toLocalDateTime(charges.dateGps),
        endDate: toLocalDateTime(charges.endDate),
        startDate: toLocalDateTime(charges.startDate),
      }));

      const discharges = fuelDataData.value.discharges.map((discharges) => ({
        ...discharges,
        dateGps: toLocalDateTime(discharges.dateGps),
        endDate: toLocalDateTime(discharges.endDate),
        startDate: toLocalDateTime(discharges.startDate),
      }));

      const dailyPerformances = fuelDataData.value.dailyPerformances.map(
        (dailyPerformances) => ({
          ...dailyPerformances,
          updateAt: toLocalDateTime(dailyPerformances.updateAt),
          endDate: toLocalDateTime(dailyPerformances.endDate),
          startDate: toLocalDateTime(dailyPerformances.startDate),
        })
      );

      const performancesBetweenCharges =
        fuelDataData.value.performancesBetweenCharges.map(
          (performancesBetweenCharges) => ({
            ...performancesBetweenCharges,
            endDatePerformance: toLocalDateTime(
              performancesBetweenCharges.endDatePerformance
            ),
            startDatePerformance: toLocalDateTime(
              performancesBetweenCharges.startDatePerformance
            ),
          })
        );

      const dataFormated = {
        ...fuelDataData,
        value: {
          ...fuelDataData.value,
          levelMessages,
          charges,
          discharges,
          dailyPerformances,
          performancesBetweenCharges,
        },
      };

      setFuelDataDataFormated(dataFormated);
    }
  }, [fuelDataData]);

  useEffect(() => {
    const engineOff: OBValue[] = [];
    const engineOffCoasting: OBValue[] = [];
    const engineOnIdle: OBValue[] = [];
    const engineOnMoving: OBValue[] = [];

    const levelMessages = fuelDataDataFormated?.value?.levelMessages;
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
  }, [fuelDataDataFormated]);

  return (
    <div className={styles.fuelReportDataProvider}>
      <TabsContent
        tabOptions={vehicleTabs}
        tabContents={[
          <div key={0}>
            {fuelDataStatus === SERVICE_STATUS.succeeded &&
              fuelDataDataFormated?.value && (
                <>
                  <FuelBehaviorTab
                    LANGUAGE={LANGUAGE}
                    fuelDataData={fuelDataDataFormated.value}
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
            <FuelNowTab
              LANGUAGE={LANGUAGE}
              isModalOpen={isModalOpen}
              setGeoModalData={setGeoModalData}
              setIsModalOpen={setIsModalOpen}
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
