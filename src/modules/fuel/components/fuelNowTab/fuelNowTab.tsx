"use client";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { DataErrorHandler } from "@/global/components/DataErrorHandler/DataErrorHandler";
import { FuelNowContainer } from "../fuelNowContainer/fuelNowContainer";
import { GeoModalData } from "@/global/components/geoModal/geoModal";
import { LanguageInterface } from "@/global/language/constants/language.model";
import { RootState } from "@/global/redux/store";

interface Props {
  LANGUAGE: LanguageInterface;
  isFuelNowSyncronizing: boolean;
  isModalOpen: boolean;
  setGeoModalData: (data: GeoModalData) => void;
  setIsFuelNowSyncronizing: (toggle: boolean) => void;
  setIsModalOpen: (toggle: boolean) => void;
}
export const FuelNowTab = ({
  LANGUAGE,
  isFuelNowSyncronizing,
  isModalOpen,
  setGeoModalData,
  setIsFuelNowSyncronizing,
  setIsModalOpen,
}: Props) => {
  const { lastFuelReportData, lastFuelReportStatus } = useSelector(
    (state: RootState) => state.lastFuelReport
  );

  useEffect(() => {
    if (lastFuelReportData?.value) {
      setGeoModalData({
        lat: parseFloat(lastFuelReportData?.value.lat.toString()),
        lon: parseFloat(lastFuelReportData?.value.lon.toString()),
        title: LANGUAGE.geoModalTitles.fuelNowTitle,
        rows: [],
      });
    }
  }, [lastFuelReportData, LANGUAGE]);

  return (
    <>
      {lastFuelReportData?.value && (
        <>
          <FuelNowContainer
            LANGUAGE={LANGUAGE}
            isFuelNowSyncronizing={isFuelNowSyncronizing}
            isModalOpen={isModalOpen}
            lastFuelReportData={lastFuelReportData.value}
            setIsFuelNowSyncronizing={setIsFuelNowSyncronizing}
            setIsModalOpen={setIsModalOpen}
          />
        </>
      )}

      <DataErrorHandler
        LANGUAGE={LANGUAGE}
        hasData={!!lastFuelReportData?.value}
        infoStatus={lastFuelReportStatus}
      />
    </>
  );
};
