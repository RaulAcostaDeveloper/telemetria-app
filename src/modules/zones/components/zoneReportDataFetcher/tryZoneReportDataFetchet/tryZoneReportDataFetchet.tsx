"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "@/global/redux/store";
import { SERVICE_STATUS } from "@/global/redux/serviceSlices/types/serviceTypes";
import { fetchZoneDetails } from "@/global/redux/serviceSlices/zoneDetails";
import { useAuth } from "@/modules/auth/utils";

interface Props {
  id: string;
}

export const TryZoneReportOnFailed = ({ id }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const { isAuthenticated, logoutState } = useAuth();
  const { zoneDetailsStatus } = useSelector(
    (state: RootState) => state.zoneDetails
  );

  useEffect(() => {
    if (zoneDetailsStatus === SERVICE_STATUS.failed && isAuthenticated && id) {
      setTimeout(() => {
        dispatch(
          fetchZoneDetails({
            id: id.toString(),
            logoutState,
          })
        );
      }, 5000);
    }
  }, [zoneDetailsStatus, isAuthenticated, id]);

  return null;
};
