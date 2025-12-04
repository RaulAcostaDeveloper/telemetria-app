import GeoModal from "@/global/components/geoModal/geoModal";
import { ZoneDetail } from "@/global/components/geoModal/googleMapClientComponent/googleMapClientComponent";
import { PrimitiveValue } from "@/global/components/table/table.model";
import { LanguageInterface } from "@/global/language/constants/language.model";
import { TooltipGeoField } from "@/global/utils/geoMapUtils";

interface Props {
  LANGUAGE: LanguageInterface;
  closeModal: () => void;
  dataObject: { [key: string]: PrimitiveValue };
}

export const ZoneUnloadsModal = ({
  LANGUAGE,
  closeModal,
  dataObject,
}: Props) => {
  const imgUnload = "/png/marker-gray-pump-red.png";
  //Es importante que geoModalData quede en array para el proceso de distincion en GoogleMapClientComponent
  const geoModalData = [
    {
      icon: imgUnload,
      address: dataObject.address,
      position: { lat: dataObject.lat, lng: dataObject.lng },
      id: dataObject.imeiClean as string,
      dateGps: dataObject.dateGps as string,
      initial: dataObject.initial as number,
      magnitude: dataObject.magnitude as number,
      final: dataObject.final as number,
      lat: dataObject.lat as number,
      lon: dataObject.lng as number,
      title: dataObject.address as string,
      rows: [] as TooltipGeoField[],
    },
  ];

  let foreignCenter: { lat: number; lng: number };

  let zoneCircle: ZoneDetail | undefined = undefined;

  if (dataObject.center && "string" === typeof dataObject.center) {
    const latlng = dataObject.center.split(",");
    foreignCenter = { lat: parseFloat(latlng[0]), lng: parseFloat(latlng[1]) };
    zoneCircle = {
      center: {
        lat: foreignCenter.lat,
        lng: foreignCenter.lng,
      },
      radius: dataObject.radius as number,
      color: dataObject.color as string,
      zoneName: dataObject.zoneName as string,
      zoneId: dataObject.zoneId as string,
      profileName: dataObject.profileName as string,
      country: dataObject.country as string,
      state: dataObject.state as string,
      city: dataObject.city as string,
      postalCode: dataObject.postalCode as string,
      idProfile: dataObject.idProfile as string,
      description: dataObject.description as string,
      chargeState: dataObject.chargeState as number,
      dischargeState: dataObject.dischargeState as number,
      idleState: dataObject.idleState as number,
      zoneProviderName: dataObject.zoneProviderName as string,
      zoneCategoryName: dataObject.zoneCategoryName as string,
    };
  }

  return (
    <>
      <GeoModal
        LANGUAGE={LANGUAGE}
        closeModal={closeModal}
        geoModalData={geoModalData}
        zoneCircle={zoneCircle}
      />
    </>
  );
};
