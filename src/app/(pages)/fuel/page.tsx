"use client";
import { Table } from "@/modules/global/components";
import ReportSummary from "./reportSummary/ReportSummary";
import {
  columnsTable,
  dataTable,
} from "@/modules/global/components/table/table.model";
import { useLanguage } from "@/modules/global/language/components/languageProvider/languageProvider";

const tableColumns: columnsTable = [
  {
    columnName: "Zona",
    defaultSpace: 3,
    orderColumn: true,
  },
  {
    columnName: "Perfil",
    defaultSpace: 3,
    filterSelector: true,
    orderColumn: true,
  },
  {
    columnName: "País",
    defaultSpace: 3,
    filterSelector: true,
    orderColumn: true,
  },
  {
    columnName: "Id",
    defaultSpace: 1,
    showTotal: true,
  },
];

const tableData: dataTable = [
  {
    zone: "Zone A12",
    profile: "Geo standard",
    country: "México",
    idVehicle: "101",
  },
  {
    zone: "Zone B07",
    profile: "Eco drive",
    country: "Colombia",
    idVehicle: "102",
  },
  {
    zone: "Zone C19",
    profile: "Geo gravity",
    country: "Chile",
    idVehicle: "103",
  },
  {
    zone: "Zone D03",
    profile: "Urban ride",
    country: "Argentina",
    idVehicle: "104",
  },
  {
    zone: "Zone E22",
    profile: "Highway master",
    country: "Perú",
    idVehicle: "105",
  },
  {
    zone: "Zone F11",
    profile: "Eco drive",
    country: "Brasil",
    idVehicle: "106",
  },
  {
    zone: "Zone G05",
    profile: "Geo standard",
    country: "México",
    idVehicle: "107",
  },
  {
    zone: "Zone H14",
    profile: "Urban ride",
    country: "Ecuador",
    idVehicle: "108",
  },
  {
    zone: "Zone I09",
    profile: "Highway master",
    country: "Uruguay",
    idVehicle: "109",
  },
  {
    zone: "Zone J01",
    profile: "Geo gravity",
    country: "Paraguay",
    idVehicle: "110",
  },
];

export default function Fuel() {
  const LANGUAGE = useLanguage();
  return (
    <div>
      <h1>Fuel page</h1> <ReportSummary />
      <Table
        LANGUAGE={LANGUAGE}
        title="Table example"
        columns={tableColumns}
        data={tableData}
      />
    </div>
  );
}
