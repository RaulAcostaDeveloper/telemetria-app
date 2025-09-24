import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "@/globalConfig/redux/store";
import { SERVICE_STATUS } from "@/globalConfig/redux/types/serviceTypes";
import { fetchObdTravelMetrics } from "@/globalConfig/redux/slices/obdTravelMetricsSlice";
import { formatToLocalIso8601 } from "@/modules/global/utils/utils";
import { useAuth } from "@/modules/auth/utils";

interface Props {
  imei: string;
}

export const TryObdReportOnFailed = ({ imei }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const { isAuthenticated, logoutState } = useAuth();

  const { startDate, endDate } = useSelector(
    (state: RootState) => state.calendar
  );

  const { obdTravelMetricsStatus } = useSelector(
    (state: RootState) => state.obdTravelMetrics
  );

  useEffect(() => {
    if (
      obdTravelMetricsStatus === SERVICE_STATUS.failed &&
      isAuthenticated &&
      startDate &&
      endDate &&
      imei.length > 10
    ) {
      setTimeout(() => {
        dispatch(
          fetchObdTravelMetrics({
            imei: imei, // imei.toString(),
            startDate: formatToLocalIso8601(startDate), // formatToLocalIso8601(startDate),
            endDate: formatToLocalIso8601(endDate),
            logoutState,
          })
        );
      }, 5000);
    }
  }, [obdTravelMetricsStatus, isAuthenticated, startDate, endDate, imei]);

  return null;
};
