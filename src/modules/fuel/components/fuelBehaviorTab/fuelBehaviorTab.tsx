import { useEffect, useState } from "react";
import styles from "./fuelBehaviorTab.module.css";

import GeoModal, {
  GeoModalData,
} from "@/modules/global/components/geoModal/geoModal";
import { FuelBehaviorHighChart } from "../FuelBehaviorHighChart/FuelBehaviorHighChart";
import { FuelDataValues } from "@/globalConfig/redux/slices/fuelDataSlice";
import { LanguageInterface } from "@/modules/global/language/constants/language.model";
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
  // Dentro del chart con el objetivo de ocultarlos con un toggle
  const [insideOpBEngineOff, setinsideOpBEngineOff] = useState<OBValue[]>([]);
  const [insideOpBEngineOffCoast, setinsideOpBEngineOffCoast] = useState<
    OBValue[]
  >([]);
  const [insideOpBEngineOnIdle, setinsideOpBEngineOnIdle] = useState<OBValue[]>(
    []
  );
  const [insideOpBEngineOnMoving, setinsideOpBEngineOnMoving] = useState<
    OBValue[]
  >([]);

  useEffect(() => {
    setinsideOpBEngineOff(opBEngineOff);
    setinsideOpBEngineOffCoast(opBEngineOffCoasting);
    setinsideOpBEngineOnIdle(opBEngineOnIdle);
    setinsideOpBEngineOnMoving(opBEngineOnMoving);
  }, [opBEngineOff, opBEngineOffCoasting, opBEngineOnIdle, opBEngineOnMoving]);

  const toggleInsideOpBEngineOff = () => {
    if (insideOpBEngineOff.length > 0) {
      setinsideOpBEngineOff([]);
    } else {
      setinsideOpBEngineOff(opBEngineOff);
    }
  };

  // const toggleInsideOpBEngineOffCoast = () => {
  //   if (insideOpBEngineOffCoast.length > 0) {
  //     setinsideOpBEngineOffCoast([]);
  //   } else {
  //     setinsideOpBEngineOffCoast(opBEngineOffCoasting);
  //   }
  // };

  const toggleInsideOpBEngineOnIdle = () => {
    if (insideOpBEngineOnIdle.length > 0) {
      setinsideOpBEngineOnIdle([]);
    } else {
      setinsideOpBEngineOnIdle(opBEngineOnIdle);
    }
  };

  const toggleInsideOpBEngineOnMoving = () => {
    if (insideOpBEngineOnMoving.length > 0) {
      setinsideOpBEngineOnMoving([]);
    } else {
      setinsideOpBEngineOnMoving(opBEngineOnMoving);
    }
  };

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
        opBEngineOff={insideOpBEngineOff}
        opBEngineOffCoasting={insideOpBEngineOffCoast}
        opBEngineOnIdle={insideOpBEngineOnIdle}
        opBEngineOnMoving={insideOpBEngineOnMoving}
      />
      <div className={styles.toggleButtonsGroup}>
        <ToggleButton
          action={() => toggleInsideOpBEngineOff()}
          title={LANGUAGE.highCharts.titles.engineOff}
          isOn={insideOpBEngineOff.length > 0}
          activeColor="#fb99e6"
        />
        {/* <ToggleButton
          action={() => toggleInsideOpBEngineOffCoast()}
          title="Motor apagado y en movimiento"
          isOn={insideOpBEngineOffCoast.length > 0}
          activeColor="#ff000085"
        /> */}
        <ToggleButton
          action={() => toggleInsideOpBEngineOnIdle()}
          title={LANGUAGE.highCharts.titles.engineOnIdle}
          isOn={insideOpBEngineOnIdle.length > 0}
          activeColor="#99e6fb"
        />
        <ToggleButton
          action={() => toggleInsideOpBEngineOnMoving()}
          title={LANGUAGE.highCharts.titles.engineOnMoving}
          isOn={insideOpBEngineOnMoving.length > 0}
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
