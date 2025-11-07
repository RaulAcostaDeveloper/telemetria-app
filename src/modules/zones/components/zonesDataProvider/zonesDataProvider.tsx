"use client";
import { useMemo } from "react";
import { LocalGasStation, Map } from "@mui/icons-material";

import styles from "./zonesDataProvider.module.css";
import { TabsContent } from "@/global/components";
import { ZonesMapTabSolo } from "../zonesMapTabSolo/zonesMapTabSolo";
import { useLanguage } from "@/global/language/components/languageProvider/languageProvider";
import { z0n3sD4t4M0ck } from "@/global/components/dataMock/z0n3sD4t4M0ck";

interface Props {
  id: string;
}

export const ZonesDataProvider = ({ id }: Props) => {
  const LANGUAGE = useLanguage();
  // TODO: Agregar mock de información a constantes.
  const zoneTabs = [
    { text: LANGUAGE.zones.tabs.map, icon: Map },
    {
      text: LANGUAGE.zones.tabs.load,
      icon: LocalGasStation,
      iconStyle: { color: "rgb(4,187,4)" },
    },
    {
      text: LANGUAGE.zones.tabs.unload,
      icon: LocalGasStation,
      iconStyle: { color: "223,44,59)" },
    },
  ];

  const allZoneData = useMemo(() => {
    return z0n3sD4t4M0ck[1];
  }, []);

  return (
    <div className={styles.zonesDataProvider}>
      {id}
      <TabsContent
        tabOptions={zoneTabs}
        tabContents={[
          <div key={0}>
            <div className={["containertabmap", styles.container].join(" ")}>
              <ZonesMapTabSolo
                LANGUAGE={LANGUAGE}
                markersInZone={allZoneData.markersInZone}
              />
            </div>
          </div>,
          <div key={1}></div>,
          <div key={2}></div>,
        ]}
      />
    </div>
  );
};
