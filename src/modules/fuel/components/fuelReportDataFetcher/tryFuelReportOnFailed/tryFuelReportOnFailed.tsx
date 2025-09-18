"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "@/globalConfig/redux/store";
import { SERVICE_STATUS } from "@/globalConfig/redux/types/serviceTypes";
import { fetchFuelData } from "@/globalConfig/redux/slices/fuelDataSlice";
import { fetchFuelPerformance } from "@/globalConfig/redux/slices/fuelPerformanceSlice";
import { fetchLastFuelReport } from "@/globalConfig/redux/slices/lastFuelReportSlice";
import { formatToLocalIso8601 } from "@/modules/global/utils/utils";
import { useAuth } from "@/modules/auth/utils";

interface Props {
  imei: string;
}

export const TryFuelReportOnFailed = ({ imei }: Props) => {
  const { isAuthenticated } = useAuth();
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
            imei: "862524060822760", // imei.toString(),
            startDate: formatToLocalIso8601(startDate), // formatToLocalIso8601(startDate),
            endDate: formatToLocalIso8601(endDate),
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
            imei: "862524060822760", // imei.toString(),
            startDate: formatToLocalIso8601(startDate), // formatToLocalIso8601(startDate),
            endDate: formatToLocalIso8601(endDate),
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
            imei: "862524060822760", // imei.toString(),
          })
        );
      }, 5000);
    }
  }, [lastFuelReportStatus, isAuthenticated, startDate, endDate, imei]);

  return null;
};
