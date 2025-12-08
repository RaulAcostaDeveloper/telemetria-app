"use client";

import dynamic from "next/dynamic";

import styles from "./geoModal.module.css";
import { LanguageInterface } from "../../language/constants/language.model";
import { Modal } from "../modal/modal";
import { TooltipGeoField } from "../../utils/geoMapUtils";
import { ndIfEmpty } from "@/global/utils/ndIfEmpty";
import {
  MarkerData,
  ZoneDetail,
} from "./googleMapClientComponent/googleMapClientComponent";

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
  geoModalData?: GeoModalData;
  markersData?: MarkerData[];
  height?: number;
  width?: number;
  zoneCircle?: ZoneDetail;
}

const GeoModal = ({
  LANGUAGE,
  closeModal,
  geoModalData,
  markersData,
  height,
  width,
  zoneCircle,
}: Props) => {
  return (
    <Modal
      LANGUAGE={LANGUAGE}
      closeModal={closeModal}
      title={
        geoModalData ? geoModalData.title : markersData && markersData[0].title
      }
    >
      <div className={styles.bottom}>
        {geoModalData && geoModalData.rows.length > 0 && (
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
              markersData={markersData}
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
