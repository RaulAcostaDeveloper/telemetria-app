"use client";
import styles from "./zonesDataProvider.module.css";
import { LocalGasStation, Map } from "@mui/icons-material";
import { TabsContent } from "@/global/components";
import { ZonesMapTabSolo } from "../zonesMapTabSolo/zonesMapTabSolo";
import { useLanguage } from "@/global/language/components/languageProvider/languageProvider";
import { useMemo } from "react";
import { z0n3sD4t4M0ck } from "@/global/components/dataMock/z0n3sD4t4M0ck";
import { ZoneSingleInfo } from "../zoneSingleInfo/zoneSingleInfo";

interface Props {
  imei: string;
}

export const ZonesDataProvider = ({ imei }: Props) => {
  const LANGUAGE = useLanguage();
  // TODO: Agregar mock de información a constantes.
  const zoneTabs = [
    { text: LANGUAGE.zonesVehicle.tabs.map, icon: Map },
    {
      text: LANGUAGE.zonesVehicle.tabs.load,
      icon: LocalGasStation,
      iconStyle: { color: "rgb(4,187,4)" },
    },
    {
      text: LANGUAGE.zonesVehicle.tabs.unload,
      icon: LocalGasStation,
      iconStyle: { color: "223,44,59)" },
    },
  ];

  const allZoneData = useMemo(() => {
    return z0n3sD4t4M0ck[1];
  }, []);

  /* const { geoData, ...allButGeoZoneData } = allZoneData; */

  return (
    <div className={styles.zonesDataProvider}>
      <TabsContent
        tabOptions={zoneTabs}
        tabContents={[
          <div key={0}>
            <div className={["containertabmap", styles.container].join(" ")}>
              <ZoneSingleInfo allZoneData={allZoneData} />
              <ZonesMapTabSolo
                LANGUAGE={LANGUAGE}
                geoModalData={allZoneData.geoData}
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
