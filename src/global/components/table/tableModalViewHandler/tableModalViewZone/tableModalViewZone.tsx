import { LanguageInterface } from "@/global/language/constants/language.model";
import { PrimitiveValue } from "../../table.model";
import GeoModalZone, {
  GeoZonesModalData,
} from "@/modules/zones/components/geoModalZone/geoModalZone";

interface Props {
  LANGUAGE: LanguageInterface;
  closeModal: () => void;
  dataObject: { [key: string]: PrimitiveValue };
}

export const TableModalViewZone = ({ LANGUAGE, closeModal }: Props) => {
  const geoModalData: GeoZonesModalData = {
    markersInZone: [
      {
        id: 24124312,
        position: { lat: 20.662965, lng: -103.4201 },
        title: "",
      },
      {
        id: 94537,
        position: { lat: 20.662744, lng: -103.420484 },
        title: "",
      },
    ],
    title: LANGUAGE.zones.zonesFuelTable.zoneModalTitle,
    rows: [],
  };
  return (
    <GeoModalZone
      LANGUAGE={LANGUAGE}
      closeModal={closeModal}
      geoModalData={geoModalData}
      height={600}
      width={600}
    />
  );
};
