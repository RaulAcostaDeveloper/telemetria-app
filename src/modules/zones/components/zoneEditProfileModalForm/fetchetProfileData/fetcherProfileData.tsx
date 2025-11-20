"use effect";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { AppDispatch } from "@/global/redux/store";
import { fetchZoneProfileDetails } from "@/global/redux/serviceSlices/zoneProfileDetailsSlice";
import { useAuth } from "@/modules/auth/utils";

interface PropsFetcherProfileData {
  id: string;
}

export const FetcherProfileData = ({ id }: PropsFetcherProfileData) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, logoutState } = useAuth();

  useEffect(() => {
    if (id && isAuthenticated) {
      dispatch(
        fetchZoneProfileDetails({
          id, // imei.toString(),
          logoutState,
        })
      );
    }
  }, [isAuthenticated, id]);
  return null;
};
