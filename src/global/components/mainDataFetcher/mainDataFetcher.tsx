"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "@/global/redux/store";
import { fetchDevices } from "@/global/redux/serviceSlices/devicesSlice";
import { fetchDrivers } from "@/global/redux/serviceSlices/driversSlice";
import { fetchFuelSummary } from "@/global/redux/serviceSlices/fuelSummarySlice";
import { fetchGroups } from "@/global/redux/serviceSlices/groupsSlice";
import { fetchObdRollup } from "@/global/redux/serviceSlices/obdRollupSlice";
import { fetchTopFuelReport } from "@/global/redux/serviceSlices/topFuelReportSlice";
import { fetchVehicles } from "@/global/redux/serviceSlices/vehiclesSlice";
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
  }, [dispatch, isAuthenticated, logoutState]);

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
  }, [isAuthenticated, startDate, endDate, dispatch, logoutState]);

  return <TryFetchOnFailed />;
};
