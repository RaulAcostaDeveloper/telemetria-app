import dynamic from "next/dynamic";
import { LanguageInterface } from "@/global/language/constants/language.model";
import {
  MarkerData,
  ZoneDetail,
} from "../geoModalZone/googleMaps/googleMapClientComponentZone/googleMapClientComponentZone";
import styles from "./zonesMapTabSolo.module.css";

const GoogleMapClientComponentZone = dynamic(
  () =>
    import(
      "../geoModalZone/googleMaps/googleMapClientComponentZone/googleMapClientComponentZone"
    ),
  { ssr: false }
);

interface Props {
  LANGUAGE: LanguageInterface;
  markersInZone: MarkerData[];
  zoneCircle?: ZoneDetail;
  keyNum: number;
}

export const ZonesMapTabSolo = ({
  LANGUAGE,
  markersInZone,
  zoneCircle,
  keyNum,
}: Props) => {
  return (
    <div className={["containermap", styles.container].join(" ")} key={keyNum}>
      <GoogleMapClientComponentZone
        LANGUAGE={LANGUAGE}
        markersData={markersInZone}
        mapType={"roadmap"}
        zoneCircle={zoneCircle}
      />
    </div>
  );
};
