"use client";
import { useMemo } from "react";
import { useSelector } from "react-redux";

import styles from "./resourcesDataProvider.module.css";
import {
  MODAL_OPTION,
  columnsTable,
} from "@/global/components/table/table.model";
import { DataErrorHandler } from "@/global/components/DataErrorHandler/DataErrorHandler";
import { LanguageInterface } from "@/global/language/constants/language.model";
import { RootState } from "@/global/redux/store";
import { SERVICE_STATUS } from "@/global/redux/serviceSlices/types/serviceTypes";
import { Table, TabsContent } from "@/global/components";
import { legibleDate, removeMidnightHour } from "@/global/utils/dateUtils";
import {
  DirectionsCar,
  DeviceHub,
  AccountBox,
  Groups,
} from "@mui/icons-material";
import { deviceStatusTranslator } from "@/global/utils/stringUtils";
import { vehiclesDataMock } from "@/global/dataMock/vehicles";
import { devicesDataMock } from "@/global/dataMock/devices";
import { driversDataMock } from "@/global/dataMock/drivers";
import { groupsDataMock } from "@/global/dataMock/groups";

interface Props {
  LANGUAGE: LanguageInterface;
}

export const ResourcesDataProvider = ({ LANGUAGE }: Props) => {
  const { vehiclesData, vehiclesStatus } = useSelector(
    (state: RootState) => state.vehicles,
  );

  const { driversData, driversStatus } = useSelector(
    (state: RootState) => state.drivers,
  );

  const { devicesData, devicesStatus } = useSelector(
    (state: RootState) => state.devices,
  );

  const { groupsData, groupsStatus } = useSelector(
    (state: RootState) => state.groups,
  );

  const fuelTabs = [
    {
      text: LANGUAGE.resources.tabs.vehicles,
      icon: DirectionsCar,
    },
    {
      text: LANGUAGE.resources.tabs.devices,
      icon: DeviceHub,
    },
    {
      text: LANGUAGE.resources.tabs.drivers,
      icon: AccountBox,
    },
    {
      text: LANGUAGE.resources.tabs.groups,
      icon: Groups,
    },
  ];

  // falta modelo, año, grupo, serial number (bin o mac address)
  // En grupo, poder filtrar por nombre del grupo
  const vehicleColumns: columnsTable = [
    {
      columnName: LANGUAGE.resources.tableColumns.plates,
      defaultSpace: 2,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.resources.tableColumns.alias,
      defaultSpace: 3,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.resources.tableColumns.brand,
      defaultSpace: 3,
      filterSelector: true,
      orderColumn: true,
    },

    {
      columnName: LANGUAGE.resources.tableColumns.model,
      defaultSpace: 2,
      orderColumn: true,
      filterSelector: true,
    },
    {
      columnName: LANGUAGE.resources.tableColumns.year,
      defaultSpace: 2,
      orderColumn: true,
      minMaxFilter: true,
    },
    {
      columnName: LANGUAGE.resources.tableColumns.vehicleType,
      defaultSpace: 4,
      orderColumn: true,
      filterSelector: true,
    },
    {
      columnName: LANGUAGE.resources.tableColumns.driver,
      defaultSpace: 4,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.resources.tableColumns.groupName,
      defaultSpace: 3,
      filterSelector: true,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.resources.tableColumns.serialNumber,
      defaultSpace: 4,
      orderColumn: true,
    },
  ];

  // Ejemplo de como añadir o quitar elementos en la tabla
  const vehiclesTableData = useMemo(() => {
    return vehiclesDataMock.map((value) => ({
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
      columnName: LANGUAGE.resources.tableColumns.imei,
      defaultSpace: 3,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.resources.tableColumns.model,
      defaultSpace: 2,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.resources.tableColumns.brand,
      defaultSpace: 3,
      orderColumn: true,
      filterSelector: true,
    },
    {
      columnName: LANGUAGE.resources.tableColumns.status,
      defaultSpace: 2,
      filterSelector: true,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.resources.tableColumns.name,
      defaultSpace: 4,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.resources.tableColumns.type,
      defaultSpace: 3,
      orderColumn: true,
      filterSelector: true,
    },
    /*     {
      columnName: LANGUAGE.resources.tableColumns.createdAt,
      defaultSpace: 4,
    }, */
    {
      columnName: LANGUAGE.resources.tableColumns.phoneNumber,
      defaultSpace: 2,
    },
    {
      columnName: LANGUAGE.resources.tableColumns.registrationDate,
      defaultSpace: 5,
    },
  ];

  const devicesTableData = useMemo(() => {
    return devicesDataMock.map((value) => ({
      imei: value.imei,
      model: value.model,
      brand: value.brand,
      status: deviceStatusTranslator(value.status, LANGUAGE),
      name: value.name,
      type: value.type,
      /* createdAt: formatDateTime(value.createdAt), */
      phoneNumber: value.phoneNumber,
      registrationDate: removeMidnightHour(
        legibleDate(value.registrationDate, LANGUAGE.localeLanguage),
      ),
    }));
  }, [devicesData]);

  const groupsColumns: columnsTable = [
    {
      columnName: LANGUAGE.resources.tableColumns.id,
      defaultSpace: 1,
    },
    {
      columnName: LANGUAGE.resources.tableColumns.names,
      defaultSpace: 4,
      orderColumn: true,
    },
  ];

  const groupsTableData = useMemo(() => {
    return groupsDataMock.map((value) => ({
      id: value.id,
      group: value.name,
    }));
  }, [groupsData]);

  // poner licencia (número), vehículo (quizá placa), ver vehículos del grupo
  // mostrar el modal del vehículo
  // mostrar el modal con vehículos del grupo
  const driversColumns: columnsTable = [
    {
      columnName: LANGUAGE.resources.tableColumns.names,
      defaultSpace: 3,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.resources.tableColumns.lastnames,
      defaultSpace: 3,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.resources.tableColumns.email,
      defaultSpace: 4,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.resources.tableColumns.address,
      defaultSpace: 4,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.resources.tableColumns.entryDate,
      defaultSpace: 4,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.resources.tableColumns.alias,
      defaultSpace: 2,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.resources.tableColumns.groupName,
      defaultSpace: 2,
      orderColumn: true,
      filterSelector: true,
    },
    {
      columnName: LANGUAGE.resources.tableColumns.license,
      defaultSpace: 3,
      orderColumn: true,
    },
  ];

  const driversTableData = useMemo(() => {
    return driversDataMock.map((value) => ({
      name: value.name,
      lastName: value.lastName,
      email: value.email,
      address: value.address,
      entryDate: removeMidnightHour(
        legibleDate(value.entryDate, LANGUAGE.localeLanguage),
      ),
      alias: value.alias,
      groupName: value.groupName,
      license: value.license,
    }));
  }, [driversData]);

  return (
    <div className={styles.resourcesDataProvider}>
      <TabsContent
        tabOptions={fuelTabs}
        tabContents={[
          <div key={1}>
            {
              // vehiclesStatus === SERVICE_STATUS.succeeded &&
              // vehiclesData?.value &&
              vehiclesTableData && (
                <Table
                  LANGUAGE={LANGUAGE}
                  columns={vehicleColumns}
                  data={vehiclesTableData}
                  idKey="imeIs"
                  idImei="imeIs"
                  modalOption={MODAL_OPTION.VEHICLES}
                  showViewModal
                />
              )
            }

            {/* <DataErrorHandler
              LANGUAGE={LANGUAGE}
              hasData={!!vehiclesTableData}
              infoStatus={vehiclesStatus}
              statusCode={vehiclesData?.statusCode}
            /> */}
          </div>,
          <div key={2}>
            {
              // devicesStatus === SERVICE_STATUS.succeeded &&
              //   devicesData?.value &&
              devicesTableData && (
                <Table
                  LANGUAGE={LANGUAGE}
                  columns={devicesColumns}
                  data={devicesTableData}
                />
              )
            }

            {/* <DataErrorHandler
              LANGUAGE={LANGUAGE}
              hasData={!!devicesTableData}
              infoStatus={devicesStatus}
              statusCode={devicesData?.statusCode}
            /> */}
          </div>,
          <div key={3}>
            {
              // driversStatus === SERVICE_STATUS.succeeded &&
              //   driversData?.value &&
              driversTableData && (
                <Table
                  LANGUAGE={LANGUAGE}
                  columns={driversColumns}
                  data={driversTableData}
                />
              )
            }

            {/* <DataErrorHandler
              LANGUAGE={LANGUAGE}
              hasData={!!driversTableData}
              infoStatus={driversStatus}
              statusCode={driversData?.statusCode}
            /> */}
          </div>,
          <div key={4}>
            {
              // groupsStatus === SERVICE_STATUS.succeeded &&
              //   groupsData?.value &&
              groupsTableData && (
                <Table
                  LANGUAGE={LANGUAGE}
                  columns={groupsColumns}
                  data={groupsTableData}
                  idKey="id"
                  modalOption={MODAL_OPTION.GROUPS}
                  showViewModal
                />
              )
            }

            {/* <DataErrorHandler
              LANGUAGE={LANGUAGE}
              hasData={!!groupsTableData}
              infoStatus={groupsStatus}
              statusCode={groupsData?.statusCode}
            /> */}
          </div>,
        ]}
      />
    </div>
  );
};
