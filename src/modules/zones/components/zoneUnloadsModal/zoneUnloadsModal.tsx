import GeoModal, { GeoModalData } from "@/global/components/geoModal/geoModal";
import {
  MarkerData,
  ZoneDetail,
} from "@/global/components/geoModal/googleMapClientComponent/googleMapClientComponent";
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
  let geoModalData: GeoModalData | undefined = undefined;
  let markersData: MarkerData[] | undefined = undefined;
  //Es importante que geoModalData quede en array para el proceso de distincion en GoogleMapClientComponent

  if (dataObject.rows) {
    geoModalData = {
      lat: dataObject.lat as number,
      lon: dataObject.lng as number,
      title: LANGUAGE.zones.tabs.unloadTable.loadValue,
      rows: [] as TooltipGeoField[],
    };
  } else {
    let position: { lat: number; lng: number };
    if (dataObject.position && "string" === typeof dataObject.position) {
      const latlng = dataObject.position.split(",");
      position = { lat: parseFloat(latlng[0]), lng: parseFloat(latlng[1]) };
      markersData = [];
      //if(dataObject.address){ markersData[0].address = dataObject.address}
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
      <GeoModal
        LANGUAGE={LANGUAGE}
        closeModal={closeModal}
        geoModalData={geoModalData}
        markersData={markersData}
        zoneCircle={zoneCircle}
      />
    </>
  );
};
