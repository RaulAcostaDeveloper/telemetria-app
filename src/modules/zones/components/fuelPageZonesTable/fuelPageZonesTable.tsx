"use client";
import { useMemo } from "react";

import { LanguageInterface } from "@/global/language/constants/language.model";
import { Table } from "@/global/components";
import { columnsTable, dataTable } from "@/global/components/table/table.model";
import { zonesDataMock } from "@/global/dataMock/zonesDataMock";

interface Props {
  LANGUAGE: LanguageInterface;
}

export const FuelPageZonesTable = ({ LANGUAGE }: Props) => {
  const zonesTableColumns: columnsTable = [
    {
      columnName: "Zona",
      defaultSpace: 3,
    },
    {
      columnName: "Perfil",
      defaultSpace: 3,
    },
    {
      columnName: "País",
      defaultSpace: 2,
    },
    {
      columnName: "Estado",
      defaultSpace: 2,
    },
    {
      columnName: "Ciudad",
      defaultSpace: 3,
    },
    {
      columnName: "Código postal",
      defaultSpace: 2,
    },
    {
      columnName: "Total eventos",
      defaultSpace: 2,
    },
    {
      columnName: "Litros cargados",
      defaultSpace: 2,
    },
    {
      columnName: "Litros descargados",
      defaultSpace: 3,
    },
  ];

  const zonesData: dataTable = useMemo(() => {
    return zonesDataMock?.map((value) => ({
      zoneName: value.zoneName,
      profileName: value.profileName,
      country: value.country,
      state: value.state,
      city: value.city,
      zipCode: value.zipCode,
      totalEvents: value.totalEvents,
      totalLitersCharges: value.totalLitersCharges,
      totalLitersDischarges: value.totalLitersDischarges,
    }));
  }, []);

  return (
    <Table columns={zonesTableColumns} data={zonesData} LANGUAGE={LANGUAGE} />
  );
};
