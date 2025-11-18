"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { AppDispatch } from "@/global/redux/store";
import { TryZoneReportOnFailed } from "./tryZoneReportDataFetchet/tryZoneReportDataFetchet";
import { fetchZoneDetails } from "@/global/redux/serviceSlices/zoneDetails";
import { useAuth } from "@/modules/auth/utils";

interface Props {
  id: string;
}

export const ZonesReportDataFetcher = ({ id }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, logoutState } = useAuth();

  useEffect(() => {
    if (isAuthenticated && id) {
      dispatch(
        fetchZoneDetails({
          id: id.toString(),
          logoutState,
        })
      );
    }
  }, [isAuthenticated, id]);

  return <TryZoneReportOnFailed id={id} />;
};
