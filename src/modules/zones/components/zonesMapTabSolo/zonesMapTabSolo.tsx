import dynamic from "next/dynamic";
import { LanguageInterface } from "@/global/language/constants/language.model";
import {
  MarkerData,
  ZoneDetail,
} from "@/global/components/geoModal/googleMapClientComponent/googleMapClientComponent";
import styles from "./zonesMapTabSolo.module.css";

const GoogleMapClientComponent = dynamic(
  () =>
    import(
      "@/global/components/geoModal/googleMapClientComponent/googleMapClientComponent"
    ),
  { ssr: false }
);

interface Props {
  LANGUAGE: LanguageInterface;
  markersInZone: MarkerData[];
  zoneCircle?: ZoneDetail;
}

export const ZonesMapTabSolo = ({
  LANGUAGE,
  markersInZone,
  zoneCircle,
}: Props) => {
  return (
    <div className={["containermap", styles.container].join(" ")}>
      <GoogleMapClientComponent
        LANGUAGE={LANGUAGE}
        markersData={markersInZone}
        mapType={"satellite"}
        zoneCircle={zoneCircle}
      />
    </div>
  );
};
