"use client";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import styles from "./managementDataProvider.module.css";
import {
  MODAL_OPTION,
  columnsTable,
} from "@/global/components/table/table.model";
import { DataErrorHandler } from "@/global/components/DataErrorHandler/DataErrorHandler";
import { LanguageInterface } from "@/global/language/constants/language.model";
import { RootState } from "@/global/redux/store";
import { SERVICE_STATUS } from "@/global/redux/serviceSlices/types/serviceTypes";
import { Table, TabsContent } from "@/global/components";
import {
  deviceStatusTranslator,
  formatDateTime,
  toLocalDateTime,
} from "@/global/utils/utils";
import {
  DirectionsCar,
  DeviceHub,
  AccountBox,
  Groups,
} from "@mui/icons-material";
import { DriversData } from "@/global/redux/serviceSlices/driversSlice";
import { DevicesData } from "@/global/redux/serviceSlices/devicesSlice";

interface Props {
  LANGUAGE: LanguageInterface;
}

export const ManagementDataProvider = ({ LANGUAGE }: Props) => {
  const [driversDataFormated, setDriversDataFormated] = useState<DriversData>();
  const [devicesDataFormated, setDevicesDataFormated] = useState<DevicesData>();

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

  useEffect(() => {
    if (driversData?.value) {
      const drivers = driversData.value.drivers.map((messages) => ({
        ...messages,
        entryDate: toLocalDateTime(messages.entryDate),
      }));
      const dataFormated = {
        ...driversData,
        value: {
          ...driversData.value,
          drivers,
        },
      };
      setDriversDataFormated(dataFormated);
    }
  }, [driversData]);

  useEffect(() => {
    if (devicesData?.value) {
      const devices = devicesData.value.devices.map((messages) => ({
        ...messages,
        createdAt: toLocalDateTime(messages.createdAt),
        registrationDate: toLocalDateTime(messages.registrationDate),
      }));
      const dataFormated = {
        ...devicesData,
        value: {
          ...devicesData.value,
          devices,
        },
      };
      setDevicesDataFormated(dataFormated);
    }
  }, [devicesData]);

  const fuelTabs = [
    {
      text: LANGUAGE.management.tabs.vehicles,
      icon: DirectionsCar,
    },
    {
      text: LANGUAGE.management.tabs.devices,
      icon: DeviceHub,
    },
    {
      text: LANGUAGE.management.tabs.drivers,
      icon: AccountBox,
    },
    {
      text: LANGUAGE.management.tabs.groups,
      icon: Groups,
    },
  ];

  // falta modelo, año, grupo, serial number (bin o mac address)
  // En grupo, poder filtrar por nombre del grupo
  const vehicleColumns: columnsTable = [
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
      columnName: LANGUAGE.management.tableColumns.year,
      defaultSpace: 2,
      orderColumn: true,
      minMaxFilter: true,
    },
    {
      columnName: LANGUAGE.management.tableColumns.vehicleType,
      defaultSpace: 4,
      orderColumn: true,
      filterSelector: true,
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
    {
      columnName: LANGUAGE.management.tableColumns.serialNumber,
      defaultSpace: 4,
      orderColumn: true,
    },
  ];

  // Ejemplo de como añadir o quitar elementos en la tabla
  const vehiclesTableData = useMemo(() => {
    return vehiclesData?.value?.vehicles.map((value) => ({
      plate: value.plate,
      name: value.name,
      brand: value.brand,
      model: value.model,
      year: value.year,
      vehicleType: value.vehicleType,
      driver: value.driver,
      groupName: value.group[0].name,
      serialNumber: value.serialNumber,
      groupId: value.group[0].id,
      imeIs: value.imeIs[0], ///aqui name, no mostrar imeis pero si que exista.
      id: value.id,
    }));
  }, [vehiclesData]);

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

  const devicesTableData = useMemo(() => {
    return devicesDataFormated?.value?.devices.map((value) => ({
      imei: value.imei,
      model: value.model,
      brand: value.brand,
      status: deviceStatusTranslator(value.status, LANGUAGE),
      name: value.name,
      type: value.type,
      createdAt: formatDateTime(value.createdAt),
      phoneNumber: value.phoneNumber,
      registrationDate: formatDateTime(value.registrationDate),
    }));
  }, [devicesDataFormated]);

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

  const groupsTableData = useMemo(() => {
    return groupsData?.value?.groups.map((value) => ({
      id: value.id,
      group: value.name,
    }));
  }, [groupsData]);

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

  const driversTableData = useMemo(() => {
    return driversDataFormated?.value?.drivers.map((value) => ({
      name: value.name,
      lastName: value.lastName,
      email: value.email,
      address: value.address,
      entryDate: formatDateTime(value.entryDate),
      alias: value.alias,
      groupName: value.groupName,
      license: value.license,
    }));
  }, [driversDataFormated]);

  return (
    <div className={styles.managementDataProvider}>
      <TabsContent
        tabOptions={fuelTabs}
        tabContents={[
          <div key={1}>
            {vehiclesStatus === SERVICE_STATUS.succeeded &&
              vehiclesData?.value &&
              vehiclesTableData && (
                <Table
                  LANGUAGE={LANGUAGE}
                  columns={vehicleColumns}
                  data={vehiclesTableData}
                  idKey="imeIs"
                  modalOption={MODAL_OPTION.VEHICLES}
                  showGoFuel
                  showGoOBD
                  showViewModal
                />
              )}

            <DataErrorHandler
              LANGUAGE={LANGUAGE}
              hasData={!!vehiclesTableData}
              infoStatus={vehiclesStatus}
            />
          </div>,
          <div key={2}>
            {devicesStatus === SERVICE_STATUS.succeeded &&
              devicesData?.value &&
              devicesTableData && (
                <Table
                  LANGUAGE={LANGUAGE}
                  columns={devicesColumns}
                  data={devicesTableData}
                />
              )}

            <DataErrorHandler
              LANGUAGE={LANGUAGE}
              hasData={!!devicesTableData}
              infoStatus={devicesStatus}
            />
          </div>,
          <div key={3}>
            {driversStatus === SERVICE_STATUS.succeeded &&
              driversData?.value &&
              driversTableData && (
                <Table
                  LANGUAGE={LANGUAGE}
                  columns={driversColumns}
                  data={driversTableData}
                />
              )}

            <DataErrorHandler
              LANGUAGE={LANGUAGE}
              hasData={!!driversTableData}
              infoStatus={driversStatus}
            />
          </div>,
          <div key={4}>
            {groupsStatus === SERVICE_STATUS.succeeded &&
              groupsData?.value &&
              groupsTableData && (
                <Table
                  LANGUAGE={LANGUAGE}
                  columns={groupsColumns}
                  data={groupsTableData}
                  idKey="id"
                  modalOption={MODAL_OPTION.GROUPS}
                  showViewModal
                />
              )}

            <DataErrorHandler
              LANGUAGE={LANGUAGE}
              hasData={!!groupsTableData}
              infoStatus={groupsStatus}
            />
          </div>,
        ]}
      />
    </div>
  );
};
