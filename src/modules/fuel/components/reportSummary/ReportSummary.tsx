import React from "react";

import {
  LocalGasStationRounded,
  SpeedRounded,
  TrendingDown,
  TrendingUp,
} from "@mui/icons-material";
import { formatNumberWithCommas } from "@/modules/global/utils/utils";
import styles from "./reportSummary.module.css";
import { fuelSummaryDataMock } from "@/modules/global/dataMock/fuelSummary/fuelSummary";
import { useLanguage } from "@/modules/global/language/components/languageProvider/languageProvider";

const ReportSummary = () => {
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
            {fuelSummaryDataMock.value.inventory
              ? `${formatNumberWithCommas(
                  fuelSummaryDataMock.value.inventory
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
            {fuelSummaryDataMock.value.performanceOdometer
              ? `${formatNumberWithCommas(
                  fuelSummaryDataMock.value.performanceOdometer
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
            {fuelSummaryDataMock.value.fuelCharged
              ? `${formatNumberWithCommas(
                  fuelSummaryDataMock.value.fuelCharged
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
            {fuelSummaryDataMock.value.fuelDischarged
              ? `${formatNumberWithCommas(
                  fuelSummaryDataMock.value.fuelDischarged
                )}L`
              : "0,00L"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReportSummary;
