"use client";
import { useState } from "react";
import dynamic from "next/dynamic";

import styles from "./geoModal.module.css";
import { LanguageInterface } from "../../language/constants/language.model";
import { Modal } from "../modal/modal";
import { TooltipField } from "@/modules/fuel/utils/tooltipHighchartFormatter";

const GoogleMapClientOnly = dynamic(
  () => import("./googleMapClientComponent/googleMapClientComponent"),
  { ssr: false }
);

export interface GeoModalData {
  lat: number;
  lon: number;
  title: string;
  rows: TooltipField[];
}

interface Props {
  LANGUAGE: LanguageInterface;
  closeModal: () => void;
  geoModalData: GeoModalData;
}

const GeoModal = ({ LANGUAGE, closeModal, geoModalData }: Props) => {
  const [mapType, setMapType] = useState<"roadmap" | "satellite">("satellite");

  const toggleMapType = () => {
    setMapType((prev) => (prev === "roadmap" ? "satellite" : "roadmap"));
  };

  return (
    <Modal LANGUAGE={LANGUAGE} closeModal={closeModal}>
      <h3 className={styles.title}>{geoModalData.title}</h3>
      <div className={styles.bottom}>
        <div className={styles.rows}>
          {geoModalData.rows.map((row, index) => (
            <div className={styles.row} key={index}>
              <span className={styles.label}>{row.label}:</span>
              <span className={styles.value}>{String(row.value)}</span>
            </div>
          ))}
        </div>
        <div className={styles.mapContainer}>
          <div className={styles.toggleWrapper}>
            <span className={styles.toggleLabel}>
              {mapType === "roadmap"
                ? LANGUAGE.fuelVehicle.geoModalTitles.roadmap
                : LANGUAGE.fuelVehicle.geoModalTitles.satellite}
            </span>
            <label className={styles.toggleSwitch}>
              <input
                type="checkbox"
                checked={mapType === "satellite"}
                onChange={toggleMapType}
              />
              <span className={styles.slider}></span>
            </label>
          </div>
          <div className={styles.mapa}>
            <GoogleMapClientOnly
              LANGUAGE={LANGUAGE}
              geoModalData={geoModalData}
              mapType={mapType}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default GeoModal;
