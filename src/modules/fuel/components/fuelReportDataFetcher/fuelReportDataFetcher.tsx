"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "@/global/redux/store";
import { SERVICE_STATUS } from "@/global/redux/serviceSlices/types/serviceTypes";
import { TryFuelReportOnFailed } from "./tryFuelReportOnFailed/tryFuelReportOnFailed";
import { fetchFuelData } from "@/global/redux/serviceSlices/fuelDataSlice";
import { fetchFuelPerformance } from "@/global/redux/serviceSlices/fuelPerformanceSlice";
import { fetchLastFuelReport } from "@/global/redux/serviceSlices/lastFuelReportSlice";
import { formatToLocalIso8601 } from "@/global/utils/utils";
import { useAuth } from "@/modules/auth/utils";

interface Props {
  imei: string;
}

export const FuelReportDataFetcher = ({ imei }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const { isAuthenticated, logoutState } = useAuth();

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
          imei: imei, // imei.toString(),
          startDate: formatToLocalIso8601(startDate), // formatToLocalIso8601(startDate),
          endDate: formatToLocalIso8601(endDate),
          logoutState,
        })
      );

      dispatch(
        fetchFuelPerformance({
          imei: imei, // imei.toString(),
          startDate: formatToLocalIso8601(startDate), // formatToLocalIso8601(startDate),
          endDate: formatToLocalIso8601(endDate),
          logoutState,
        })
      );

      dispatch(
        fetchLastFuelReport({
          imei: imei, // imei.toString(),
          logoutState,
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
            imei: imei, // imei.toString(),
            logoutState,
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
