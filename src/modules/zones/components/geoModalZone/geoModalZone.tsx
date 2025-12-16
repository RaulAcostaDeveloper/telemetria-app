"use client";

import dynamic from "next/dynamic";

import styles from "./geoModalZone.module.css";
import { LanguageInterface } from "@/global/language/constants/language.model";
import { Modal } from "@/global/components";
import {
  MarkerData,
  ZoneDetail,
} from "./googleMaps/googleMapClientComponentZone/googleMapClientComponentZone";

const GoogleMapClientComponentZone = dynamic(
  () =>
    import(
      "./googleMaps/googleMapClientComponentZone/googleMapClientComponentZone"
    ),
  { ssr: false }
);

interface Props {
  LANGUAGE: LanguageInterface;
  closeModal: () => void;
  markersData?: MarkerData[];
  height?: number;
  width?: number;
  zoneCircle?: ZoneDetail;
}

const GeoModalZone = ({
  LANGUAGE,
  closeModal,
  markersData,
  height,
  width,
  zoneCircle,
}: Props) => {
  return (
    <Modal
      LANGUAGE={LANGUAGE}
      closeModal={closeModal}
      title={markersData && markersData[0].title}
    >
      <div className={styles.bottom}>
        <div
          className={styles.mapSide}
          style={{
            ...(width !== undefined && { width: `${width}px` }),
            ...(height !== undefined && { height: `${height}px` }),
          }}
        >
          <div
            className={styles.mapa}
            style={{
              ...(width !== undefined && { width: `${width}px` }),
              ...(height !== undefined && { height: `${height}px` }),
            }}
          >
            <GoogleMapClientComponentZone
              LANGUAGE={LANGUAGE}
              markersData={markersData}
              mapType={"roadmap"}
              zoneCircle={zoneCircle}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default GeoModalZone;
