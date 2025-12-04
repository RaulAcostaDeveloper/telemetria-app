"use client";

import dynamic from "next/dynamic";

import styles from "./geoModal.module.css";
import { LanguageInterface } from "../../language/constants/language.model";
import { Modal } from "../modal/modal";
import { TooltipGeoField } from "../../utils/geoMapUtils";
import { ndIfEmpty } from "@/global/utils/ndIfEmpty";
import { ZoneDetail } from "./googleMapClientComponent/googleMapClientComponent";

const GoogleMapClientOnly = dynamic(
  () => import("./googleMapClientComponent/googleMapClientComponent"),
  { ssr: false }
);

export interface GeoModalData {
  lat: number;
  lon: number;
  title: string;
  rows: TooltipGeoField[];
}

interface Props {
  LANGUAGE: LanguageInterface;
  closeModal: () => void;
  geoModalData: GeoModalData;
  height?: number;
  width?: number;
  zoneCircle?: ZoneDetail;
}

const GeoModal = ({
  LANGUAGE,
  closeModal,
  geoModalData,
  height,
  width,
  zoneCircle,
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
              geoModalData={geoModalData}
              mapType={"satellite"}
              zoneCircle={zoneCircle}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default GeoModal;
