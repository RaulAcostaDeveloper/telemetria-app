"use client";
import { useMemo } from "react";
import { LocalGasStation, Map } from "@mui/icons-material";

import styles from "./zonesDataProvider.module.css";
import { Table, TabsContent } from "@/global/components";
import { ZoneProfileData } from "../zoneProfileData/zoneProfileData";
import { ZonesMapTabSolo } from "../zonesMapTabSolo/zonesMapTabSolo";
import { columnsTable, dataTable, MODAL_OPTION } from "@/global/components/table/table.model";
import { formatDateTime } from "@/global/utils/utils";
import { useLanguage } from "@/global/language/components/languageProvider/languageProvider";
import { z0n3sD4t4M0ck } from "@/global/dataMock/z0n3sD4t4M0ck";

interface Props {
  id: string;
}

export const ZonesDataProvider = ({ id }: Props) => {
  const LANGUAGE = useLanguage();
  // TODO: Agregar mock de información a constantes.
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
    }));
  }, []);

  return (
    <div className={styles.zonesDataProvider}>
      <ZoneProfileData LANGUAGE={LANGUAGE} />
      <TabsContent
        tabOptions={zoneTabs}
        tabContents={[
          <div key={0}>
            {allZoneData && (
              <Table
                LANGUAGE={LANGUAGE}
                columns={loadsZoneColumns}
                data={allZoneDataLoads}
                idKey="id"
                showViewModal
                modalOption={MODAL_OPTION.ZONELOAD}
              />
            )}
          </div>,
          <div key={1}>
            {allZoneData && (
              <Table
                LANGUAGE={LANGUAGE}
                columns={unloadsZoneColumns}
                data={allZoneDataUnloads}
                idKey="id"
                showViewModal
                modalOption={MODAL_OPTION.ZONEUNLOAD}
              />
            )}
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
