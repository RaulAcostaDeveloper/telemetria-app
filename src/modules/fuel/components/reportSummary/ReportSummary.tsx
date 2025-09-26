import React from "react";

import {
  LocalGasStationRounded,
  SpeedRounded,
  TrendingDown,
  TrendingUp,
  Troubleshoot,
  DataThresholding,
} from "@mui/icons-material";
import { formatNumberWithCommas } from "@/global/utils/utils";
import styles from "./reportSummary.module.css";
import { useLanguage } from "@/global/language/components/languageProvider/languageProvider";
import { SummaryFuelValues } from "@/global/redux/serviceSlices/fuelSummarySlice";

interface Props {
  summaryValues: SummaryFuelValues;
}

const ReportSummary = ({ summaryValues }: Props) => {
  const LANGUAGE = useLanguage();
  return (
    <div className={styles.reportSummaryContainer}>
      <div className={styles.singleReportContainer}>
        <div className={styles.iconContainer}>
          <LocalGasStationRounded className={styles.inventory} />
        </div>
        <div className={styles.summaryContainer}>
          <h4>{LANGUAGE.fuel.summaryReports.labels.inventory}</h4>
          <span>
            {summaryValues.inventory
              ? `${formatNumberWithCommas(summaryValues.inventory)}  L`
              : "0,00  L"}
          </span>
        </div>
      </div>
      <div className={styles.singleReportContainer}>
        <div className={styles.iconContainer}>
          <SpeedRounded className={styles.performance} />
        </div>
        <div className={styles.summaryContainer}>
          <h4>{LANGUAGE.fuel.summaryReports.labels.performance}</h4>
          <span>
            {summaryValues.performanceOdometer
              ? `${formatNumberWithCommas(
                  summaryValues.performanceOdometer
                )}  Km / L`
              : "0,00  Km / L"}
          </span>
        </div>
      </div>
      <div className={styles.singleReportContainer}>
        <div className={styles.iconContainer}>
          <TrendingUp className={styles.fuelCharged} />
        </div>
        <div className={styles.summaryContainer}>
          <h4>{LANGUAGE.fuel.summaryReports.labels.fuelCharged}</h4>
          <span>
            {summaryValues.fuelCharged
              ? `${formatNumberWithCommas(summaryValues.fuelCharged)}  L`
              : "0,00  L"}
          </span>
        </div>
      </div>
      <div className={styles.singleReportContainer}>
        <div className={styles.iconContainer}>
          <TrendingDown className={styles.fuelDischarged} />
        </div>
        <div className={styles.summaryContainer}>
          <h4>{LANGUAGE.fuel.summaryReports.labels.fuelDischarged}</h4>
          <span>
            {summaryValues.fuelDischarged
              ? `${formatNumberWithCommas(summaryValues.fuelDischarged)}  L`
              : "0,00  L"}
          </span>
        </div>
      </div>
      <div className={styles.singleReportContainer}>
        <div className={styles.iconContainer}>
          <Troubleshoot className={styles.unitsAnalyzed} />
        </div>
        <div className={styles.summaryContainer}>
          <h4>{LANGUAGE.fuel.summaryReports.labels.unitsAnalyzed}</h4>
          <span>
            {summaryValues.unitsAnalyzed
              ? `${formatNumberWithCommas(summaryValues.unitsAnalyzed)}`
              : "0,00"}
          </span>
        </div>
      </div>
      <div className={styles.singleReportContainer}>
        <div className={styles.iconContainer}>
          <DataThresholding className={styles.totalDistanceTraveled} />
        </div>
        <div className={styles.summaryContainer}>
          <h4>{LANGUAGE.fuel.summaryReports.labels.totalDistanceTraveled}</h4>
          <span>
            {summaryValues.totalDistanceTraveled
              ? `${formatNumberWithCommas(
                  summaryValues.totalDistanceTraveled
                )} Km`
              : "0,00 Km"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReportSummary;
