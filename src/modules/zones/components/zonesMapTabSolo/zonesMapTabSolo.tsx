import dynamic from "next/dynamic";
import { LanguageInterface } from "@/global/language/constants/language.model";
import { ZoneDetail } from "@/global/components/geoModal/googleMapClientComponent/googleMapClientComponent";
import styles from "./zonesMapTabSolo.module.css";

const GoogleMapClientComponent = dynamic(
  () =>
    import(
      "@/global/components/geoModal/googleMapClientComponent/googleMapClientComponent"
    ),
  { ssr: false }
);

export interface markerData {
  id: number | string;
  position: { lat: number; lng: number };
  title: string;
}

interface Props {
  LANGUAGE: LanguageInterface;
  markersInZone: markerData[];
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
        geoModalData={markersInZone}
        mapType={"satellite"}
        zoneCircle={zoneCircle}
      />
    </div>
  );
};
