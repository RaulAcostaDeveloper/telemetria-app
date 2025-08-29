"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import GeoModal, {
  GeoModalData,
} from "@/modules/global/components/geoModal/geoModal";
import LoaderAnimation from "@/modules/global/components/loaderAnimation/loaderAnimation";
import styles from "./obdReportDataProvider.module.css";
import {
  ObdAnalysisTab,
  ObdChartPoint,
  SINGLE_CHART_TYPES,
  SingleLineHighChart,
} from "@/modules/telemetryObd/components";
import { AppDispatch, RootState } from "@/globalConfig/redux/store";
import { ErrorMessage } from "@/modules/global/components/errorMessage/errorMessage";
import { TabsContent } from "@/modules/global/components";
import { fetchObdTravelMetrics } from "@/globalConfig/redux/slices/obdTravelMetricsSlice";
import { fetchVehicleByImei } from "@/globalConfig/redux/slices/vehicleByImeiSlice";
import { useAuth } from "@/modules/auth/utils";
import { useLanguage } from "@/modules/global/language/components/languageProvider/languageProvider";

interface Props {
  imei: string;
}

export const ObdReportDataProvider = ({ imei }: Props) => {
  const LANGUAGE = useLanguage();

  const dispatch = useDispatch<AppDispatch>();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [geoModalData, setGeoModalData] = useState<GeoModalData>();
  const [rpmData, setRpmData] = useState<ObdChartPoint[]>([]);
  const [driverDistanceData, setDriverDistanceData] = useState<ObdChartPoint[]>(
    []
  );
  const [driverTime, setDriverTimeData] = useState<ObdChartPoint[]>([]);

  const { isAuthenticated } = useAuth();

  const { startDate, endDate } = useSelector(
    (state: RootState) => state.calendar
  );

  const { obdTravelMetricsData, obdTravelMetricsStatus } = useSelector(
    (state: RootState) => state.obdTravelMetrics
  );

  const tabOptions = [
    LANGUAGE.onBoardDiagnosticsVehicle.tabs.averageRpm,
    LANGUAGE.onBoardDiagnosticsVehicle.tabs.analysis,
    LANGUAGE.onBoardDiagnosticsVehicle.tabs.totalDistance,
    LANGUAGE.onBoardDiagnosticsVehicle.tabs.totalTimeWorked,
  ];

  const handleClicGeoData = (geoModalData: GeoModalData) => {
    setGeoModalData(geoModalData);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (isAuthenticated && imei && imei.length > 3) {
      dispatch(fetchVehicleByImei({ imei: imei }));
    }
  }, [dispatch, isAuthenticated, imei]);

  useEffect(() => {
    if (isAuthenticated && startDate && endDate) {
      dispatch(
        fetchObdTravelMetrics({
          deviceId: "862524060822760", // imei.toString(),
          startDate: "2025-07-17T00:00:00", // formatToLocalIso8601(startDate),
          endDate: "2025-10-21T00:00:00", // formatToLocalIso8601(endDate), "2024-09-07T00:00:00"
        })
      );
    }
  }, [dispatch, isAuthenticated, startDate, endDate, imei]);

  useEffect(() => {
    if (obdTravelMetricsData) {
      const dataRpm: ObdChartPoint[] =
        obdTravelMetricsData.value.timeTraveledDetails
          .map((c) => ({
            x: new Date(c.dateGPS).getTime(),
            y: c.rpm ?? 0,
            custom: {
              dateGps: c.dateGPS,
              lat: c.lat,
              lon: c.lon,
              value: c.rpm ?? "NA",
            },
          }))
          .sort((a, b) => a.x - b.x);
      setRpmData(dataRpm);

      const dataDriverDistance: ObdChartPoint[] =
        obdTravelMetricsData.value.timeTraveledDetails
          .map((c) => ({
            x: new Date(c.dateGPS).getTime(),
            y: c.driverDistance ?? 0,
            custom: {
              dateGps: c.dateGPS,
              lat: c.lat,
              lon: c.lon,
              value: c.driverDistance ?? "NA",
            },
          }))
          .sort((a, b) => a.x - b.x);
      setDriverDistanceData(dataDriverDistance);

      const dataDriverTime: ObdChartPoint[] =
        obdTravelMetricsData.value.timeTraveledDetails
          .map((c) => ({
            x: new Date(c.dateGPS).getTime(),
            y: c.driverTime ?? 0,
            custom: {
              dateGps: c.dateGPS,
              lat: c.lat,
              lon: c.lon,
              value: c.driverTime ?? "NA",
            },
          }))
          .sort((a, b) => a.x - b.x);
      setDriverTimeData(dataDriverTime);
    }
  }, [obdTravelMetricsData]);

  return (
    <div className={styles.container}>
      <TabsContent
        tabOptions={tabOptions}
        tabContents={[
          <div key={1}>
            {obdTravelMetricsStatus === "succeeded" && rpmData && (
              <SingleLineHighChart
                chartData={rpmData}
                LANGUAGE={LANGUAGE}
                type={SINGLE_CHART_TYPES.rpm}
                handleClicGeoData={handleClicGeoData}
              />
            )}

            {obdTravelMetricsStatus === "loading" && (
              <div>
                <LoaderAnimation />
              </div>
            )}

            {obdTravelMetricsStatus === "failed" && (
              <ErrorMessage LANGUAGE={LANGUAGE} />
            )}
          </div>,
          <div key={2}>
            {obdTravelMetricsStatus === "succeeded" && obdTravelMetricsData && (
              <ObdAnalysisTab
                LANGUAGE={LANGUAGE}
                obdAnalyticsData={obdTravelMetricsData.value}
              />
            )}

            {obdTravelMetricsStatus === "loading" && (
              <div>
                <LoaderAnimation />
              </div>
            )}

            {obdTravelMetricsStatus === "failed" && (
              <ErrorMessage LANGUAGE={LANGUAGE} />
            )}
          </div>,
          <div key={3}>
            {obdTravelMetricsStatus === "succeeded" && driverDistanceData && (
              <SingleLineHighChart
                chartData={driverDistanceData}
                LANGUAGE={LANGUAGE}
                type={SINGLE_CHART_TYPES.distance}
                handleClicGeoData={handleClicGeoData}
              />
            )}

            {obdTravelMetricsStatus === "loading" && (
              <div>
                <LoaderAnimation />
              </div>
            )}

            {obdTravelMetricsStatus === "failed" && (
              <ErrorMessage LANGUAGE={LANGUAGE} />
            )}
          </div>,
          <div key={4}>
            {obdTravelMetricsStatus === "succeeded" && driverTime && (
              <SingleLineHighChart
                chartData={driverTime}
                LANGUAGE={LANGUAGE}
                type={SINGLE_CHART_TYPES.timeTraveled}
                handleClicGeoData={handleClicGeoData}
              />
            )}

            {obdTravelMetricsStatus === "loading" && (
              <div>
                <LoaderAnimation />
              </div>
            )}

            {obdTravelMetricsStatus === "failed" && (
              <ErrorMessage LANGUAGE={LANGUAGE} />
            )}
          </div>,
        ]}
      />
      {isModalOpen && geoModalData && (
        <GeoModal
          LANGUAGE={LANGUAGE}
          closeModal={() => setIsModalOpen(false)}
          geoModalData={geoModalData}
        />
      )}
    </div>
  );
};
