"use client";
import { useMemo } from "react";
import { LocalGasStation, Map } from "@mui/icons-material";

import styles from "./zonesDataProvider.module.css";
import { Table, TabsContent } from "@/global/components";
import { ZonesMapTabSolo } from "../zonesMapTabSolo/zonesMapTabSolo";
import { useLanguage } from "@/global/language/components/languageProvider/languageProvider";
import { z0n3sD4t4M0ck } from "@/global/components/dataMock/z0n3sD4t4M0ck";
import { columnsTable, dataTable } from "@/global/components/table/table.model";
import { formatDateTime } from "@/global/utils/utils";

interface Props {
  id: string;
}

export const ZonesDataProvider = ({ id }: Props) => {
  const LANGUAGE = useLanguage();
  // TODO: Agregar mock de información a constantes.
  const zoneTabs = [
    { text: LANGUAGE.zones.tabs.map, icon: Map },
    {
      text: LANGUAGE.zones.tabs.load,
      icon: LocalGasStation,
      iconStyle: { color: "rgb(4,187,4)" },
    },
    {
      text: LANGUAGE.zones.tabs.unload,
      icon: LocalGasStation,
      iconStyle: { color: "223,44,59)" },
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
      <TabsContent
        tabOptions={zoneTabs}
        tabContents={[
          <div key={0}>
            <div className={["containertabmap", styles.container].join(" ")}>
              <ZonesMapTabSolo
                LANGUAGE={LANGUAGE}
                markersInZone={allZoneData.markersInZone}
              />
            </div>
          </div>,
          <div key={1}>
            {allZoneData && (
              <Table
                LANGUAGE={LANGUAGE}
                columns={loadsZoneColumns}
                data={allZoneDataLoads}
                idKey="id"
                showViewModal
              />
            )}
          </div>,
          <div key={2}>
            {allZoneData && (
              <Table
                LANGUAGE={LANGUAGE}
                columns={unloadsZoneColumns}
                data={allZoneDataUnloads}
                idKey="id"
                showViewModal
              />
            )}
          </div>,
        ]}
      />
    </div>
  );
};
