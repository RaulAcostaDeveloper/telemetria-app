"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "@/global/redux/store";
import { SERVICE_STATUS } from "@/global/redux/serviceSlices/types/serviceTypes";
import { fetchFuelData } from "@/global/redux/serviceSlices/fuelDataSlice";
import { fetchFuelPerformance } from "@/global/redux/serviceSlices/fuelPerformanceSlice";
import { fetchLastFuelReport } from "@/global/redux/serviceSlices/lastFuelReportSlice";
import { formatToLocalIso8601 } from "@/global/utils/utils";
import { useAuth } from "@/modules/auth/utils";

interface Props {
  imei: string;
}

export const TryFuelReportOnFailed = ({ imei }: Props) => {
  const { isAuthenticated, logoutState } = useAuth();
  const dispatch = useDispatch<AppDispatch>();

  const { startDate, endDate } = useSelector(
    (state: RootState) => state.calendar
  );

  const { fuelDataStatus } = useSelector((state: RootState) => state.fuelData);
  const { fuelPerformanceStatus } = useSelector(
    (state: RootState) => state.fuelPerformance
  );
  const { lastFuelReportStatus } = useSelector(
    (state: RootState) => state.lastFuelReport
  );

  useEffect(() => {
    if (
      fuelDataStatus === SERVICE_STATUS.failed &&
      isAuthenticated &&
      startDate &&
      endDate &&
      imei.length > 10
    ) {
      setTimeout(() => {
        dispatch(
          fetchFuelData({
            imei: imei, // imei.toString(),
            startDate: formatToLocalIso8601(startDate), // formatToLocalIso8601(startDate),
            endDate: formatToLocalIso8601(endDate),
            logoutState,
          })
        );
      }, 5000);
    }
  }, [fuelDataStatus, isAuthenticated, startDate, endDate, imei]);

  useEffect(() => {
    if (
      fuelPerformanceStatus === SERVICE_STATUS.failed &&
      isAuthenticated &&
      startDate &&
      endDate &&
      imei.length > 10
    ) {
      setTimeout(() => {
        dispatch(
          fetchFuelPerformance({
            imei: imei, // imei.toString(),
            startDate: formatToLocalIso8601(startDate), // formatToLocalIso8601(startDate),
            endDate: formatToLocalIso8601(endDate),
            logoutState,
          })
        );
      }, 5000);
    }
  }, [fuelPerformanceStatus, isAuthenticated, startDate, endDate, imei]);

  useEffect(() => {
    if (
      lastFuelReportStatus === SERVICE_STATUS.failed &&
      isAuthenticated &&
      startDate &&
      endDate &&
      imei.length > 10
    ) {
      setTimeout(() => {
        dispatch(
          fetchLastFuelReport({
            imei: imei, // imei.toString(),
            logoutState,
          })
        );
      }, 5000);
    }
  }, [lastFuelReportStatus, isAuthenticated, startDate, endDate, imei]);

  return null;
};
