"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { DataErrorHandler } from "@/global/components/DataErrorHandler/DataErrorHandler";
import { FuelNowContainer } from "../fuelNowContainer/fuelNowContainer";
import { GeoModalData } from "@/global/components/geoModal/geoModal";
import { LanguageInterface } from "@/global/language/constants/language.model";
import { LastFuelReportData } from "@/global/redux/serviceSlices/lastFuelReportSlice";
import { RootState } from "@/global/redux/store";
import { SERVICE_STATUS } from "@/global/redux/serviceSlices/types/serviceTypes";
import { toLocalDateTime } from "@/global/utils/utils";

interface Props {
  LANGUAGE: LanguageInterface;
  isModalOpen: boolean;
  setGeoModalData: (data: GeoModalData) => void;
  setIsModalOpen: (toggle: boolean) => void;
}
export const FuelNowTab = ({
  LANGUAGE,
  isModalOpen,
  setGeoModalData,
  setIsModalOpen,
}: Props) => {
  const [lastFuelReportDataFormated, getLastFuelReportDataFormated] =
    useState<LastFuelReportData>();
  const { lastFuelReportData, lastFuelReportStatus } = useSelector(
    (state: RootState) => state.lastFuelReport
  );

  useEffect(() => {
    if (lastFuelReportData?.value) {
      const dataFormated = {
        ...lastFuelReportData,
        value: {
          ...lastFuelReportData.value,
          dateGps: toLocalDateTime(lastFuelReportData.value.dateGps),
          dateSvr: toLocalDateTime(lastFuelReportData.value.dateSvr),
          dateAvl: toLocalDateTime(lastFuelReportData.value.dateAvl),
        },
      };
      getLastFuelReportDataFormated(dataFormated);
    }
  }, [lastFuelReportData]);

  useEffect(() => {
    if (lastFuelReportDataFormated?.value) {
      setGeoModalData({
        lat: parseFloat(lastFuelReportDataFormated?.value.lat.toString()),
        lon: parseFloat(lastFuelReportDataFormated?.value.lon.toString()),
        title: LANGUAGE.geoModalTitles.fuelNowTitle,
        rows: [],
      });
    }
  }, [lastFuelReportDataFormated, LANGUAGE]);

  return (
    <>
      {lastFuelReportStatus === SERVICE_STATUS.succeeded &&
        lastFuelReportDataFormated?.value && (
          <>
            <FuelNowContainer
              LANGUAGE={LANGUAGE}
              isModalOpen={isModalOpen}
              lastFuelReportData={lastFuelReportDataFormated.value}
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
