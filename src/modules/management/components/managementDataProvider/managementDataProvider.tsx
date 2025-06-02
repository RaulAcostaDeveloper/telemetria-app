import { Table, TabsContent } from "@/modules/global/components";
import {
  columnsTable,
  dataTable,
} from "@/modules/global/components/table/table.model";
import { devicesDataMock } from "@/modules/global/dataMock/devices/devices";
import { vehidlesDataMock } from "@/modules/global/dataMock/vehicles/vehicles";
import { LanguageInterface } from "@/modules/global/language/constants/language.model";

interface Props {
  LANGUAGE: LanguageInterface;
}

export const ManagementDataProvider = ({ LANGUAGE }: Props) => {
  const fuelTabs = [
    LANGUAGE.management.tabs.vehicles,
    LANGUAGE.management.tabs.devices,
    LANGUAGE.management.tabs.accounts,
    LANGUAGE.management.tabs.clients,
    LANGUAGE.management.tabs.drivers,
    LANGUAGE.management.tabs.groups,
    LANGUAGE.management.tabs.users,
  ];

  const vehiclesTableData: dataTable = vehidlesDataMock.value.vehicles;
  const vehicleColumns: columnsTable = [
    {
      columnName: "ID",
      defaultSpace: 3,
    },
    {
      columnName: "Placas",
      defaultSpace: 3,
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

  const devicesTableData: dataTable = devicesDataMock.value.devices;
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
        ]}
      />
    </div>
  );
};
