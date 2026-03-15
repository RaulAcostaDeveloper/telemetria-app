"use client";
import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import toast from "react-hot-toast";

import GeoModal, { GeoModalData } from "@/global/components/geoModal/geoModal";
import styles from "./fuelReportDataProvider.module.css";
// import { DataErrorHandler } from "@/global/components/DataErrorHandler/DataErrorHandler";
import { FuelBehaviorTab } from "@/modules/fuel/components/fuelBehaviorTab/fuelBehaviorTab";
import { FuelNowTab } from "../fuelNowTab/fuelNowTab";
import { FuelPerformanceMetrics } from "@/modules/fuel/components";
import { Insights, ListAlt, LocalGasStation } from "@mui/icons-material";
// import { RootState } from "@/global/redux/store";
// import { SERVICE_STATUS } from "@/global/redux/serviceSlices/types/serviceTypes";
import { TabsContent } from "@/global/components";
import { useLanguage } from "@/global/language/components/languageProvider/languageProvider";
import { FuelBehaviorHighChart } from "../FuelBehaviorHighChart/FuelBehaviorHighChart";
import { fuelDataValuesDataMock } from "@/global/dataMock/fuelData";
import { fuelPerformanceDataMock } from "@/global/dataMock/fuelPerformance";

export interface OBValue {
  startDate: string;
  endDate: string;
  speed: number;
}

interface Props {
  isFuelNowSyncronizing: boolean;
  setIsFuelNowSyncronizing: (toggle: boolean) => void;
}

export const FuelReportDataProvider = ({
  isFuelNowSyncronizing,
  setIsFuelNowSyncronizing,
}: Props) => {
  const LANGUAGE = useLanguage();

  // Operational Behavior (Estacionado, apagado, Avanzando, apagado y avanzando)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [geoModalData, setGeoModalData] = useState<GeoModalData>();
  const [opBEngineOff, setOpBEngineOff] = useState<OBValue[]>([]);
  /* const [opBEngineOffCoast, setOpBEngineOffCoast] = useState<OBValue[]>([]); */
  const [opBEngineOnIdle, setOpBEngineOnIdle] = useState<OBValue[]>([]);
  const [opBEngineOnMoving, setOpBEngineOnMoving] = useState<OBValue[]>([]);

  // const { fuelDataData, fuelDataStatus } = useSelector(
  //   (state: RootState) => state.fuelData,
  // );

  // const { fuelPerformanceData, fuelPerformanceStatus } = useSelector(
  //   (state: RootState) => state.fuelPerformance,
  // );

  const vehicleTabs = [
    { text: LANGUAGE.fuelVehicle.tabs.behavior, icon: Insights },
    { text: LANGUAGE.fuelVehicle.tabs.reports, icon: ListAlt },
    { text: LANGUAGE.fuelVehicle.tabs.fuelNow, icon: LocalGasStation },
  ];

  useEffect(() => {
    toast.success(
      isFuelNowSyncronizing
        ? LANGUAGE.fuelVehicle.fuelNow.startedSynch
        : LANGUAGE.fuelVehicle.fuelNow.stoppedSynch,
    );
  }, [isFuelNowSyncronizing, LANGUAGE]);

  useEffect(() => {
    const engineOff: OBValue[] = [];
    const engineOffCoasting: OBValue[] = [];
    const engineOnIdle: OBValue[] = [];
    const engineOnMoving: OBValue[] = [];

    const levelMessages = fuelDataValuesDataMock.levelMessages;
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
    /* setOpBEngineOffCoast(engineOffCoasting); */
    setOpBEngineOnIdle(engineOnIdle);
    setOpBEngineOnMoving(engineOnMoving);
  }, [fuelDataValuesDataMock]);

  return (
    <div className={styles.fuelReportDataProvider}>
      <TabsContent
        tabOptions={vehicleTabs}
        tabContents={[
          <div key={0}>
            {
              // fuelDataStatus === SERVICE_STATUS.succeeded &&
              //   fuelDataData?.value && (
              <>
                <FuelBehaviorTab LANGUAGE={LANGUAGE}>
                  <FuelBehaviorHighChart
                    LANGUAGE={LANGUAGE}
                    fuelDataData={fuelDataValuesDataMock}
                    opBEngineOff={opBEngineOff}
                    /* opBEngineOffCoasting={opBEngineOffCoasting} */
                    opBEngineOnIdle={opBEngineOnIdle}
                    opBEngineOnMoving={opBEngineOnMoving}
                  />
                </FuelBehaviorTab>
              </>
              // )
            }

            {/* <DataErrorHandler
              LANGUAGE={LANGUAGE}
              hasData={!!fuelDataData?.value}
              infoStatus={fuelDataStatus}
              statusCode={fuelDataData?.statusCode}
            /> */}
          </div>,
          <div key={1}>
            {
              // fuelPerformanceStatus === SERVICE_STATUS.succeeded &&
              //   fuelPerformanceData?.value && (
              <>
                <FuelPerformanceMetrics
                  LANGUAGE={LANGUAGE}
                  fuelPerformanceData={fuelPerformanceDataMock}
                />
              </>
              // )
            }

            {/* <DataErrorHandler
              LANGUAGE={LANGUAGE}
              hasData={!!fuelPerformanceData?.value}
              infoStatus={fuelPerformanceStatus}
              statusCode={fuelPerformanceData?.statusCode}
            /> */}
          </div>,
          <div key={2}>
            <FuelNowTab
              LANGUAGE={LANGUAGE}
              isFuelNowSyncronizing={isFuelNowSyncronizing}
              isModalOpen={isModalOpen}
              setGeoModalData={setGeoModalData}
              setIsFuelNowSyncronizing={setIsFuelNowSyncronizing}
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
