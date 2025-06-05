import {
  columnsTable,
  dataTable,
} from "@/modules/global/components/table/table.model";

import { LanguageInterface } from "@/modules/global/language/constants/language.model";
import { Table, TabsContent } from "@/modules/global/components";
import { devicesDataMock } from "@/modules/global/dataMock/devices/devices";
import { driversDataMock } from "@/modules/global/dataMock/drivers/drivers";
import { groupsDataMock } from "@/modules/global/dataMock/groups/groups";
import { vehidlesDataMock } from "@/modules/global/dataMock/vehicles/vehicles";

interface Props {
  LANGUAGE: LanguageInterface;
}
export const ManagementDataProvider = ({ LANGUAGE }: Props) => {
  const fuelTabs = [
    LANGUAGE.management.tabs.vehicles,
    LANGUAGE.management.tabs.devices,
    LANGUAGE.management.tabs.drivers,
    LANGUAGE.management.tabs.groups,
  ];

  const vehicleColumns: columnsTable = [
    {
      columnName: LANGUAGE.management.tableColumns.id,
      defaultSpace: 1,
    },
    {
      columnName: LANGUAGE.management.tableColumns.plates,
      defaultSpace: 2,
    },
    {
      columnName: LANGUAGE.management.tableColumns.brand,
      defaultSpace: 3,
      filterSelector: true,
    },
    {
      columnName: LANGUAGE.management.tableColumns.alias,
      defaultSpace: 3,
    },
  ];
  const vehiclesTableData: dataTable = vehidlesDataMock.value.vehicles;

  const devicesColumns: columnsTable = [
    {
      columnName: LANGUAGE.management.tableColumns.id,
      defaultSpace: 1,
    },
    {
      columnName: LANGUAGE.management.tableColumns.model,
      defaultSpace: 2,
    },
    {
      columnName: LANGUAGE.management.tableColumns.version,
      defaultSpace: 2,
    },
    {
      columnName: LANGUAGE.management.tableColumns.status,
      defaultSpace: 2,
      filterSelector: true,
    },
    {
      columnName: LANGUAGE.management.tableColumns.date,
      defaultSpace: 4,
    },
    {
      columnName: LANGUAGE.management.tableColumns.serialNumber,
      defaultSpace: 3,
    },
    {
      columnName: LANGUAGE.management.tableColumns.sim,
      defaultSpace: 3,
    },
    {
      columnName: LANGUAGE.management.tableColumns.firmware,
      defaultSpace: 2,
    },
    {
      columnName: LANGUAGE.management.tableColumns.hardware,
      defaultSpace: 2,
    },
    {
      columnName: LANGUAGE.management.tableColumns.imei,
      defaultSpace: 3,
    },
    {
      columnName: LANGUAGE.management.tableColumns.lastDataDate,
      defaultSpace: 4,
    },
  ];
  const devicesTableData: dataTable = devicesDataMock.value.devices;

  const groupsColumns: columnsTable = [
    {
      columnName: LANGUAGE.management.tableColumns.id,
      defaultSpace: 1,
    },
    {
      columnName: LANGUAGE.management.tableColumns.names,
      defaultSpace: 4,
    },
  ];
  const groupsTableData: dataTable = groupsDataMock.value.groups;

  const driversColumns: columnsTable = [
    {
      columnName: LANGUAGE.management.tableColumns.id,
      defaultSpace: 1,
    },
    {
      columnName: LANGUAGE.management.tableColumns.names,
      defaultSpace: 4,
    },
  ];
  const driversTableData: dataTable = driversDataMock.value.groups;
  return (
    <div>
      <TabsContent
        tabOptions={fuelTabs}
        tabContents={[
          <div key={1}>
            <Table
              LANGUAGE={LANGUAGE}
              columns={vehicleColumns}
              data={vehiclesTableData}
            />
          </div>,
          <div key={2}>
            <Table
              LANGUAGE={LANGUAGE}
              columns={devicesColumns}
              data={devicesTableData}
            />
          </div>,
          <div key={3}>
            <Table
              LANGUAGE={LANGUAGE}
              columns={driversColumns}
              data={driversTableData}
            />
          </div>,
          <div key={4}>
            <Table
              LANGUAGE={LANGUAGE}
              columns={groupsColumns}
              data={groupsTableData}
            />
          </div>,
        ]}
      />
    </div>
  );
};
