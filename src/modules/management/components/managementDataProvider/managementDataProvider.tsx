import {
  columnsTable,
  dataTable,
} from "@/modules/global/components/table/table.model";
import { LanguageInterface } from "@/modules/global/language/constants/language.model";
import { Table, TabsContent } from "@/modules/global/components";
import { accountsDataMock } from "@/modules/global/dataMock/accounts/accounts";
import { devicesDataMock } from "@/modules/global/dataMock/devices/devices";
import { usersDataMock } from "@/modules/global/dataMock/users/users";
import { vehidlesDataMock } from "@/modules/global/dataMock/vehicles/vehicles";
import { groupsDataMock } from "@/modules/global/dataMock/groups/groups";
import { driversDataMock } from "@/modules/global/dataMock/drivers/drivers";

interface Props {
  LANGUAGE: LanguageInterface;
}
export const ManagementDataProvider = ({ LANGUAGE }: Props) => {
  const fuelTabs = [
    LANGUAGE.management.tabs.vehicles,
    LANGUAGE.management.tabs.devices,
    LANGUAGE.management.tabs.users,
    LANGUAGE.management.tabs.accounts,
    LANGUAGE.management.tabs.drivers,
    LANGUAGE.management.tabs.groups,
  ];

  const vehicleColumns: columnsTable = [
    {
      columnName: "ID",
      defaultSpace: 1,
    },
    {
      columnName: "Placas",
      defaultSpace: 2,
    },
    {
      columnName: "Marca",
      defaultSpace: 3,
      filterSelector: true,
    },
    {
      columnName: "Alias",
      defaultSpace: 3,
    },
  ];
  const vehiclesTableData: dataTable = vehidlesDataMock.value.vehicles;

  const devicesColumns: columnsTable = [
    {
      columnName: "ID",
      defaultSpace: 1,
    },
    {
      columnName: "Modelo",
      defaultSpace: 2,
    },
    {
      columnName: "Versión",
      defaultSpace: 2,
    },
    {
      columnName: "Estatus",
      defaultSpace: 2,
      filterSelector: true,
    },
    {
      columnName: "Fecha",
      defaultSpace: 4,
    },
    {
      columnName: "Serial Numer",
      defaultSpace: 3,
    },
    {
      columnName: "SIM",
      defaultSpace: 3,
    },
    {
      columnName: "firmware",
      defaultSpace: 2,
    },
    {
      columnName: "hardware",
      defaultSpace: 2,
    },
    {
      columnName: "imei",
      defaultSpace: 3,
    },
    {
      columnName: "lastDataAt",
      defaultSpace: 4,
    },
  ];
  const devicesTableData: dataTable = devicesDataMock.value.devices;

  const usersColumns: columnsTable = [
    {
      columnName: "ID",
      defaultSpace: 1,
    },
    {
      columnName: "Username",
      defaultSpace: 3,
    },
    {
      columnName: "Nombre(s)",
      defaultSpace: 3,
    },
    {
      columnName: "Apellido(s)",
      defaultSpace: 3,
    },
    {
      columnName: "Correo electrónico",
      defaultSpace: 5,
    },
  ];
  const usersTableData: dataTable = usersDataMock.value.users;

  const accountsColumns: columnsTable = [
    {
      columnName: "ID",
      defaultSpace: 1,
    },
    {
      columnName: "Name",
      defaultSpace: 4,
    },
  ];
  const accountsTableData: dataTable = accountsDataMock.value.accounts;

  const groupsColumns: columnsTable = [
    {
      columnName: "ID",
      defaultSpace: 1,
    },
    {
      columnName: "Name",
      defaultSpace: 4,
    },
  ];
  const groupsTableData: dataTable = groupsDataMock.value.groups;

  const driversColumns: columnsTable = [
    {
      columnName: "ID",
      defaultSpace: 1,
    },
    {
      columnName: "Name",
      defaultSpace: 4,
    },
  ];
  const driversTableData: dataTable = driversDataMock.value.groups;
  return (
    <div className="margintop">
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
              columns={usersColumns}
              data={usersTableData}
            />
          </div>,
          <div key={4}>
            <Table
              LANGUAGE={LANGUAGE}
              columns={accountsColumns}
              data={accountsTableData}
            />
          </div>,
          <div key={5}>
            <Table
              LANGUAGE={LANGUAGE}
              columns={driversColumns}
              data={driversTableData}
            />
          </div>,
          <div key={6}>
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
