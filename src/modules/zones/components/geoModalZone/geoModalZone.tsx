"use client";

import dynamic from "next/dynamic";

import styles from "./geoModalZone.module.css";
import { LanguageInterface } from "@/global/language/constants/language.model";
import { Modal } from "@/global/components";
import { TooltipGeoField } from "@/global/utils/geoMapUtils";
import { markerData } from "../zonesMapTabSolo/zonesMapTabSolo";
import { ndIfEmpty } from "@/global/utils/ndIfEmpty";

const GoogleMapClientOnly = dynamic(
  () =>
    import(
      "@/global/components/geoModal/googleMapClientComponent/googleMapClientComponent"
    ),
  { ssr: false }
);

export interface GeoZonesModalData {
  markersInZone: markerData[];
  title: string;
  rows: TooltipGeoField[];
}

interface Props {
  LANGUAGE: LanguageInterface;
  closeModal: () => void;
  geoModalData: GeoZonesModalData;
  height?: number;
  width?: number;
}

const GeoModalZone = ({
  LANGUAGE,
  closeModal,
  geoModalData,
  height,
  width,
}: Props) => {
  return (
    <Modal
      LANGUAGE={LANGUAGE}
      closeModal={closeModal}
      title={geoModalData.title}
    >
      <div className={styles.bottom}>
        {geoModalData.rows.length > 0 && (
          <div className={styles.rows}>
            {geoModalData.rows.map((row, index) => (
              <div className={styles.row} key={index}>
                <span className={styles.label}>{row.label}:</span>
                <span className={styles.value}>
                  {ndIfEmpty(String(row.value))}
                </span>
              </div>
            ))}
          </div>
        )}
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
            <GoogleMapClientOnly
              LANGUAGE={LANGUAGE}
              mapType={"satellite"}
              geoModalData={geoModalData.markersInZone}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default GeoModalZone;
