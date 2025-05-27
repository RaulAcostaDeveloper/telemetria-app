"use client";
import { Table, TabsContent } from "@/modules/global/components";
import {
  columnsTable,
  dataTable,
} from "@/modules/global/components/table/table.model";
import { fuelSummaryDataMock } from "@/modules/global/dataMock/fuelSummary/fuelSummary";
import { useLanguage } from "@/modules/global/language/components/languageProvider/languageProvider";

export default function Fuel() {
  const LANGUAGE = useLanguage();

  const tabOptions = [
    LANGUAGE.fuel.tabs.unitys,
    LANGUAGE.fuel.tabs.groups,
    LANGUAGE.fuel.tabs.zones,
  ];

  const vehiclesColumns: columnsTable = [
    {
      columnName: LANGUAGE.fuel.vehiclesTableColumns.imei,
      defaultSpace: 3,
    },
    {
      columnName: LANGUAGE.fuel.vehiclesTableColumns.lastFuelLevel,
      defaultSpace: 3,
      showTotal: true,
    },
    {
      columnName: LANGUAGE.fuel.vehiclesTableColumns.lastReportDate,
      defaultSpace: 3,
    },
    {
      columnName: LANGUAGE.fuel.vehiclesTableColumns.name,
      defaultSpace: 2,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.fuel.vehiclesTableColumns.plate,
      defaultSpace: 6,
    },
    {
      columnName: LANGUAGE.fuel.vehiclesTableColumns.fuelLoadCount,
      defaultSpace: 2,
      showTotal: true,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.fuel.vehiclesTableColumns.fuelUnloadCount,
      defaultSpace: 3,
      showTotal: true,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.fuel.vehiclesTableColumns.performanceOdometer,
      defaultSpace: 3,
      showTotal: true,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.fuel.vehiclesTableColumns.performanceHorometer,
      defaultSpace: 3,
      showTotal: true,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.fuel.vehiclesTableColumns.fuelLoaded,
      defaultSpace: 3,
      showTotal: true,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.fuel.vehiclesTableColumns.fuelUnloaded,
      defaultSpace: 3,
      showTotal: true,
      orderColumn: true,
    },
  ];

  const vehiclesReport: dataTable = fuelSummaryDataMock.value.devices;

  return (
    <div>
      <TabsContent
        tabOptions={tabOptions}
        tabContents={[
          <div key={1}>
            <Table
              LANGUAGE={LANGUAGE}
              columns={vehiclesColumns}
              data={vehiclesReport}
              idKey="imei"
              showView
              viewPath="/fuel/vehicle/"
            />
          </div>,
        ]}
      />
    </div>
  );
}
