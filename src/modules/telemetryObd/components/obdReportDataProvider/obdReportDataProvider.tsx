"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import GeoModal, { GeoModalData } from "@/global/components/geoModal/geoModal";
import styles from "./obdReportDataProvider.module.css";
import {
  ObdAnalysisTab,
  ObdChartPoint,
  SINGLE_CHART_TYPES,
  SingleLineHighChart,
} from "@/modules/telemetryObd/components";
import { DataErrorHandler } from "@/global/components/DataErrorHandler/DataErrorHandler";
import { ListAlt, Route, Speed, WorkHistory } from "@mui/icons-material";
import { NO_DATA } from "@/global/utils/ndIfEmpty";
import { RootState } from "@/global/redux/store";
import { SERVICE_STATUS } from "@/global/redux/serviceSlices/types/serviceTypes";
import { TabsContent } from "@/global/components";
import { useLanguage } from "@/global/language/components/languageProvider/languageProvider";

export const ObdReportDataProvider = () => {
  const LANGUAGE = useLanguage();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [geoModalData, setGeoModalData] = useState<GeoModalData>();
  const [rpmData, setRpmData] = useState<ObdChartPoint[]>([]);
  const [driverDistanceData, setDriverDistanceData] = useState<ObdChartPoint[]>(
    []
  );
  const [driverTime, setDriverTimeData] = useState<ObdChartPoint[]>([]);
  const [averageSpeed, setAverageSpeed] = useState<number | string>(NO_DATA);
  const [driverDistance, setDriverDistance] = useState<number | string>(
    NO_DATA
  );
  const [engineHours, setEngineHours] = useState<number | string>(NO_DATA);
  const [idleTime, setIdleTime] = useState<number | string>(NO_DATA);
  const [maxSpeed, setMaxSpeed] = useState<number | string>(NO_DATA);

  const { obdTravelMetricsData, obdTravelMetricsStatus } = useSelector(
    (state: RootState) => state.obdTravelMetrics
  );

  const { vehicleByImeiData, vehicleByImeiStatus } = useSelector(
    (state: RootState) => state.vehicleByImei
  );

  const tabOptions = [
    { text: LANGUAGE.onBoardDiagnosticsVehicle.tabs.averageRpm, icon: Speed },
    { text: LANGUAGE.onBoardDiagnosticsVehicle.tabs.analysis, icon: ListAlt },
    {
      text: LANGUAGE.onBoardDiagnosticsVehicle.tabs.totalDistance,
      icon: Route,
    },
    {
      text: LANGUAGE.onBoardDiagnosticsVehicle.tabs.totalTimeWorked,
      icon: WorkHistory,
    },
  ];

  const handleClicGeoData = (geoModalData: GeoModalData) => {
    setGeoModalData(geoModalData);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (
      obdTravelMetricsData?.value &&
      obdTravelMetricsData?.value.timeTraveledDetails.length > 0
    ) {
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
              value: c.rpm ?? NO_DATA,
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
              value: c.driverDistance ?? NO_DATA,
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
              value: c.driverTime ?? NO_DATA,
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
    } else {
      setRpmData([]);
      setDriverDistanceData([]);
      setDriverTimeData([]);
      setDriverDistance(NO_DATA);
      setEngineHours(NO_DATA);
      setIdleTime(NO_DATA);
      setMaxSpeed(NO_DATA);
      setAverageSpeed(NO_DATA);
    }
  }, [obdTravelMetricsData]);

  return (
    <div className={styles.container}>
      <TabsContent
        tabOptions={tabOptions}
        tabContents={[
          <div key={1}>
            {obdTravelMetricsStatus === SERVICE_STATUS.succeeded &&
              obdTravelMetricsData?.value &&
              obdTravelMetricsData.value.timeTraveledDetails.length > 0 && (
                <SingleLineHighChart
                  chartData={rpmData}
                  LANGUAGE={LANGUAGE}
                  type={SINGLE_CHART_TYPES.rpm}
                  handleClicGeoData={handleClicGeoData}
                />
              )}

            <DataErrorHandler
              LANGUAGE={LANGUAGE}
              hasData={
                !!obdTravelMetricsData?.value &&
                obdTravelMetricsData.value.timeTraveledDetails.length > 0
              }
              infoStatus={obdTravelMetricsStatus}
            />
          </div>,
          <div key={2}>
            {obdTravelMetricsStatus === SERVICE_STATUS.succeeded &&
              obdTravelMetricsData?.value &&
              vehicleByImeiStatus === SERVICE_STATUS.succeeded &&
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

            <DataErrorHandler
              LANGUAGE={LANGUAGE}
              hasData={!!obdTravelMetricsData?.value}
              infoStatus={obdTravelMetricsStatus}
            />
          </div>,
          <div key={3}>
            {obdTravelMetricsStatus === SERVICE_STATUS.succeeded &&
              obdTravelMetricsData?.value &&
              obdTravelMetricsData.value.timeTraveledDetails.length > 0 && (
                <SingleLineHighChart
                  chartData={driverDistanceData}
                  LANGUAGE={LANGUAGE}
                  type={SINGLE_CHART_TYPES.distance}
                  handleClicGeoData={handleClicGeoData}
                />
              )}
            <DataErrorHandler
              LANGUAGE={LANGUAGE}
              hasData={
                !!obdTravelMetricsData?.value &&
                obdTravelMetricsData.value.timeTraveledDetails.length > 0
              }
              infoStatus={obdTravelMetricsStatus}
            />
          </div>,
          <div key={4}>
            {obdTravelMetricsStatus === SERVICE_STATUS.succeeded &&
              obdTravelMetricsData?.value &&
              obdTravelMetricsData.value.timeTraveledDetails.length > 0 && (
                <SingleLineHighChart
                  chartData={driverTime}
                  LANGUAGE={LANGUAGE}
                  type={SINGLE_CHART_TYPES.timeTraveled}
                  handleClicGeoData={handleClicGeoData}
                />
              )}
            <DataErrorHandler
              LANGUAGE={LANGUAGE}
              hasData={
                !!obdTravelMetricsData?.value &&
                obdTravelMetricsData.value.timeTraveledDetails.length > 0
              }
              infoStatus={obdTravelMetricsStatus}
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
