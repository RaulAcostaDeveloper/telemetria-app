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
  key: number;
}

export const ZonesMapTabSolo = ({
  LANGUAGE,
  markersInZone,
  zoneCircle,
  key,
}: Props) => {
  return (
    <div className={["containermap", styles.container].join(" ")} key={key}>
      <GoogleMapClientComponentZone
        LANGUAGE={LANGUAGE}
        markersData={markersInZone}
        mapType={"satellite"}
        zoneCircle={zoneCircle}
      />
    </div>
  );
};
