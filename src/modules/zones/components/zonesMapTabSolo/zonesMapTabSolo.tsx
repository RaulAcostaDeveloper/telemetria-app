import dynamic from "next/dynamic";
import styles from "./zonesMapTabSolo.module.css";
import { LanguageInterface } from "@/global/language/constants/language.model";

const GoogleMapClientComponent = dynamic(
  () =>
    import(
      "@/global/components/geoModal/googleMapClientComponent/googleMapClientComponent"
    ),
  { ssr: false }
);

interface markerData {
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
      <GoogleMapClientComponent
        LANGUAGE={LANGUAGE}
        geoModalData={markersInZone}
        mapType={"satellite"}
      />
    </div>
  );
};
