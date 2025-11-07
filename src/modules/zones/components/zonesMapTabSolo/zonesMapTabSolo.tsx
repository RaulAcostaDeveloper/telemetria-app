import dynamic from "next/dynamic";
import styles from "./zonesMapTabSolo.module.css";
import { LanguageInterface } from "@/global/language/constants/language.model";
import { TooltipGeoField } from "@/global/utils/geoMapUtils";

const GoogleMapClientOnly = dynamic(
  () =>
    import(
      "@/global/components/geoModal/googleMapClientComponent/googleMapClientComponent"
    ),
  { ssr: false }
);

type GeoData = {
  lat: number;
  lon: number;
  title: string;
  rows: TooltipGeoField[];
};

interface Props {
  LANGUAGE: LanguageInterface;
  geoModalData: GeoData;
}

export const ZonesMapTabSolo = ({ LANGUAGE, geoModalData }: Props) => {
  return (
    <div className={["containermap", styles.container].join(" ")}>
      <GoogleMapClientOnly
        LANGUAGE={LANGUAGE}
        geoModalData={geoModalData}
        mapType={"satellite"}
      />
    </div>
  );
};
