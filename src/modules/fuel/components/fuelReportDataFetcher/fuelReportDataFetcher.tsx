"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "@/globalConfig/redux/store";
import { SERVICE_STATUS } from "@/globalConfig/redux/types/serviceTypes";
import { TryFuelReportOnFailed } from "./tryFuelReportOnFailed/tryFuelReportOnFailed";
import { fetchFuelData } from "@/globalConfig/redux/slices/fuelDataSlice";
import { fetchFuelPerformance } from "@/globalConfig/redux/slices/fuelPerformanceSlice";
import { fetchLastFuelReport } from "@/globalConfig/redux/slices/lastFuelReportSlice";
import { formatToLocalIso8601 } from "@/modules/global/utils/utils";
import { useAuth } from "@/modules/auth/utils";

interface Props {
  imei: string;
}

export const FuelReportDataFetcher = ({ imei }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const { isAuthenticated } = useAuth();

  const { startDate, endDate } = useSelector(
    (state: RootState) => state.calendar
  );

  const { lastFuelReportStatus } = useSelector(
    (state: RootState) => state.lastFuelReport
  );

  useEffect(() => {
    if (isAuthenticated && startDate && endDate && imei.length > 10) {
      dispatch(
        fetchFuelData({
          imei: "862524060822760", // imei.toString(),
          startDate: formatToLocalIso8601(startDate), // formatToLocalIso8601(startDate),
          endDate: formatToLocalIso8601(endDate),
        })
      );

      dispatch(
        fetchFuelPerformance({
          imei: "862524060822760", // imei.toString(),
          startDate: formatToLocalIso8601(startDate), // formatToLocalIso8601(startDate),
          endDate: formatToLocalIso8601(endDate),
        })
      );

      dispatch(
        fetchLastFuelReport({
          imei: "862524060822760", // imei.toString(),
        })
      );
    }
  }, [isAuthenticated, startDate, endDate, imei]);

  useEffect(() => {
    // Tener la data actualizada cada 10 segundos
    const intervalId = setInterval(() => {
      if (
        isAuthenticated &&
        imei.length > 10 &&
        lastFuelReportStatus === SERVICE_STATUS.succeeded // si el anterior llamado es succeeded entonces sigue
      ) {
        dispatch(
          fetchLastFuelReport({
            imei: "862524060822760", // imei.toString(),
          })
        );
      }
    }, 20000);

    return () => {
      clearTimeout(intervalId);
    };
  }, [isAuthenticated, imei, lastFuelReportStatus]);

  return <TryFuelReportOnFailed imei={imei} />;
};
