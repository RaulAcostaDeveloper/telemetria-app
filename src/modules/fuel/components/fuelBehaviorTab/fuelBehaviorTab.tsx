import { useState } from "react";

import GeoModal, {
  GeoModalData,
} from "@/modules/global/components/geoModal/geoModal";
import { FuelBehaviorHighChart } from "../FuelBehaviorHighChart/FuelBehaviorHighChart";
import { FuelDataValues } from "@/globalConfig/redux/slices/fuelDataSlice";
import { LanguageInterface } from "@/modules/global/language/constants/language.model";
import { OBValue } from "@/app/(pages)/(restricted)/fuel/vehicle/[imei]/page";

interface Props {
  LANGUAGE: LanguageInterface;
  fuelDataData: FuelDataValues;
  opBEngineOff: OBValue[];
  opBEngineOffCoasting: OBValue[];
  opBEngineOnIdle: OBValue[];
  opBEngineOnMoving: OBValue[];
}

export const FuelBehaviorTab = ({
  LANGUAGE,
  fuelDataData,
  opBEngineOff,
  opBEngineOffCoasting,
  opBEngineOnIdle,
  opBEngineOnMoving,
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
        opBEngineOff={opBEngineOff}
        opBEngineOffCoasting={opBEngineOffCoasting}
        opBEngineOnIdle={opBEngineOnIdle}
        opBEngineOnMoving={opBEngineOnMoving}
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
