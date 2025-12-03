"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchObdTravelMetrics,
  resetObdTravelMetricsSlice,
} from "@/global/redux/serviceSlices/obdTravelMetricsSlice";
import { AppDispatch, RootState } from "@/global/redux/store";
import { TryObdReportOnFailed } from "./tryObdReportOnFailed/tryObdReportOnFailed";
import { formatToLocalIso8601 } from "@/global/utils/dateUtils";
import { useAuth } from "@/modules/auth/utils";

interface Props {
  imei: string;
}

export const ObdReportDataFetcher = ({ imei }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const { isAuthenticated, logoutState } = useAuth();

  const { startDate, endDate } = useSelector(
    (state: RootState) => state.calendar
  );

  useEffect(() => {
    return () => {
      // Reiniciar el estado al desmontar
      dispatch(resetObdTravelMetricsSlice());
    };
  }, []);

  useEffect(() => {
    if (isAuthenticated && startDate && endDate && imei.length > 10) {
      dispatch(
        fetchObdTravelMetrics({
          imei: imei, // imei.toString(),
          startDate: formatToLocalIso8601(startDate), // formatToLocalIso8601(startDate),
          endDate: formatToLocalIso8601(endDate),
          logoutState,
        })
      );
    }
  }, [isAuthenticated, startDate, endDate, imei]);

  return <TryObdReportOnFailed imei={imei} />;
};
