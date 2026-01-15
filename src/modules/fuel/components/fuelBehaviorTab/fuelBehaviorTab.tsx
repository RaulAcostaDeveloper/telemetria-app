import React, { useState } from "react";
import styles from "./fuelBehaviorTab.module.css";

import { LanguageInterface } from "@/global/language/constants/language.model";
import { ToggleButton } from "../FuelBehaviorHighChart/toggleButton/toggleButton";

interface Props {
  LANGUAGE: LanguageInterface;
  children: React.ReactNode;
}

export const FuelBehaviorTab = ({ LANGUAGE, children }: Props) => {
  // Operational Behavior (Estacionado, apagado, Avanzando, apagado y avanzando)

  const [showOpBEngineOff, setShowOpBEngineOff] = useState<boolean>(true);
  // const [showOpBEngineOffCoast, setShowOpBEngineOffCoast] =
  //   useState<boolean>(true);
  const [showOpBEngineOnIdle, setShowOpBEngineOnIdle] = useState<boolean>(true);
  const [showOpBEngineOnMoving, setShowOpBEngineOnMoving] =
    useState<boolean>(true);

  return (
    <div>
      <div
        className={`
        ${showOpBEngineOff ? "" : styles.hideOpBEngineOff}
        ${showOpBEngineOnIdle ? "" : styles.hideOpBEngineOnIdle}
        ${showOpBEngineOnMoving ? "" : styles.hideOpBEngineOnMoving}
        `}
      >
        {children}
      </div>

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
    </div>
  );
};
