"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "@/globalConfig/redux/store";
import { fetchDevices } from "@/globalConfig/redux/slices/devicesSlice";
import { fetchDrivers } from "@/globalConfig/redux/slices/driversSlice";
import { fetchFuelSummary } from "@/globalConfig/redux/slices/fuelSummarySlice";
import { fetchGroups } from "@/globalConfig/redux/slices/groupsSlice";
import { fetchObdRollup } from "@/globalConfig/redux/slices/obdRollupSlice";
import { fetchTopFuelReport } from "@/globalConfig/redux/slices/topFuelReportSlice";
import { fetchVehicles } from "@/globalConfig/redux/slices/vehiclesSlice";
import { formatToLocalIso8601 } from "../../utils/utils";
import { useAuth } from "@/modules/auth/utils";
import { TryFetchOnFailed } from "./tryFetchOnFailed/tryFetchOnFailed";

export const MainDataFetcher = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Usuario autenticado a nivel estado de la aplicación
  const { isAuthenticated, logoutState } = useAuth();

  // Datos del calendario
  const { startDate, endDate } = useSelector(
    (state: RootState) => state.calendar
  );

  // Llamado de servicios al inicio de la sesión del usuario
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchVehicles(logoutState));
      dispatch(fetchDevices(logoutState));
      dispatch(fetchDrivers(logoutState));
      dispatch(fetchGroups(logoutState));
    }
  }, [isAuthenticated]);

  // Llamado de servicios al inicio de la sesión del usuario
  useEffect(() => {
    if (isAuthenticated && startDate && endDate) {
      dispatch(
        fetchFuelSummary({
          startDate: formatToLocalIso8601(startDate), // formatToLocalIso8601(startDate),
          endDate: formatToLocalIso8601(endDate),
          logoutState,
        })
      );
      dispatch(
        fetchTopFuelReport({
          startDate: formatToLocalIso8601(startDate), // formatToLocalIso8601(startDate),
          endDate: formatToLocalIso8601(endDate),
          logoutState,
        })
      );
      dispatch(
        fetchObdRollup({
          startDate: formatToLocalIso8601(startDate), // formatToLocalIso8601(startDate),
          endDate: formatToLocalIso8601(endDate),
          logoutState,
        })
      );
    }
  }, [isAuthenticated, startDate, endDate]);

  return <TryFetchOnFailed />;
};
