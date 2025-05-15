"use client";
import { Table } from "@/modules/global/components";
import {
  columnsTable,
  dataTable,
} from "@/modules/global/components/table/table.model";
import { useLanguage } from "@/modules/global/language/components/languageProvider/languageProvider";

const tableColumns: columnsTable = [
  {
    columnName: "Zona",
    defaultSpace: 3,
  },
  {
    columnName: "Perfil",
    defaultSpace: 2,
  },
  {
    columnName: "País",
    defaultSpace: 2,
  },
  {
    columnName: "Id",
    defaultSpace: 2,
  },
];

const tableData: dataTable = [
  {
    zone: "Principal name",
    profile: "Perfil name",
    country: "Country name",
    idVehicle: "412",
  },
  {
    zone: "Principal name 2",
    profile: "Perfil name 2",
    country: "Country name 2",
    idVehicle: "521",
  },
  {
    zone: "Principal name 2",
    profile: "Perfil name 2",
    country: "Country name 2",
    idVehicle: "522",
  },
];
export default function Fuel() {
  const LANGUAGE = useLanguage();
  return (
    <div>
      <h1>Fuel page</h1>{" "}
      <Table
        LANGUAGE={LANGUAGE}
        title="Table example"
        columns={tableColumns}
        data={tableData}
      />
    </div>
  );
}
