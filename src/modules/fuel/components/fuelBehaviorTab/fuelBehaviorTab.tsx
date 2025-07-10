import { useState } from "react";

import GeoModal, {
  GeoModalData,
} from "@/modules/global/components/geoModal/geoModal";
import { FuelHighChart } from "../fuelHighChart/fuelHighChart";
import { FuelMetricsValues } from "@/globalConfig/redux/slices/fuelMetricsSlice";
import { LanguageInterface } from "@/modules/global/language/constants/language.model";

interface Props {
  LANGUAGE: LanguageInterface;
  fuelMetricsData: FuelMetricsValues;
}

export const FuelBehaviorTab = ({ LANGUAGE, fuelMetricsData }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [geoModalData, setGeoModalData] = useState<GeoModalData>();

  const handleClicGeoData = (geoModalData: GeoModalData) => {
    setGeoModalData(geoModalData);
    setIsModalOpen(true);
  };

  return (
    <div>
      <FuelHighChart
        LANGUAGE={LANGUAGE}
        fuelMetricsData={fuelMetricsData}
        handleClicGeoData={handleClicGeoData}
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
