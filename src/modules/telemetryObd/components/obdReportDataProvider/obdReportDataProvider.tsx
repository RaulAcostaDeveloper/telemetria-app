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
import { TabsContent } from "@/modules/global/components";
import { fetchObdTravelMetrics } from "@/globalConfig/redux/slices/obdTravelMetrics";
import { fetchVehicleByImei } from "@/globalConfig/redux/slices/vehicleByImeiSlice";
import { fuelVehicleOBDDataMock } from "@/modules/global/dataMock/fuelVehicleOBD/fuelVehicleOBD";
import { obdAnalyticsDataMock } from "@/modules/global/dataMock/obdAnalysis/obdAnalysis";
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
  const { isAuthenticated } = useAuth();

  const { startDate, endDate } = useSelector(
    (state: RootState) => state.calendar
  );

  // const { obdTravelMetricsData, obdTravelMetricsStatus } = useSelector(
  //   (state: RootState) => state.obdTravelMetrics
  // );

  const tabOptions = [
    LANGUAGE.onBoardDiagnosticsVehicle.tabs.averageRpm,
    LANGUAGE.onBoardDiagnosticsVehicle.tabs.analysis,
    LANGUAGE.onBoardDiagnosticsVehicle.tabs.totalDistance,
    LANGUAGE.onBoardDiagnosticsVehicle.tabs.totalTimeWorked,
  ];

  const RPMData: ObdChartPoint[] = fuelVehicleOBDDataMock.value.averageRPM.map(
    (rpm) => ({
      ...rpm,
      value: rpm.rpm,
    })
  );

  const distanceData: ObdChartPoint[] =
    fuelVehicleOBDDataMock.value.distance.map((distance) => ({
      ...distance,
      value: distance.distance,
    }));

  const timeTraveledData: ObdChartPoint[] =
    fuelVehicleOBDDataMock.value.timeTraveled.map((timeTraveled) => ({
      ...timeTraveled,
      value: timeTraveled.hours,
    }));

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

  return (
    <div className={styles.container}>
      <TabsContent
        tabOptions={tabOptions}
        tabContents={[
          <div key={1}>
            <SingleLineHighChart
              data={RPMData}
              LANGUAGE={LANGUAGE}
              type={SINGLE_CHART_TYPES.rpm}
              handleClicGeoData={handleClicGeoData}
            />
          </div>,
          <div key={2}>
            <ObdAnalysisTab
              LANGUAGE={LANGUAGE}
              obdAnalyticsData={obdAnalyticsDataMock}
            />
          </div>,
          <div key={3}>
            <SingleLineHighChart
              data={distanceData}
              LANGUAGE={LANGUAGE}
              type={SINGLE_CHART_TYPES.distance}
              handleClicGeoData={handleClicGeoData}
            />
          </div>,
          <div key={4}>
            <SingleLineHighChart
              data={timeTraveledData}
              LANGUAGE={LANGUAGE}
              type={SINGLE_CHART_TYPES.timeTraveled}
              handleClicGeoData={handleClicGeoData}
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
