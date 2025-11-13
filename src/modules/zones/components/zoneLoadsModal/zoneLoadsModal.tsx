import GeoModal, { GeoModalData } from "@/global/components/geoModal/geoModal";
import { PrimitiveValue } from "@/global/components/table/table.model";
import { LanguageInterface } from "@/global/language/constants/language.model";

interface Props {
  LANGUAGE: LanguageInterface;
  closeModal: () => void;
  dataObject: { [key: string]: PrimitiveValue };
}

export const ZoneLoadsModal = ({ LANGUAGE, closeModal, dataObject }: Props) => {
  //TODO: convertir dataObject a geoModalData

  return (
    <>
      <GeoModal
        LANGUAGE={LANGUAGE}
        closeModal={closeModal}
        geoModalData={dataObject}
      />
    </>
  );
};
