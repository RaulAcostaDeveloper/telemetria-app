import { useState } from "react";

import GeoModal, {
  GeoModalData,
} from "@/modules/global/components/geoModal/geoModal";
import { FuelBehaviorHighChart } from "../FuelBehaviorHighChart/FuelBehaviorHighChart";
import { FuelDataValues } from "@/globalConfig/redux/slices/fuelDataSlice";
import { LanguageInterface } from "@/modules/global/language/constants/language.model";
import { OperationalBehaviorValue } from "@/app/(pages)/(restricted)/fuel/vehicle/[imei]/page";

interface Props {
  LANGUAGE: LanguageInterface;
  fuelDataData: FuelDataValues;
  operationalBehaviorEngineOff: OperationalBehaviorValue[];
  operationalBehaviorEngineOffCoasting: OperationalBehaviorValue[];
  operationalBehaviorEngineOnIdle: OperationalBehaviorValue[];
  operationalBehaviorEngineOnMoving: OperationalBehaviorValue[];
}

export const FuelBehaviorTab = ({
  LANGUAGE,
  fuelDataData,
  operationalBehaviorEngineOff,
  operationalBehaviorEngineOffCoasting,
  operationalBehaviorEngineOnIdle,
  operationalBehaviorEngineOnMoving,
}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [geoModalData, setGeoModalData] = useState<GeoModalData>();

  const handleClicGeoData = (geoModalData: GeoModalData) => {
    setGeoModalData(geoModalData);
    setIsModalOpen(true);
  };

  return (
    <div>
      <FuelBehaviorHighChart
        LANGUAGE={LANGUAGE}
        fuelDataData={fuelDataData}
        handleClicGeoData={handleClicGeoData}
        operationalBehaviorEngineOff={operationalBehaviorEngineOff}
        operationalBehaviorEngineOffCoasting={
          operationalBehaviorEngineOffCoasting
        }
        operationalBehaviorEngineOnIdle={operationalBehaviorEngineOnIdle}
        operationalBehaviorEngineOnMoving={operationalBehaviorEngineOnMoving}
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
