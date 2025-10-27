import { useState } from "react";
import styles from "./fuelBehaviorTab.module.css";

import GeoModal, { GeoModalData } from "@/global/components/geoModal/geoModal";
import { FuelBehaviorHighChart } from "../FuelBehaviorHighChart/FuelBehaviorHighChart";
import { FuelDataValues } from "@/global/redux/serviceSlices/fuelDataSlice";
import { LanguageInterface } from "@/global/language/constants/language.model";
import { OBValue } from "../fuelReportDataProvider/fuelReportDataProvider";
import { ToggleButton } from "../FuelBehaviorHighChart/toggleButton/toggleButton";

interface Props {
  LANGUAGE: LanguageInterface;
  fuelDataData: FuelDataValues;
  opBEngineOff: OBValue[];
  opBEngineOffCoasting: OBValue[];
  opBEngineOnIdle: OBValue[];
  opBEngineOnMoving: OBValue[];
}

export const FuelBehaviorTab = ({
  LANGUAGE,
  fuelDataData,
  opBEngineOff,
  opBEngineOffCoasting,
  opBEngineOnIdle,
  opBEngineOnMoving,
}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [geoModalData, setGeoModalData] = useState<GeoModalData>();

  // Operational Behavior (Estacionado, apagado, Avanzando, apagado y avanzando)

  const [showOpBEngineOff, setShowOpBEngineOff] = useState<boolean>(true);
  // const [showOpBEngineOffCoast, setShowOpBEngineOffCoast] =
  //   useState<boolean>(true);
  const [showOpBEngineOnIdle, setShowOpBEngineOnIdle] = useState<boolean>(true);
  const [showOpBEngineOnMoving, setShowOpBEngineOnMoving] =
    useState<boolean>(true);

  const handleClicGeoData = (geoModalData: GeoModalData) => {
    setGeoModalData(geoModalData);
    setIsModalOpen(true);
  };

  return (
    <div>
      <FuelBehaviorHighChart
        LANGUAGE={LANGUAGE}
        fuelDataData={fuelDataData}
        handleClicGeoData={handleClicGeoData}
        opBEngineOff={opBEngineOff}
        opBEngineOffCoasting={opBEngineOffCoasting}
        opBEngineOnIdle={opBEngineOnIdle}
        opBEngineOnMoving={opBEngineOnMoving}
      />

      <div className={styles.toggleButtonsGroup}>
        <ToggleButton
          action={() => setShowOpBEngineOff(!showOpBEngineOff)}
          title={LANGUAGE.highCharts.titles.engineOff}
          isOn={showOpBEngineOff}
          activeColor="#fb99e6"
        />
        {/* <ToggleButton
          action={() => setShowOpBEngineOffCoast(!showOpBEngineOffCoast)}
          title="Motor apagado y en movimiento"
          isOn={insideOpBEngineOffCoast.length > 0}
          activeColor="#ff000085"
        /> */}
        <ToggleButton
          action={() => setShowOpBEngineOnIdle(!showOpBEngineOnIdle)}
          title={LANGUAGE.highCharts.titles.engineOnIdle}
          isOn={showOpBEngineOnIdle}
          activeColor="#99e6fb"
        />
        <ToggleButton
          action={() => setShowOpBEngineOnMoving(!showOpBEngineOnMoving)}
          title={LANGUAGE.highCharts.titles.engineOnMoving}
          isOn={showOpBEngineOnMoving}
          activeColor="#e6fb99"
        />
      </div>

      {isModalOpen && geoModalData && (
        <GeoModal
          LANGUAGE={LANGUAGE}
          closeModal={() => setIsModalOpen(false)}
          geoModalData={geoModalData}
        />
      )}
    </div>
  );
};
