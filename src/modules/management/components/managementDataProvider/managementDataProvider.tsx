"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/globalConfig/redux/store";

//Tipado
import {
  columnsTable,
  dataTable,
} from "@/modules/global/components/table/table.model";
import { LanguageInterface } from "@/modules/global/language/constants/language.model";

//Módulos
import { Table, TabsContent } from "@/modules/global/components";

interface Props {
  LANGUAGE: LanguageInterface;
}

export const ManagementDataProvider = ({ LANGUAGE }: Props) => {
  const { vehiclesData, vehiclesStatus } = useSelector(
    (state: RootState) => state.vehicles
  );

  const { driversData, driversStatus } = useSelector(
    (state: RootState) => state.drivers
  );

  const { devicesData, devicesStatus } = useSelector(
    (state: RootState) => state.devices
  );

  const { groupsData, groupsStatus } = useSelector(
    (state: RootState) => state.groups
  );

  const fuelTabs = [
    LANGUAGE.management.tabs.vehicles,
    LANGUAGE.management.tabs.devices,
    LANGUAGE.management.tabs.drivers,
    LANGUAGE.management.tabs.groups,
  ];

  // falta modelo, año, grupo, serial number (bin o mac address)
  // En grupo, poder filtrar por nombre del grupo
  const vehicleColumns: columnsTable = [
    {
      columnName: LANGUAGE.management.tableColumns.id,
      defaultSpace: 3,
    },
    {
      columnName: LANGUAGE.management.tableColumns.plates,
      defaultSpace: 4,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.management.tableColumns.brand,
      defaultSpace: 5,
      filterSelector: true,
    },
    {
      columnName: LANGUAGE.management.tableColumns.alias,
      defaultSpace: 6,
      orderColumn: true,
    },
  ];

  // Ejemplo de como añadir o quitar elementos en la tabla
  const vehiclesTableData: dataTable | undefined =
    vehiclesData?.value.vehicles.map((value) => ({
      id: value.id,
      carNumber: value.carNumber,
      carLabel: value.carLabel,
      carShortcut: value.carShortcut,
      imeIs: value.imeIs[0],
    }));

  // falta numero de teléfono, fecha de registro, poner tarjeta SIM
  const devicesColumns: columnsTable = [
    {
      columnName: LANGUAGE.management.tableColumns.imei,
      defaultSpace: 4,
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
  ];

  const devicesTableData: dataTable | undefined =
    devicesData?.value.devices.map((value) => ({
      imei: value.imei,
      model: value.model,
      modelVersion: value.modelVersion,
      status: value.status,
    }));

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
  const groupsTableData: dataTable | undefined = groupsData?.value.groups.map(
    (value) => ({
      id: value.id,
      name: value.name,
    })
  );

  // poner licencia (número), vehículo (quizá placa), ver vehículos del grupo
  // mostrar el modal del vehículo
  // mostrar el modal con vehículos del grupo
  const driversColumns: columnsTable = [
    {
      columnName: LANGUAGE.management.tableColumns.names,
      defaultSpace: 3,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.management.tableColumns.lastnames,
      defaultSpace: 3,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.management.tableColumns.celphone,
      defaultSpace: 2,
    },
    {
      columnName: LANGUAGE.management.tableColumns.email,
      defaultSpace: 4,
    },
  ];

  const driversTableData: dataTable | undefined =
    driversData?.value.drivers.map((value) => ({
      name: value.name,
      surname: value.surname,
      phone: value.phone,
      email: value.email,
    }));

  return (
    <div>
      <TabsContent
        tabOptions={fuelTabs}
        tabContents={[
          <div key={1}>
            {vehiclesStatus === "succeeded" && vehiclesTableData ? (
              <Table
                LANGUAGE={LANGUAGE}
                columns={vehicleColumns}
                data={vehiclesTableData}
                showGoFuel
                showGoOBT
                idKey="imeIs"
              />
            ) : (
              // Añadir un loading
              <div>...</div>
            )}
          </div>,
          <div key={2}>
            {devicesStatus === "succeeded" && devicesTableData ? (
              <Table
                LANGUAGE={LANGUAGE}
                columns={devicesColumns}
                data={devicesTableData}
              />
            ) : (
              // Añadir un loading
              <div>...</div>
            )}
          </div>,
          <div key={3}>
            {driversStatus === "succeeded" && driversTableData ? (
              <Table
                LANGUAGE={LANGUAGE}
                columns={driversColumns}
                data={driversTableData}
              />
            ) : (
              // Añadir un loading
              <div>...</div>
            )}
          </div>,
          <div key={4}>
            {groupsStatus === "succeeded" && groupsTableData ? (
              <Table
                LANGUAGE={LANGUAGE}
                columns={groupsColumns}
                data={groupsTableData}
              />
            ) : (
              // Añadir un loading
              <div>...</div>
            )}
          </div>,
        ]}
      />
    </div>
  );
};
