"use client";
import { useMemo } from "react";
import { LocalGasStation, Map } from "@mui/icons-material";

import styles from "./zonesDataProvider.module.css";
import { Table, TabsContent } from "@/global/components";
import { ZoneProfileData } from "../zoneProfileData/zoneProfileData";
import { ZonesMapTabSolo } from "../zonesMapTabSolo/zonesMapTabSolo";
import {
  columnsTable,
  dataTable,
  MODAL_OPTION,
} from "@/global/components/table/table.model";
import { formatDateTime } from "@/global/utils/utils";
import { useLanguage } from "@/global/language/components/languageProvider/languageProvider";
import { z0n3sD4t4M0ck } from "@/global/dataMock/z0n3sD4t4M0ck";
import { useSelector } from "react-redux";
import { RootState } from "@/global/redux/store";
import { DataErrorHandler } from "@/global/components/DataErrorHandler/DataErrorHandler";
import {
  Charges,
  Discharges,
} from "@/global/redux/serviceSlices/fuelSummarySlice";

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
      address: v.address, //"Lomas del Seminario, Av Manuel J. Clouthier 325, Lomas de Guadalupe, 45030 Zapopan, Jal."
      dateGps: v.dateGps, //"2025-10-03T23:25:52"
      deviceBattery: v.deviceBattery, //100
      endDate: v.endDate, //"2025-10-03T23:35:01"
      eventId: v.eventId, //602
      finalFuel: v.finalFuel, //45
      ignition: v.ignition, //false
      imei: v.imei, //"862524060822760"
      initialFuel: v.initialFuel, //3
      lat: v.lat, //20.668894
      lon: v.lon, //-103.41846
      magnitude: v.magnitude, //42
      mainPower: v.mainPower, //13
      odometer: v.odometer, //68994
      origin: v.origin, //0
      speed: v.speed, //0
      startDate: v.startDate, //"2025-10-03T23:27:52"
      zoneId: v.zoneId, //"80cdfbca-8a53-4551-bce6-1a6c0ea0aaf1"
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
      address: v.address, //"Lomas del Seminario, Av Manuel J. Clouthier 325, Lomas de Guadalupe, 45030 Zapopan, Jal."
      dateGps: v.dateGps, //"2025-10-03T23:25:52"
      deviceBattery: v.deviceBattery, //100
      endDate: v.endDate, //"2025-10-03T23:35:01"
      eventId: v.eventId, //602
      finalFuel: v.finalFuel, //45
      ignition: v.ignition, //false
      imei: v.imei, //"862524060822760"
      initialFuel: v.initialFuel, //3
      lat: v.lat, //20.668894
      lon: v.lon, //-103.41846
      magnitude: v.magnitude, //42
      mainPower: v.mainPower, //13
      odometer: v.odometer, //68994
      origin: v.origin, //0
      speed: v.speed, //0
      startDate: v.startDate, //"2025-10-03T23:27:52"
      zoneId: v.zoneId, //"80cdfbca-8a53-4551-bce6-1a6c0ea0aaf1"
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
  /*   const allZoneData = useMemo(() => {
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
  }, []); */

  return (
    <div className={styles.zonesDataProvider}>
      <ZoneProfileData LANGUAGE={LANGUAGE} id={id} />
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
