"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "@/global/redux/store";
import { SERVICE_STATUS } from "@/global/redux/serviceSlices/types/serviceTypes";
import { fetchDevices } from "@/global/redux/serviceSlices/devicesSlice";
import { fetchDrivers } from "@/global/redux/serviceSlices/driversSlice";
import { fetchFuelSummary } from "@/global/redux/serviceSlices/fuelSummarySlice";
import { fetchGroups } from "@/global/redux/serviceSlices/groupsSlice";
import { fetchObdRollup } from "@/global/redux/serviceSlices/obdRollupSlice";
import { fetchTopFuelReport } from "@/global/redux/serviceSlices/topFuelReportSlice";
import { fetchVehicles } from "@/global/redux/serviceSlices/vehiclesSlice";
import { formatToLocalIso8601 } from "@/global/utils/utils";
import { useAuth } from "@/modules/auth/utils";

export const TryFetchOnFailed = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Usuario autenticado a nivel estado de la aplicación
  const { isAuthenticated, logoutState } = useAuth();

  // Datos del calendario
  const { startDate, endDate } = useSelector(
    (state: RootState) => state.calendar
  );

  const { vehiclesStatus } = useSelector((state: RootState) => state.vehicles);
  const { driversStatus } = useSelector((state: RootState) => state.drivers);
  const { devicesStatus } = useSelector((state: RootState) => state.devices);
  const { groupsStatus } = useSelector((state: RootState) => state.groups);
  const { fuelSummaryStatus } = useSelector(
    (state: RootState) => state.fuelSummary
  );
  const { topFuelReportStatus } = useSelector(
    (state: RootState) => state.topFuelReport
  );
  const { obdRollupStatus } = useSelector(
    (state: RootState) => state.obdRollup
  );

  useEffect(() => {
    if (
      fuelSummaryStatus === SERVICE_STATUS.failed &&
      isAuthenticated &&
      startDate &&
      endDate
    ) {
      setTimeout(() => {
        dispatch(
          fetchFuelSummary({
            startDate: formatToLocalIso8601(startDate), // formatToLocalIso8601(startDate),
            endDate: formatToLocalIso8601(endDate),
            logoutState,
          })
        );
      }, 5000);
    }
  }, [fuelSummaryStatus, isAuthenticated, startDate, endDate]);

  useEffect(() => {
    if (
      topFuelReportStatus === SERVICE_STATUS.failed &&
      isAuthenticated &&
      startDate &&
      endDate
    ) {
      setTimeout(() => {
        dispatch(
          fetchTopFuelReport({
            startDate: formatToLocalIso8601(startDate), // formatToLocalIso8601(startDate),
            endDate: formatToLocalIso8601(endDate),
            logoutState,
          })
        );
      }, 5000);
    }
  }, [topFuelReportStatus, isAuthenticated, startDate, endDate]);

  useEffect(() => {
    if (
      obdRollupStatus === SERVICE_STATUS.failed &&
      isAuthenticated &&
      startDate &&
      endDate
    ) {
      setTimeout(() => {
        dispatch(
          fetchObdRollup({
            startDate: formatToLocalIso8601(startDate), // formatToLocalIso8601(startDate),
            endDate: formatToLocalIso8601(endDate),
            logoutState,
          })
        );
      }, 5000);
    }
  }, [obdRollupStatus, isAuthenticated, startDate, endDate]);

  useEffect(() => {
    if (
      vehiclesStatus === SERVICE_STATUS.failed &&
      isAuthenticated &&
      startDate &&
      endDate
    ) {
      setTimeout(() => {
        dispatch(fetchVehicles(logoutState));
      }, 5000);
    }
  }, [vehiclesStatus, isAuthenticated, startDate, endDate]);

  useEffect(() => {
    if (
      driversStatus === SERVICE_STATUS.failed &&
      isAuthenticated &&
      startDate &&
      endDate
    ) {
      setTimeout(() => {
        dispatch(fetchDrivers(logoutState));
      }, 5000);
    }
  }, [driversStatus, isAuthenticated, startDate, endDate]);

  useEffect(() => {
    if (
      devicesStatus === SERVICE_STATUS.failed &&
      isAuthenticated &&
      startDate &&
      endDate
    ) {
      setTimeout(() => {
        dispatch(fetchDevices(logoutState));
      }, 5000);
    }
  }, [devicesStatus, isAuthenticated, startDate, endDate]);

  useEffect(() => {
    if (
      groupsStatus === SERVICE_STATUS.failed &&
      isAuthenticated &&
      startDate &&
      endDate
    ) {
      setTimeout(() => {
        dispatch(fetchGroups(logoutState));
      }, 5000);
    }
  }, [groupsStatus, isAuthenticated, startDate, endDate]);

  return null;
};
