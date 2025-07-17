"use client";
import { useSelector } from "react-redux";
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

  function ndIfEmptyStr(evaluatedStr: string | null){
    let reviewedStr = "ND";
    /* La funcion trim() remueve espacios a ambas orillas de una cadena, con ello quitamos la
      posibilidad de cadenas con espacios vacios. Luego, usé doble condicional porque segun
      el interprete web existe la posibilidad de que trim() genere un valor null. */
    if(evaluatedStr && 0 < evaluatedStr.length){
      evaluatedStr = evaluatedStr.trim()
      if(evaluatedStr && 0 < evaluatedStr.length){
        reviewedStr = evaluatedStr;
      }
    }
    return reviewedStr;
  }

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
      defaultSpace: 6,
    },
    {
      columnName: LANGUAGE.management.tableColumns.plates,
      defaultSpace: 2,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.management.tableColumns.brand,
      defaultSpace: 3,
    },
    {
      columnName: LANGUAGE.management.tableColumns.model,
      defaultSpace: 2,
    },
    {
      columnName: LANGUAGE.management.tableColumns.vehicleType,
      defaultSpace: 3,
    },
    {
      columnName: LANGUAGE.management.tableColumns.year,
      defaultSpace: 1,
    },
    {
      columnName: LANGUAGE.management.tableColumns.serialNumber,
      defaultSpace: 3,
    },
    {
      columnName: LANGUAGE.management.tableColumns.alias,
      defaultSpace: 3,
      orderColumn: true,
    },
  ];

  // Ejemplo de como añadir o quitar elementos en la tabla
  const vehiclesTableData: dataTable | undefined =
    vehiclesData?.value.vehicles.map((value) => ({
      id: value.id,
      plate: ndIfEmptyStr(value.plate),
      brand: ndIfEmptyStr(value.brand),
      model: ndIfEmptyStr(value.model),
      vehicleType: ndIfEmptyStr(value.vehicleType),
      year: ndIfEmptyStr(value.year),
      serialNumber: ndIfEmptyStr(value.serialNumber),
      imeIs: ndIfEmptyStr(value.imeIs[0]),
    }));

  // falta numero de teléfono, fecha de registro, poner tarjeta SIM
  const devicesColumns: columnsTable = [
    {
      columnName: LANGUAGE.management.tableColumns.imei,
      defaultSpace: 3,
    },
    {
      columnName: LANGUAGE.management.tableColumns.model,
      defaultSpace: 2,
    },
    {
      columnName: LANGUAGE.management.tableColumns.brand,
      defaultSpace: 3,
    },
    {
      columnName: LANGUAGE.management.tableColumns.status,
      defaultSpace: 2,
      filterSelector: true,
    },
    {
      columnName: LANGUAGE.management.tableColumns.name,
      defaultSpace: 4,
    },
    {
      columnName: LANGUAGE.management.tableColumns.type,
      defaultSpace: 2,
    },
    {
      columnName: LANGUAGE.management.tableColumns.createdAt,
      defaultSpace: 4,
    },
    {
      columnName: LANGUAGE.management.tableColumns.phoneNumber,
      defaultSpace: 3,
    },
    {
      columnName: LANGUAGE.management.tableColumns.registrationDate,
      defaultSpace: 4,
    }
  ];

  const devicesTableData: dataTable | undefined =
    devicesData?.value.devices.map((value) => ({
      imei: ndIfEmptyStr(value.imei),
      model: ndIfEmptyStr(value.model),
      brand: ndIfEmptyStr(value.brand),
      status: ndIfEmptyStr(value.status),
      name: ndIfEmptyStr(value.name),
      type: ndIfEmptyStr(value.type),
      createdAt: formatDateTime(value.createdAt),
      phoneNumber: ndIfEmptyStr(value.phoneNumber),
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
    },
  ];
  const groupsTableData: dataTable | undefined = groupsData?.value.groups.map(
    (value) => ({
      id: value.id,
      name: ndIfEmptyStr(value.name),
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
      defaultSpace: 4,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.management.tableColumns.email,
      defaultSpace: 4,
    },
    {
      columnName: LANGUAGE.management.tableColumns.address,
      defaultSpace: 4,
    },
    {
      columnName: LANGUAGE.management.tableColumns.entryDate,
      defaultSpace: 2,
    },
    {
      columnName: LANGUAGE.management.tableColumns.alias,
      defaultSpace: 3,
    },
    {
      columnName: LANGUAGE.management.tableColumns.groupName,
      defaultSpace: 4,
    },
    {
      columnName: LANGUAGE.management.tableColumns.license,
      defaultSpace: 2,
    },
  ];

  const driversTableData: dataTable | undefined =
    driversData?.value.drivers.map((value) => ({
      name: ndIfEmptyStr(value.name),
      lastName: ndIfEmptyStr(value.lastName),
      email: ndIfEmptyStr(value.email),
      address: ndIfEmptyStr(value.address),
      entryDate: ndIfEmptyStr(value.entryDate),
      alias: ndIfEmptyStr(value.alias),
      groupName: ndIfEmptyStr(value.groupName),
      license: ndIfEmptyStr(value.license)
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
