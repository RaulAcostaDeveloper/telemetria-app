"use client";
import { useState } from "react";

import GeoModal, {
  GeoModalData,
} from "@/modules/global/components/geoModal/geoModal";
import {
  ObdChartPoint,
  SINGLE_CHART_TYPES,
  SingleLineHighChart,
} from "@/modules/telemetryObd/components";
import { TabsContent } from "@/modules/global/components";
import { fuelVehicleOBDDataMock } from "@/modules/global/dataMock/fuelVehicleOBD/fuelVehicleOBD";
import { useLanguage } from "@/modules/global/language/components/languageProvider/languageProvider";

interface Page {
  params: {
    id: string;
  };
}

export default function TelemetryVehicle({}: Page) {
  // const { id } = params;
  const LANGUAGE = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [geoModalData, setGeoModalData] = useState<GeoModalData>();

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

  const handleClicGeoData = (geoModalData: GeoModalData) => {
    setGeoModalData(geoModalData);
    setIsModalOpen(true);
  };

  return (
    <div>
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
          <div key={2}></div>,
          <div key={3}>
            <SingleLineHighChart
              data={distanceData}
              LANGUAGE={LANGUAGE}
              type={SINGLE_CHART_TYPES.distance}
              handleClicGeoData={handleClicGeoData}
            />
          </div>,
          <div key={4}></div>,
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
}
