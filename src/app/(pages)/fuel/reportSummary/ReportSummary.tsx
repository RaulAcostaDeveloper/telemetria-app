import React from "react";
import {
  LocalGasStationRounded,
  SpeedRounded,
  TrendingDown,
  TrendingUp,
} from "@mui/icons-material";
import styles from "./reportSummary.module.css";

const ReportSummary = () => {
  return (
    <div className={styles.reportSummaryContainer}>
      <div className={styles.singleReportContainer}>
        <div className={styles.iconContainer}>
          <LocalGasStationRounded className={styles.inventory} />
        </div>
        <div className={styles.summaryContainer}>
          <h1>Inventario</h1>
          <span>48,037.00L</span>
        </div>
      </div>
      <div className={styles.singleReportContainer}>
        <div className={styles.iconContainer}>
          <SpeedRounded className={styles.performance} />
        </div>
        <div className={styles.summaryContainer}>
          <h1>Rendimiento</h1>
          <span>158.39999</span>
        </div>
      </div>
      <div className={styles.singleReportContainer}>
        <div className={styles.iconContainer}>
          <TrendingUp className={styles.fuelCharged} />
        </div>
        <div className={styles.summaryContainer}>
          <h1>Cargado</h1>
          <span>153977L</span>
        </div>
      </div>
      <div className={styles.singleReportContainer}>
        <div className={styles.iconContainer}>
          <TrendingDown className={styles.fuelDischarged} />
        </div>
        <div className={styles.summaryContainer}>
          <h1>Descargado</h1>
          <span>153977L</span>
        </div>
      </div>
    </div>
  );
};

export default ReportSummary;
