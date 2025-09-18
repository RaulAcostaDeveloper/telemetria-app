import { fetchObdTravelMetrics } from "@/globalConfig/redux/slices/obdTravelMetricsSlice";
import { AppDispatch, RootState } from "@/globalConfig/redux/store";
import { useAuth } from "@/modules/auth/utils";
import { formatToLocalIso8601 } from "@/modules/global/utils/utils";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  imei: string;
}

export const TryObdReportOnFailed = ({ imei }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const { isAuthenticated } = useAuth();

  const { startDate, endDate } = useSelector(
    (state: RootState) => state.calendar
  );

  const { obdTravelMetricsStatus } = useSelector(
    (state: RootState) => state.obdTravelMetrics
  );

  useEffect(() => {
    if (
      obdTravelMetricsStatus === "failed" &&
      isAuthenticated &&
      startDate &&
      endDate &&
      imei.length > 10
    ) {
      setTimeout(() => {
        dispatch(
          fetchObdTravelMetrics({
            deviceId: "862524060822760", // imei.toString(),
            startDate: formatToLocalIso8601(startDate), // formatToLocalIso8601(startDate),
            endDate: formatToLocalIso8601(endDate),
          })
        );
      }, 5000);
    }
  }, [obdTravelMetricsStatus, isAuthenticated, startDate, endDate, imei]);

  return null;
};
