"use client";
import { useSelector } from "react-redux";

import styles from "./managementDataProvider.module.css";
import { RootState } from "@/globalConfig/redux/store";
import { formatDateTime } from "@/modules/global/utils/utils";

//Tipado
import {
  columnsTable,
  dataTable,
} from "@/modules/global/components/table/table.model";
import { LanguageInterface } from "@/modules/global/language/constants/language.model";

//Módulos
import { Table, TabsContent } from "@/modules/global/components";
import LoaderAnimation from "@/modules/global/components/loaderAnimation/loaderAnimation";

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
      columnName: LANGUAGE.management.tableColumns.serialNumber,
      defaultSpace: 4,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.management.tableColumns.plates,
      defaultSpace: 2,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.management.tableColumns.alias,
      defaultSpace: 3,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.management.tableColumns.brand,
      defaultSpace: 3,
      filterSelector: true,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.management.tableColumns.model,
      defaultSpace: 2,
      orderColumn: true,
      filterSelector: true,
    },
    {
      columnName: LANGUAGE.management.tableColumns.vehicleType,
      defaultSpace: 4,
      orderColumn: true,
      filterSelector: true,
    },
    {
      columnName: LANGUAGE.management.tableColumns.year,
      defaultSpace: 2,
      orderColumn: true,
      minMaxFilter: true,
    },
    {
      columnName: LANGUAGE.management.tableColumns.driver,
      defaultSpace: 4,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.management.tableColumns.groupName,
      defaultSpace: 3,
      filterSelector: true,
      orderColumn: true,
    },
  ];

  // Ejemplo de como añadir o quitar elementos en la tabla
  const vehiclesTableData: dataTable | undefined =
    vehiclesData?.value.vehicles.map((value) => ({
      serialNumber: value.serialNumber,
      plate: value.plate,
      name: value.name,
      brand: value.brand,
      model: value.model,
      vehicleType: value.vehicleType,
      year: value.year,
      driver: value.driver,
      group: value.group,
      imeIs: value.imeIs, ///aqui name, no mostrar imeis pero si que exista.
      id: value.id,
    }));

  // falta numero de teléfono, fecha de registro, poner tarjeta SIM
  const devicesColumns: columnsTable = [
    {
      columnName: LANGUAGE.management.tableColumns.imei,
      defaultSpace: 3,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.management.tableColumns.model,
      defaultSpace: 2,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.management.tableColumns.brand,
      defaultSpace: 3,
      orderColumn: true,
      filterSelector: true,
    },
    {
      columnName: LANGUAGE.management.tableColumns.status,
      defaultSpace: 2,
      filterSelector: true,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.management.tableColumns.name,
      defaultSpace: 4,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.management.tableColumns.type,
      defaultSpace: 4,
      orderColumn: true,
      filterSelector: true,
    },
    {
      columnName: LANGUAGE.management.tableColumns.createdAt,
      defaultSpace: 4,
    },
    {
      columnName: LANGUAGE.management.tableColumns.phoneNumber,
      defaultSpace: 4,
    },
    {
      columnName: LANGUAGE.management.tableColumns.registrationDate,
      defaultSpace: 4,
    },
  ];

  const devicesTableData: dataTable | undefined =
    devicesData?.value.devices.map((value) => ({
      imei: value.imei,
      model: value.model,
      brand: value.brand,
      status: value.status,
      name: value.name,
      type: value.type,
      createdAt: formatDateTime(value.createdAt),
      phoneNumber: value.phoneNumber,
      registrationDate: formatDateTime(value.registrationDate),
    }));

  const groupsColumns: columnsTable = [
    {
      columnName: LANGUAGE.management.tableColumns.id,
      defaultSpace: 1,
    },
    {
      columnName: LANGUAGE.management.tableColumns.names,
      defaultSpace: 4,
      orderColumn: true,
    },
  ];
  const groupsTableData: dataTable | undefined = groupsData?.value.groups.map(
    (value) => ({
      id: value.id,
      group: value.name,
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
      columnName: LANGUAGE.management.tableColumns.email,
      defaultSpace: 4,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.management.tableColumns.address,
      defaultSpace: 4,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.management.tableColumns.entryDate,
      defaultSpace: 4,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.management.tableColumns.alias,
      defaultSpace: 2,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.management.tableColumns.groupName,
      defaultSpace: 2,
      orderColumn: true,
      filterSelector: true,
    },
    {
      columnName: LANGUAGE.management.tableColumns.license,
      defaultSpace: 3,
      orderColumn: true,
    },
  ];

  const driversTableData: dataTable | undefined =
    driversData?.value.drivers.map((value) => ({
      name: value.name,
      lastName: value.lastName,
      email: value.email,
      address: value.address,
      entryDate: value.entryDate,
      alias: value.alias,
      groupName: value.groupName,
      license: value.license,
    }));

  return (
    <div className={styles.managementDataProvider}>
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
                showGoOBD
                idKey="imeIs"
              />
            ) : (
              <div>
                <LoaderAnimation />
              </div>
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
              <div>
                <LoaderAnimation />
              </div>
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
              <div>
                <LoaderAnimation />
              </div>
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
              <div>
                <LoaderAnimation />
              </div>
            )}
          </div>,
        ]}
      />
    </div>
  );
};
