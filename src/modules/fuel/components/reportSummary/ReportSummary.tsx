import React from "react";

import {
  LocalGasStationRounded,
  SpeedRounded,
  TrendingDown,
  TrendingUp,
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
              ? `${formatNumberWithCommas(
                  summaryValues.inventory
                )}L`
              : "0,00L"}
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
                )}L`
              : "0,00L"}
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
              ? `${formatNumberWithCommas(
                  summaryValues.fuelCharged
                )}L`
              : "0,00L"}
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
              ? `${formatNumberWithCommas(
                  summaryValues.fuelDischarged
                )}L`
              : "0,00L"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReportSummary;
