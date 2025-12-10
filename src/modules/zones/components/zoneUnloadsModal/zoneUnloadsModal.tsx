import {
  MarkerData,
  ZoneDetail,
} from "../geoModalZone/googleMaps/googleMapClientComponentZone/googleMapClientComponentZone";
import { PrimitiveValue } from "@/global/components/table/table.model";
import { LanguageInterface } from "@/global/language/constants/language.model";
import GeoModalZone from "../geoModalZone/geoModalZone";

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
  let markersData: MarkerData[] | undefined = undefined;
  let position: { lat: number; lng: number };

  if (dataObject.position && "string" === typeof dataObject.position) {
    const latlng = dataObject.position.split(",");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    position = { lat: parseFloat(latlng[0]), lng: parseFloat(latlng[1]) };
    markersData = [
      {
        address: dataObject.address as string,
        dateGps: dataObject.dateGps as string,
        finalFuel: dataObject.finalFuel as number,
        icon: imgUnload,
        id: dataObject.imeiClean as number | string,
        initialFuel: dataObject.initialFuel as number,
        magnitude: dataObject.magnitude as number,
        position: {
          lat: dataObject.lat as number,
          lng: dataObject.lng as number,
        },
        title: LANGUAGE.zones.tabs.unloadTable.loadValue,
      },
    ];
  }

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
      <GeoModalZone
        LANGUAGE={LANGUAGE}
        closeModal={closeModal}
        markersData={markersData}
        zoneCircle={zoneCircle}
        height={720}
        width={800}
      />
    </>
  );
};
