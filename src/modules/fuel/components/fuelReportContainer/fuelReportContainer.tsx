"use client";
import { useState } from "react";
import { FuelReportDataFetcher } from "../fuelReportDataFetcher/fuelReportDataFetcher";
import { FuelReportDataProvider } from "../fuelReportDataProvider/fuelReportDataProvider";

interface Props {
  imei: string;
}

export const FuelReportContainer = ({ imei }: Props) => {
  const [isFuelNowSyncronizing, setIsFuelNowSyncronizing] = useState(true);

  return (
    <>
      <FuelReportDataFetcher imei={imei} />
      <FuelReportDataProvider
        isFuelNowSyncronizing={isFuelNowSyncronizing}
        setIsFuelNowSyncronizing={setIsFuelNowSyncronizing}
      />
    </>
  );
};
