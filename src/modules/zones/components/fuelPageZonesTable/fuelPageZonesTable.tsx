"use client";
import { useMemo } from "react";

import { LanguageInterface } from "@/global/language/constants/language.model";
import { Table } from "@/global/components";
import {
  columnsTable,
  dataTable,
  MODAL_OPTION,
} from "@/global/components/table/table.model";
import { fuelZonesDataMock } from "@/global/dataMock/fuelZonesDataMock";

interface Props {
  LANGUAGE: LanguageInterface;
}

export const FuelPageZonesTable = ({ LANGUAGE }: Props) => {
  const zonesTableColumns: columnsTable = [
    {
      columnName: LANGUAGE.zones.zonesFuelTable.zone,
      defaultSpace: 3,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.zones.zonesFuelTable.profile,
      defaultSpace: 3,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.zones.zonesFuelTable.country,
      defaultSpace: 2,
      orderColumn: true,
      filterSelector: true,
    },
    {
      columnName: LANGUAGE.zones.zonesFuelTable.state,
      defaultSpace: 2,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.zones.zonesFuelTable.city,
      defaultSpace: 3,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.zones.zonesFuelTable.zipCode,
      defaultSpace: 2,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.zones.zonesFuelTable.events,
      defaultSpace: 2,
      orderColumn: true,
      minMaxFilter: true,
    },
    {
      columnName: LANGUAGE.zones.zonesFuelTable.charged,
      defaultSpace: 2,
      orderColumn: true,
      minMaxFilter: true,
    },
    {
      columnName: LANGUAGE.zones.zonesFuelTable.discharged,
      defaultSpace: 3,
      orderColumn: true,
      minMaxFilter: true,
    },
  ];

  const zonesData: dataTable = useMemo(() => {
    return fuelZonesDataMock?.map((value) => ({
      zoneName: value.zoneName,
      profileName: value.profileName,
      country: value.country,
      state: value.state,
      city: value.city,
      zipCode: value.zipCode,
      totalEvents: value.totalEvents,
      totalLitersCharges: value.totalLitersCharges,
      totalLitersDischarges: value.totalLitersDischarges,
      id: value.id,
    }));
  }, []);

  return (
    <Table
      columns={zonesTableColumns}
      data={zonesData}
      LANGUAGE={LANGUAGE}
      showGoGenericReport
      idKey="id"
      viewPath="/zones/zone/"
      showEdit
      modalOption={MODAL_OPTION.ZONE}
      showViewModal
    />
  );
};
