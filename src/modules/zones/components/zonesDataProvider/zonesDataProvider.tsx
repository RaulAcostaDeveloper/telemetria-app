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
import { z0n3sD4t4M0ck } from "@/global/dataMock/z0n3sD4t4M0ck";

import styles from "./zonesDataProvider.module.css";

interface Props {
  zoneId: string;
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
      defaultSpace: 2,
      orderColumn: true,
      minMaxFilter: true,
    },
  ];

  const loadsSummary = useMemo(() => {
    return fuelSummaryData?.value?.charges.map((v) => ({
      address: v.address,
      dateGps: v.dateGps,
      deviceBattery: v.deviceBattery,
      endDate: v.endDate,
      eventId: v.eventId,
      finalFuel: v.finalFuel,
      ignition: v.ignition,
      imei: v.imei,
      initialFuel: v.initialFuel,
      lat: v.lat,
      lon: v.lon,
      magnitude: v.magnitude,
      mainPower: v.mainPower,
      odometer: v.odometer,
      origin: v.origin,
      speed: v.speed,
      startDate: v.startDate,
      zoneId: v.zoneId,
    }));
  }, [fuelSummaryData]);

  const loadsSingle: Charges[] | undefined =
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
      defaultSpace: 2,
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
      ignition: v.ignition,
      imei: v.imei,
      initialFuel: v.initialFuel,
      lat: v.lat,
      lon: v.lon,
      magnitude: v.magnitude,
      mainPower: v.mainPower,
      odometer: v.odometer,
      speed: v.speed,
      startDate: v.startDate,
      zoneId: v.zoneId,
    }));
  }, [fuelSummaryData]);

  const unloadsSingle: Discharges[] | undefined =
    unloadsSummary && findWithZoneId(unloadsSummary);

  if (unloadsSingle) {
    forTableUnloads = unloadsSingle.map((v) => ({
      imei: v.imei,
      dateGps: v.dateGps,
      magnitude: v.magnitude,
    }));
  }

  // Lo usaré de referencia para el mapa, lo borro en la tarea correspondiente.
  const allZoneData = useMemo(() => {
    return z0n3sD4t4M0ck[1];
  }, []);

  const allZoneDataLoads: dataTable = useMemo(() => {
    return allZoneData.loads?.map((v) => ({
      id: v.vehicleId,
      date: formatDateTime(v.date),
      loadValue: v.loadValue,
      lat: v.singlePointInfo.lat,
      lng: v.singlePointInfo.lng,
      title: v.singlePointInfo.title,
    }));
  }, []);

  const allZoneDataUnloads: dataTable = useMemo(() => {
    return allZoneData.unloads?.map((v) => ({
      id: v.vehicleId,
      date: formatDateTime(v.date),
      loadValue: v.loadValue,
      lat: v.singlePointInfo.lat,
      lng: v.singlePointInfo.lng,
      title: v.singlePointInfo.title,
    }));
  }, []);

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
              <ZonesMapTabSolo
                LANGUAGE={LANGUAGE}
                markersInZone={allZoneData.markersInZone}
              />
            </div>
          </div>,
        ]}
      />
    </div>
  );
};
