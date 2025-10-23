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
  const [totalEngineHours, setTotalEngineHours] = useState<ObdChartPoint[]>([]);
  const [driverDistance, setDriverDistance] = useState<ObdChartPoint[]>([]);

  const { obdTravelMetricsData, obdTravelMetricsStatus } = useSelector(
    (state: RootState) => state.obdTravelMetrics
  );

  const { vehicleByImeiData, vehicleByImeiStatus } = useSelector(
    (state: RootState) => state.vehicleByImei
  );

  const tabOptions = [
    { text: LANGUAGE.onBoardDiagnosticsVehicle.tabs.averageRpm, icon: Speed },
    {
      text: LANGUAGE.onBoardDiagnosticsVehicle.tabs.totalDistance,
      icon: Route,
    },
    {
      text: LANGUAGE.onBoardDiagnosticsVehicle.tabs.totalTimeWorked,
      icon: WorkHistory,
    },
    { text: LANGUAGE.onBoardDiagnosticsVehicle.tabs.analysis, icon: ListAlt },
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

      const dataTotalEngineHours: ObdChartPoint[] =
        obdTravelMetricsData.value.timeTraveledDetails
          .map((c) => ({
            x: new Date(c.dateGPS).getTime(),
            y: c.totalEngineHours ?? 0,
            custom: {
              dateGps: c.dateGPS,
              lat: c.lat,
              lon: c.lon,
              value: c.totalEngineHours ?? NO_DATA,
            },
          }))
          .sort((a, b) => a.x - b.x);
      setTotalEngineHours(dataTotalEngineHours);

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
      setDriverDistance(dataDriverDistance);
    } else {
      setRpmData([]);
      setTotalEngineHours([]);
      setDriverDistance([]);
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
              obdTravelMetricsData.value.timeTraveledDetails.length > 0 && (
                <SingleLineHighChart
                  chartData={driverDistance}
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
          <div key={3}>
            {obdTravelMetricsStatus === SERVICE_STATUS.succeeded &&
              obdTravelMetricsData?.value &&
              obdTravelMetricsData.value.timeTraveledDetails.length > 0 && (
                <SingleLineHighChart
                  chartData={totalEngineHours}
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
          <div key={4}>
            {obdTravelMetricsStatus === SERVICE_STATUS.succeeded &&
              obdTravelMetricsData?.value &&
              vehicleByImeiStatus === SERVICE_STATUS.succeeded &&
              vehicleByImeiData?.value && (
                <ObdAnalysisTab
                  LANGUAGE={LANGUAGE}
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
