import dynamic from "next/dynamic";
import styles from "./zonesMapTabSolo.module.css";
import { LanguageInterface } from "@/global/language/constants/language.model";

const GoogleMapSeveralMarkersClientC = dynamic(
  () =>
    import(
      "@/global/components/geoModal/googleMapSeveralMarkersClientC/googleMapSeveralMarkersClientC"
    ),
  { ssr: false }
);

export interface markerData {
  id: number;
  position: { lat: number; lng: number };
  title: string;
}

interface Props {
  LANGUAGE: LanguageInterface;
  markersInZone: markerData[];
}

export const ZonesMapTabSolo = ({ LANGUAGE, markersInZone }: Props) => {
  return (
    <div className={["containermap", styles.container].join(" ")}>
      <GoogleMapSeveralMarkersClientC
        LANGUAGE={LANGUAGE}
        places={markersInZone}
        mapType={"satellite"}
      />
    </div>
  );
};
