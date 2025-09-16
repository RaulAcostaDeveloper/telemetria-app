"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import GeoModal, {
  GeoModalData,
} from "@/modules/global/components/geoModal/geoModal";
import styles from "./obdReportDataProvider.module.css";
import {
  ObdAnalysisTab,
  ObdChartPoint,
  SINGLE_CHART_TYPES,
  SingleLineHighChart,
} from "@/modules/telemetryObd/components";
import { AppDispatch, RootState } from "@/globalConfig/redux/store";
import { StatusNoInfoComponent } from "@/modules/global/components/statusNoInfoComponent/statusNoInfoComponent";
import { TabsContent } from "@/modules/global/components";
import { fetchObdTravelMetrics } from "@/globalConfig/redux/slices/obdTravelMetricsSlice";
import { formatToLocalIso8601 } from "@/modules/global/utils/utils";
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
  const [averageSpeed, setAverageSpeed] = useState<number | string>("NA");
  const [driverDistance, setDriverDistance] = useState<number | string>("NA");
  const [engineHours, setEngineHours] = useState<number | string>("NA");
  const [idleTime, setIdleTime] = useState<number | string>("NA");
  const [maxSpeed, setMaxSpeed] = useState<number | string>("NA");

  const { isAuthenticated } = useAuth();

  const { startDate, endDate } = useSelector(
    (state: RootState) => state.calendar
  );

  const { obdTravelMetricsData, obdTravelMetricsStatus } = useSelector(
    (state: RootState) => state.obdTravelMetrics
  );

  const { vehicleByImeiData, vehicleByImeiStatus } = useSelector(
    (state: RootState) => state.vehicleByImei
  );

  const tabOptions = [
    { text: LANGUAGE.onBoardDiagnosticsVehicle.tabs.averageRpm },
    { text: LANGUAGE.onBoardDiagnosticsVehicle.tabs.analysis },
    { text: LANGUAGE.onBoardDiagnosticsVehicle.tabs.totalDistance },
    { text: LANGUAGE.onBoardDiagnosticsVehicle.tabs.totalTimeWorked },
  ];

  const handleClicGeoData = (geoModalData: GeoModalData) => {
    setGeoModalData(geoModalData);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (isAuthenticated && startDate && endDate) {
      dispatch(
        fetchObdTravelMetrics({
          deviceId: "862524060822760", // imei.toString(),
          startDate: formatToLocalIso8601(startDate), // formatToLocalIso8601(startDate),
          endDate: formatToLocalIso8601(endDate),
        })
      );
    }
  }, [isAuthenticated, startDate, endDate, imei]);

  useEffect(() => {
    if (obdTravelMetricsData?.value) {
      const totalEventNumber =
        obdTravelMetricsData.value.timeTraveledDetails.length;
      const lastObject =
        obdTravelMetricsData.value.timeTraveledDetails[totalEventNumber - 1];
      const firstObject = obdTravelMetricsData.value.timeTraveledDetails[0];

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

      // driverDistance
      if (lastObject.driverDistance && firstObject.driverDistance) {
        const driverDistance =
          lastObject.driverDistance - firstObject.driverDistance;
        setDriverDistance(Math.round(driverDistance * 100) / 100);
      }

      // engineHours
      if (lastObject.totalEngineHours && firstObject.totalEngineHours) {
        const engineHours =
          lastObject.totalEngineHours - firstObject.totalEngineHours;
        setEngineHours(Math.round(engineHours * 100) / 100);
      }

      // idleTime

      if (lastObject.driverIdleTime && firstObject.driverIdleTime) {
        const idleTime = lastObject.driverIdleTime - firstObject.driverIdleTime;
        setIdleTime(Math.round(idleTime * 100) / 100);
      }

      const speeds = obdTravelMetricsData.value.timeTraveledDetails
        .map((item) => (typeof item.speed === "number" ? item.speed : null))
        .filter((val): val is number => val !== null && val > 0);

      // maxSpeed
      const maxSpeed = speeds.length > 0 ? Math.max(...speeds) : 0;
      setMaxSpeed(maxSpeed);

      // averageSpeed
      const averageSpeed =
        speeds.length > 0
          ? speeds.reduce((acc, val) => acc + val, 0) / speeds.length
          : 0;
      setAverageSpeed(Math.round(averageSpeed * 100) / 100);
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

            <StatusNoInfoComponent
              LANGUAGE={LANGUAGE}
              hasData={!!rpmData}
              infoStatus={obdTravelMetricsStatus}
              messageIfEmpty={LANGUAGE.notifications.nullValue}
            />
          </div>,
          <div key={2}>
            {obdTravelMetricsStatus === "succeeded" &&
              obdTravelMetricsData?.value &&
              vehicleByImeiStatus === "succeeded" &&
              vehicleByImeiData?.value && (
                <ObdAnalysisTab
                  LANGUAGE={LANGUAGE}
                  averageSpeed={averageSpeed}
                  driverDistance={driverDistance}
                  engineHours={engineHours}
                  idleTime={idleTime}
                  maxSpeed={maxSpeed}
                  obdAnalyticsData={obdTravelMetricsData.value}
                  vehicleByImeiData={vehicleByImeiData.value}
                />
              )}

            <StatusNoInfoComponent
              LANGUAGE={LANGUAGE}
              hasData={!!obdTravelMetricsData?.value}
              infoStatus={obdTravelMetricsStatus}
              messageIfEmpty={LANGUAGE.notifications.nullValue}
            />
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
            <StatusNoInfoComponent
              LANGUAGE={LANGUAGE}
              hasData={!!driverDistanceData}
              infoStatus={obdTravelMetricsStatus}
              messageIfEmpty={LANGUAGE.notifications.nullValue}
            />
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
            <StatusNoInfoComponent
              LANGUAGE={LANGUAGE}
              hasData={!!driverTime}
              infoStatus={obdTravelMetricsStatus}
              messageIfEmpty={LANGUAGE.notifications.nullValue}
            />
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
