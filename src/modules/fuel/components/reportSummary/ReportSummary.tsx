import React from "react";

import {
  LocalGasStationRounded,
  SpeedRounded,
  TrendingDown,
  TrendingUp,
  Troubleshoot,
  DataThresholding,
} from "@mui/icons-material";
import { formatNumberWithCommas } from "@/modules/global/utils/utils";
import styles from "./reportSummary.module.css";
import { useLanguage } from "@/modules/global/language/components/languageProvider/languageProvider";
import { SummaryFuelValues } from "@/globalConfig/redux/slices/fuelSummarySlice";

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
          <h1>{LANGUAGE.fuel.summaryReports.labels.inventory}</h1>
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
          <h1>{LANGUAGE.fuel.summaryReports.labels.performance}</h1>
          <span>
            {summaryValues.performanceOdometer
              ? `${formatNumberWithCommas(
                  summaryValues.performanceOdometer
                )}  Km`
              : "0,00  Km"}
          </span>
        </div>
      </div>
      <div className={styles.singleReportContainer}>
        <div className={styles.iconContainer}>
          <TrendingUp className={styles.fuelCharged} />
        </div>
        <div className={styles.summaryContainer}>
          <h1>{LANGUAGE.fuel.summaryReports.labels.fuelCharged}</h1>
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
          <h1>{LANGUAGE.fuel.summaryReports.labels.fuelDischarged}</h1>
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
          <h1>{LANGUAGE.fuel.summaryReports.labels.unitsAnalyzed}</h1>
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
          <h1>{LANGUAGE.fuel.summaryReports.labels.totalDistanceTraveled}</h1>
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
