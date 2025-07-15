"use client";

import dynamic from "next/dynamic";

import styles from "./geoModal.module.css";
import { LanguageInterface } from "../../language/constants/language.model";
import { Modal } from "../modal/modal";
import { TooltipGeoField } from "@/modules/fuel/utils/tooltipHighchartFormatter";

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
}

const GeoModal = ({ LANGUAGE, closeModal, geoModalData }: Props) => {
  return (
    <Modal LANGUAGE={LANGUAGE} closeModal={closeModal}>
      <h3 className={styles.title}>{geoModalData.title}</h3>
      <div className={styles.bottom}>
        {geoModalData.rows.length > 0 && (
          <div className={styles.rows}>
            {geoModalData.rows.map((row, index) => (
              <div className={styles.row} key={index}>
                <span className={styles.label}>{row.label}:</span>
                <span className={styles.value}>{String(row.value)}</span>
              </div>
            ))}
          </div>
        )}
        <div className={styles.mapSide}>
          <div className={styles.mapa}>
            <GoogleMapClientOnly
              LANGUAGE={LANGUAGE}
              geoModalData={geoModalData}
              mapType={"satellite"}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default GeoModal;
