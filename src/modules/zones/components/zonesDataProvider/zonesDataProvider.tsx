"use client";
import { useCallback, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";

import { LocalGasStation } from "@mui/icons-material";

import { Table, TabsContent } from "@/global/components";
import { DataErrorHandler } from "@/global/components/DataErrorHandler/DataErrorHandler";
import {
  columnsTable,
  MODAL_OPTION,
} from "@/global/components/table/table.model";
import { RootState } from "@/global/redux/store";
import {
  Charges,
  Discharges,
} from "@/global/redux/serviceSlices/fuelSummarySlice";
import { useLanguage } from "@/global/language/components/languageProvider/languageProvider";
import { ZoneProfileData } from "../zoneProfileData/zoneProfileData";
import { ZonesMapTabSolo } from "../zonesMapTabSolo/zonesMapTabSolo";
import { formatDateTime } from "@/global/utils/dateUtils";
import { omitProperty } from "@/global/utils/objectUtils";
import { MarkerData } from "@/global/components/geoModal/googleMapClientComponent/googleMapClientComponent";

import styles from "./zonesDataProvider.module.css";
import { Collapsable } from "@/global/components/collapsable/collapsable";

interface Props {
  zoneId: string;
}

interface ZoneCircleNoId {
  center: {
    lat: number | undefined;
    lng: number | undefined;
  };
  chargeState: number | undefined;
  city: string | undefined;
  color: string | undefined;
  country: string | undefined;
  description: string | undefined;
  dischargeState: number | undefined;
  idleState: number | undefined;
  idProfile: string | undefined;
  postalCode: string | undefined;
  profileName: string | undefined;
  radius: number | undefined;
  state: string | undefined;
  zoneCategoryName: string | undefined;
  zoneName: string | undefined;
  zoneProviderName: string | undefined;
}

// google maps utiliza "lng" en vez de "lon"
interface ChargesVarLng extends ZoneCircleNoId, Omit<Charges, "lon"> {
  lng: number;
}

// google maps utiliza "lng" en vez de "lon"
interface DischargesVarLng extends ZoneCircleNoId, Omit<Discharges, "lon"> {
  lng: number;
}

// Para meter a un genérico los argumentos que comparten zoneId.
type WithZoneId = { zoneId: string };

//zoneId de fuelSummary
export const ZonesDataProvider = ({ zoneId }: Props) => {
  const LANGUAGE = useLanguage();
  const [isProfileDataOpen, setIsProfileDataOpen] = useState<boolean>(true);
  const hasRunRef = useRef(false);

  const { fuelSummaryData, fuelSummaryStatus } = useSelector(
    (state: RootState) => state.fuelSummary
  );

  const { zoneDetailsData, zoneDetailsStatus } = useSelector(
    (state: RootState) => state.zoneDetails
  );

  function findWithZoneId<T extends WithZoneId>(arrObj: T[]): T[] | undefined {
    return arrObj.filter((v) => v.zoneId === zoneId);
  }

  const zoneTabs = [
    {
      text: LANGUAGE.zones.tabs.load,
      icon: LocalGasStation,
      iconStyle: { color: "rgb(4,187,4)" },
    },
    {
      text: LANGUAGE.zones.tabs.unload,
      icon: LocalGasStation,
      iconStyle: { color: "rgb(223,44,59)" },
    },
  ];

  const loadsZoneColumns: columnsTable = [
    {
      columnName: LANGUAGE.zones.tabs.loadTable.vehicleId,
      defaultSpace: 4,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.zones.tabs.loadTable.date,
      defaultSpace: 4,
      orderColumn: true,
    },
    {
      columnName: `${LANGUAGE.fuelVehicle.vehicleReports.fuelStart} (L)`,
      defaultSpace: 3,
      orderColumn: true,
      minMaxFilter: true,
    },
    {
      columnName: `${LANGUAGE.zones.tabs.loadTable.loadValue} (L)`,
      defaultSpace: 3,
      orderColumn: true,
      minMaxFilter: true,
    },
    {
      columnName: `${LANGUAGE.fuelVehicle.vehicleReports.fuelEnd} (L)`,
      defaultSpace: 3,
      orderColumn: true,
      minMaxFilter: true,
    },
  ];

  const handleDischargesRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node) return;

      if (hasRunRef.current) {
        // ya se ejecutó una vez
        return;
      }

      hasRunRef.current = true;
      setIsProfileDataOpen(false);
    },
    [setIsProfileDataOpen]
  );

  const zoneCircle = useMemo(() => {
    const zoneD = zoneDetailsData?.value;
    return {
      center: { lat: zoneD?.lat, lng: zoneD?.lon },
      radius: zoneD?.radioZone,
      color: zoneD?.color,
      zoneName: zoneD?.zoneName,
      zoneId: zoneD?.zoneId,
      profileName: zoneD?.profileName,
      country: zoneD?.country,
      state: zoneD?.state,
      city: zoneD?.city,
      postalCode: zoneD?.postalCode,
      idProfile: zoneD?.idProfile,
      description: zoneD?.description,
      chargeState: zoneD?.chargeState,
      dischargeState: zoneD?.dischargeState,
      idleState: zoneD?.idleState,
      zoneProviderName: zoneD?.zoneProviderName,
      zoneCategoryName: zoneD?.zoneCategoryName,
    };
  }, [zoneDetailsData]);

  const loadsSummary = useMemo(() => {
    return fuelSummaryData?.value?.charges.map((v) => {
      const zoneCircleNoId: ZoneCircleNoId = omitProperty(zoneCircle, "zoneId");

      return {
        address: v.address,
        dateGps: formatDateTime(v.dateGps),
        deviceBattery: v.deviceBattery,
        endDate: v.endDate,
        eventId: v.eventId,
        finalFuel: v.finalFuel,
        idIndexEvent: v.idIndexEvent,
        ignition: v.ignition,
        imei: v.imei,
        imeiClean: v.imeiClean,
        initialFuel: v.initialFuel,
        lat: v.lat,
        lng: v.lon,
        magnitude: v.magnitude,
        mainPower: v.mainPower,
        odometer: v.odometer,
        origin: v.origin,
        speed: v.speed,
        startDate: v.startDate,
        zoneId: v.zoneId,
        ...zoneCircleNoId,
      };
    });
  }, [fuelSummaryData, zoneCircle]);

  const loadsSingle: ChargesVarLng[] | undefined =
    loadsSummary && findWithZoneId(loadsSummary);

  // El orden de propiedades en forTableLoads será el usado en la tabla.
  const forTableLoads = useMemo(() => {
    return loadsSingle?.map((v) => ({
      imei: v.imei,
      dateGps: v.dateGps,
      initialFuel: v.initialFuel,
      magnitude: v.magnitude,
      finalFuel: v.finalFuel,

      address: v.address,
      imeiClean: v.imeiClean,
      position: `${v.lat},${v.lng}`,
      //Datos de zona
      center: `${v.center.lat},${v.center.lng}`, //si el formato solo acepta llave:valor, llave:valor le damos.
      color: v.color,
      radius: v.radius,
      zoneName: v.zoneName,
    }));
  }, [loadsSingle]);

  const unloadsZoneColumns: columnsTable = [
    {
      columnName: LANGUAGE.zones.tabs.unloadTable.vehicleId,
      defaultSpace: 4,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.zones.tabs.unloadTable.date,
      defaultSpace: 4,
      orderColumn: true,
    },
    {
      columnName: `${LANGUAGE.fuelVehicle.vehicleReports.fuelStart} (L)`,
      defaultSpace: 3,
      orderColumn: true,
      minMaxFilter: true,
    },
    {
      columnName: `${LANGUAGE.zones.tabs.unloadTable.loadValue} (L)`,
      defaultSpace: 3,
      orderColumn: true,
      minMaxFilter: true,
    },
    {
      columnName: `${LANGUAGE.fuelVehicle.vehicleReports.fuelEnd} (L)`,
      defaultSpace: 3,
      orderColumn: true,
      minMaxFilter: true,
    },
  ];

  const unloadsSummary = useMemo(() => {
    return fuelSummaryData?.value?.discharges.map((v) => {
      const zoneCircleNoId: ZoneCircleNoId = omitProperty(zoneCircle, "zoneId");

      return {
        address: v.address,
        dateGps: v.dateGps,
        deviceBattery: v.deviceBattery,
        endDate: v.endDate,
        eventId: v.eventId,
        finalFuel: v.finalFuel,
        idIndexEvent: v.idIndexEvent,
        ignition: v.ignition,
        imei: v.imei,
        imeiClean: v.imeiClean,
        initialFuel: v.initialFuel,
        lat: v.lat,
        lng: v.lon,
        magnitude: v.magnitude,
        mainPower: v.mainPower,
        odometer: v.odometer,
        origin: v.origin,
        speed: v.speed,
        startDate: v.startDate,
        zoneId: v.zoneId,
        ...zoneCircleNoId,
      };
    });
  }, [fuelSummaryData, zoneCircle]);

  const unloadsSingle: DischargesVarLng[] | undefined =
    unloadsSummary && findWithZoneId(unloadsSummary);

  // El orden de propiedades en forTableLoads será el usado en la tabla.
  const forTableUnloads = useMemo(() => {
    return unloadsSingle?.map((v) => ({
      imei: v.imei,
      dateGps: v.dateGps,
      initialFuel: v.initialFuel,
      magnitude: v.magnitude,
      finalFuel: v.finalFuel,

      address: v.address,
      imeiClean: v.imeiClean,
      position: `${v.lat},${v.lng}`,
      //Datos de zona
      center: `${v.center.lat},${v.center.lng}`, //si el formato solo acepta llave:valor, llave:valor le damos.
      color: v.color,
      radius: v.radius,
      zoneName: v.zoneName,
    }));
  }, [unloadsSingle]);

  let formatedMarkersLoads: MarkerData[] = [];
  if (loadsSingle) {
    const imgLoad = "/png/marker-gray-pump-green.png";
    formatedMarkersLoads = loadsSingle.map((v) => ({
      id: v.idIndexEvent as string,
      icon: imgLoad,
      position: { lat: v.lat, lng: v.lng },
      title: LANGUAGE.zones.tabs.loadTable.loadValue,
      address: v.address,
      magnitude: v.magnitude,
    }));
  }

  let formatedMarkersUnloads: MarkerData[] = [];
  if (unloadsSingle) {
    const imgUnload = "/png/marker-gray-pump-red.png";
    formatedMarkersUnloads = unloadsSingle.map((v) => ({
      id: v.idIndexEvent as string,
      icon: imgUnload,
      position: { lat: v.lat, lng: v.lng },
      title: LANGUAGE.zones.tabs.loadTable.loadValue,
      address: v.address,
      magnitude: v.magnitude,
    }));
  }

  const allMarkers = [...formatedMarkersLoads, ...formatedMarkersUnloads];

  return (
    <div className={styles.zonesDataProvider}>
      {zoneDetailsData?.value && zoneDetailsStatus && (
        <ZoneProfileData
          LANGUAGE={LANGUAGE}
          id={zoneId}
          zoneDetailsData={zoneDetailsData.value}
          isProfileDataOpen={isProfileDataOpen}
          setIsProfileDataOpen={setIsProfileDataOpen}
        />
      )}

      <DataErrorHandler
        LANGUAGE={LANGUAGE}
        hasData={!!zoneDetailsData?.value}
        infoStatus={zoneDetailsStatus}
      />

      <div className={styles.separator}>
        <Collapsable LANGUAGE={LANGUAGE} title={LANGUAGE.zones.tabs.map}>
          <div className={["containertabmap", styles.container].join(" ")}>
            <ZonesMapTabSolo
              LANGUAGE={LANGUAGE}
              markersInZone={allMarkers}
              zoneCircle={zoneCircle}
            />
          </div>
        </Collapsable>
      </div>

      <TabsContent
        tabOptions={zoneTabs}
        tabContents={[
          <div key={0}>
            {loadsSingle && forTableLoads && (
              <Table
                LANGUAGE={LANGUAGE}
                columns={loadsZoneColumns}
                data={forTableLoads}
                idKey="imei"
                idImei="imeiClean"
                showViewModal
                modalOption={MODAL_OPTION.ZONELOAD}
              />
            )}

            <DataErrorHandler
              LANGUAGE={LANGUAGE}
              hasData={!!loadsSingle}
              infoStatus={fuelSummaryStatus}
            />
          </div>,
          <div key={1}>
            <div ref={handleDischargesRef}>
              {unloadsSingle && forTableUnloads && (
                <Table
                  LANGUAGE={LANGUAGE}
                  columns={unloadsZoneColumns}
                  data={forTableUnloads}
                  idKey="imei"
                  idImei="imeiClean"
                  showViewModal
                  modalOption={MODAL_OPTION.ZONEUNLOAD}
                />
              )}

              <DataErrorHandler
                LANGUAGE={LANGUAGE}
                hasData={!!unloadsSingle}
                infoStatus={fuelSummaryStatus}
              />
            </div>
          </div>,
        ]}
      />
    </div>
  );
};
