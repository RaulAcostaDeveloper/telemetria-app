"use client";
import { useMemo } from "react";
import { useSelector } from "react-redux";

import { LocalGasStation, Map } from "@mui/icons-material";

import { Table, TabsContent } from "@/global/components";
import { DataErrorHandler } from "@/global/components/DataErrorHandler/DataErrorHandler";
import {
  columnsTable,
  dataTable,
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
import { formatDateTime } from "@/global/utils/utils";
import { MarkerData } from "@/global/components/geoModal/googleMapClientComponent/googleMapClientComponent";

import styles from "./zonesDataProvider.module.css";

interface Props {
  zoneId: string;
}

// google maps utiliza "lng" en vez de "lon"
interface ChargesVarLng extends Omit<Charges, "lon"> {
  lng: number;
}

// google maps utiliza "lng" en vez de "lon"
interface DischargesVarLng extends Omit<Discharges, "lon"> {
  lng: number;
}

// Para meter a un genérico los argumentos que comparten zoneId.
type WithZoneId = { zoneId: string };

//zoneId de fuelSummary
export const ZonesDataProvider = ({ zoneId }: Props) => {
  const LANGUAGE = useLanguage();
  let forTableLoads: dataTable = [];
  let forTableUnloads: dataTable = [];

  const { fuelSummaryData, fuelSummaryStatus } = useSelector(
    (state: RootState) => state.fuelSummary
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
    { text: LANGUAGE.zones.tabs.map, icon: Map },
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
      columnName: `${LANGUAGE.zones.tabs.loadTable.loadValue} (L)`,
      defaultSpace: 3,
      orderColumn: true,
      minMaxFilter: true,
    },
  ];

  const loadsSummary = useMemo(() => {
    return fuelSummaryData?.value?.charges.map((v) => ({
      address: v.address,
      dateGps: formatDateTime(v.dateGps),
      deviceBattery: v.deviceBattery,
      endDate: v.endDate,
      eventId: v.eventId,
      finalFuel: v.finalFuel,
      idIndexEvent: v.idIndexEvent,
      ignition: v.ignition,
      imei: v.imei,
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
    }));
  }, [fuelSummaryData]);

  const loadsSingle: ChargesVarLng[] | undefined =
    loadsSummary && findWithZoneId(loadsSummary);

  if (loadsSingle) {
    forTableLoads = loadsSingle.map((v) => ({
      imei: v.imei,
      dateGps: v.dateGps,
      magnitude: v.magnitude,
    }));
  }

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
      columnName: `${LANGUAGE.zones.tabs.unloadTable.loadValue} (L)`,
      defaultSpace: 3,
      orderColumn: true,
      minMaxFilter: true,
    },
  ];

  const unloadsSummary = useMemo(() => {
    return fuelSummaryData?.value?.discharges.map((v) => ({
      address: v.address,
      dateGps: v.dateGps,
      deviceBattery: v.deviceBattery,
      endDate: v.endDate,
      eventId: v.eventId,
      finalFuel: v.finalFuel,
      idIndexEvent: v.idIndexEvent,
      ignition: v.ignition,
      imei: v.imei,
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
    }));
  }, [fuelSummaryData]);

  const unloadsSingle: DischargesVarLng[] | undefined =
    unloadsSummary && findWithZoneId(unloadsSummary);

  if (unloadsSingle) {
    forTableUnloads = unloadsSingle.map((v) => ({
      imei: v.imei,
      dateGps: v.dateGps,
      magnitude: v.magnitude,
    }));
  }

  let formatedMarkersLoads: MarkerData[] = [];
  if (loadsSingle) {
    formatedMarkersLoads = loadsSingle.map((v) => ({
      id: v.idIndexEvent as string,
      position: { lat: v.lat, lng: v.lng },
      title: v.address,
    }));
  }

  let formatedMarkersUnloads: MarkerData[] = [];
  if (unloadsSingle) {
    formatedMarkersUnloads = unloadsSingle.map((v) => ({
      id: v.idIndexEvent as string,
      position: { lat: v.lat, lng: v.lng },
      title: v.address,
    }));
  }

  const allMarkers = [...formatedMarkersLoads, ...formatedMarkersUnloads];

  return (
    <div className={styles.zonesDataProvider}>
      <ZoneProfileData LANGUAGE={LANGUAGE} id={zoneId} />
      <TabsContent
        tabOptions={zoneTabs}
        tabContents={[
          <div key={0}>
            {loadsSingle && (
              <Table
                LANGUAGE={LANGUAGE}
                columns={loadsZoneColumns}
                data={forTableLoads}
                idKey="imei"
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
            {unloadsSingle && (
              <Table
                LANGUAGE={LANGUAGE}
                columns={unloadsZoneColumns}
                data={forTableUnloads}
                idKey="imei"
                showViewModal
                modalOption={MODAL_OPTION.ZONEUNLOAD}
              />
            )}

            <DataErrorHandler
              LANGUAGE={LANGUAGE}
              hasData={!!unloadsSingle}
              infoStatus={fuelSummaryStatus}
            />
          </div>,
          <div key={2}>
            <div className={["containertabmap", styles.container].join(" ")}>
              <ZonesMapTabSolo LANGUAGE={LANGUAGE} markersInZone={allMarkers} />
            </div>
          </div>,
        ]}
      />
    </div>
  );
};
