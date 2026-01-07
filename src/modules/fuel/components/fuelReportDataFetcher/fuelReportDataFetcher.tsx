"use client";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchFuelData,
  resetfuelDataSlice,
} from "@/global/redux/serviceSlices/fuelDataSlice";
import {
  fetchFuelPerformance,
  resetfuelPerformanceSlice,
} from "@/global/redux/serviceSlices/fuelPerformanceSlice";
import {
  fetchLastFuelReport,
  resetLastFuelReportSlice,
} from "@/global/redux/serviceSlices/lastFuelReportSlice";
import { AppDispatch, RootState } from "@/global/redux/store";
import { SERVICE_STATUS } from "@/global/redux/serviceSlices/types/serviceTypes";
import { TryFuelReportOnFailed } from "./tryFuelReportOnFailed/tryFuelReportOnFailed";
import { formatToLocalIso8601 } from "@/global/utils/dateUtils";
import { useAuth } from "@/modules/auth/utils";

interface Props {
  imei: string;
  isFuelNowSyncronizing: boolean;
}

export const FuelReportDataFetcher = ({
  imei,
  isFuelNowSyncronizing,
}: Props) => {
  const fuelNowIntervalRef = useRef<number | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  const { isAuthenticated, logoutState } = useAuth();

  const { startDate, endDate } = useSelector(
    (state: RootState) => state.calendar
  );

  const { lastFuelReportStatus } = useSelector(
    (state: RootState) => state.lastFuelReport
  );

  useEffect(() => {
    return () => {
      // Reiniciar el estado al desmontar
      dispatch(resetLastFuelReportSlice());
      dispatch(resetfuelDataSlice());
      dispatch(resetfuelPerformanceSlice());
    };
  }, []);

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
    // Controla la ejecución del intervalo
    if (isFuelNowSyncronizing) {
      startFuelNowInterval(isAuthenticated, lastFuelReportStatus);
    } else {
      stopFuelNowInterval();
    }

    return () => {
      stopFuelNowInterval();
    };
  }, [isFuelNowSyncronizing, isAuthenticated, lastFuelReportStatus]);

  const startFuelNowInterval = (
    isAuthenticated: boolean,
    lastFuelReportStatus: SERVICE_STATUS
  ) => {
    if (fuelNowIntervalRef.current) return; // Si ya existe, no iniciarlo

    if (typeof window !== "undefined") {
      fuelNowIntervalRef.current = window.setInterval(() => {
        if (
          isAuthenticated &&
          imei.length > 10 &&
          // Si el anterior llamado es succeeded entonces continúa la ejecución
          // Si el anterior llamado no es succeeded, deja que haga el <TryFuel
          lastFuelReportStatus === SERVICE_STATUS.succeeded
        ) {
          dispatch(
            fetchLastFuelReport({
              imei: imei,
              logoutState,
            })
          );
        }
      }, 20000);
    }
  };

  const stopFuelNowInterval = () => {
    if (fuelNowIntervalRef.current) {
      // Si existe, detenerlo
      clearInterval(fuelNowIntervalRef.current);
      fuelNowIntervalRef.current = null;
    }
  };

  return <TryFuelReportOnFailed imei={imei} />;
};
