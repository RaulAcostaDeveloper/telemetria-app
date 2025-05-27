"use client";
import { Table, TabsContent } from "@/modules/global/components";
import {
  columnsTable,
  dataTable,
} from "@/modules/global/components/table/table.model";
import { fuelSummaryDataMock } from "@/modules/global/dataMock/fuelSummary/fuelSummary";
import { useLanguage } from "@/modules/global/language/components/languageProvider/languageProvider";

const tableColumns: columnsTable = [
  {
    columnName: "Imei",
    defaultSpace: 3,
  },
  {
    columnName: "Último nivel de combustible",
    defaultSpace: 3,
    showTotal: true,
  },
  {
    columnName: "Fecha de último reporte",
    defaultSpace: 3,
  },
  {
    columnName: "Nombre",
    defaultSpace: 2,
    orderColumn: true,
  },
  {
    columnName: "Placa",
    defaultSpace: 6,
  },
  {
    columnName: "Cargas",
    defaultSpace: 2,
    showTotal: true,
    orderColumn: true,
  },
  {
    columnName: "Descargas",
    defaultSpace: 3,
    showTotal: true,
    orderColumn: true,
  },
  {
    columnName: "Rendimiento (Odo)",
    defaultSpace: 3,
    showTotal: true,
    orderColumn: true,
  },
  {
    columnName: "Rendimiento (Horo)",
    defaultSpace: 3,
    showTotal: true,
    orderColumn: true,
  },
  {
    columnName: "Combustible cargado",
    defaultSpace: 3,
    showTotal: true,
    orderColumn: true,
  },
  {
    columnName: "Combustible descargado",
    defaultSpace: 3,
    showTotal: true,
    orderColumn: true,
  },
];

export default function Fuel() {
  const LANGUAGE = useLanguage();
  const tabOptions = [
    LANGUAGE.fuel.tabs.unitys,
    LANGUAGE.fuel.tabs.groups,
    LANGUAGE.fuel.tabs.zones,
  ];
  const unitys: dataTable = fuelSummaryDataMock.value.devices;
  return (
    <div>
      <TabsContent
        tabOptions={tabOptions}
        tabContents={[
          <div key={1}>
            <Table
              LANGUAGE={LANGUAGE}
              title="Tabla de unidades"
              columns={tableColumns}
              data={unitys}
              showCreateButton
              showView
            />
          </div>,
        ]}
      />
    </div>
  );
}
