import GeoModal from "@/global/components/geoModal/geoModal";
import { PrimitiveValue } from "@/global/components/table/table.model";
import { LanguageInterface } from "@/global/language/constants/language.model";
import { TooltipGeoField } from "@/global/utils/geoMapUtils";

interface Props {
  LANGUAGE: LanguageInterface;
  closeModal: () => void;
  dataObject: { [key: string]: PrimitiveValue };
}

export const ZoneLoadsModal = ({ LANGUAGE, closeModal, dataObject }: Props) => {
  const geoModalData = {
    lat: dataObject.lat as number,
    lon: dataObject.lng as number,
    title: dataObject.title as string,
    rows: [] as TooltipGeoField[],
  };
  return (
    <>
      <GeoModal
        LANGUAGE={LANGUAGE}
        closeModal={closeModal}
        geoModalData={geoModalData}
      />
    </>
  );
};
