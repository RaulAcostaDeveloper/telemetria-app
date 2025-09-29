// Ver los vehículos que pertenecen a este grupo
"use client";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import styles from "./tableModalViewGroup.module.css";
import { MODAL_OPTION, PrimitiveValue, columnsTable } from "../../table.model";
import { DataErrorHandler } from "../../../DataErrorHandler/DataErrorHandler";
import { LanguageInterface } from "@/global/language/constants/language.model";
import { Modal } from "../../../modal/modal";
import { RootState } from "@/global/redux/store";
import { SERVICE_STATUS } from "@/global/redux/serviceSlices/types/serviceTypes";
import { Table } from "../../table";
import { Vehicles } from "@/global/redux/serviceSlices/vehiclesSlice";

interface Props {
  LANGUAGE: LanguageInterface;
  closeModal: () => void;
  dataObject: { [key: string]: PrimitiveValue };
}

interface Props {
  LANGUAGE: LanguageInterface;
  closeModal: () => void;
  dataObject: { [key: string]: PrimitiveValue };
}

export const TableModalViewGroup = ({
  LANGUAGE,
  closeModal,
  dataObject,
}: Props) => {
  const [groupsVehicles, setGroupsVehicles] = useState<Vehicles[]>([]);

  const { vehiclesData, vehiclesStatus } = useSelector(
    (state: RootState) => state.vehicles
  );

  useEffect(() => {
    if (!vehiclesData || null === vehiclesData?.value || !dataObject?.id)
      return;
    const filtered: Vehicles[] = vehiclesData.value.vehicles.filter(
      (vehicle) => vehicle.group[0].id === dataObject.id
    );
    setGroupsVehicles(filtered);
  }, [vehiclesData, dataObject]);

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
  ];

  const vehiclesTableData = useMemo(() => {
    return groupsVehicles?.map((value) => ({
      plate: value.plate,
      name: value.name,
      brand: value.brand,
      model: value.model,
      year: value.year,
      groupName: value.group[0].name,
      groupId: value.group[0].id,
      imeIs: value.imeIs[0],
      id: value.id,
      serialNumber: value.serialNumber,
      vehicleType: value.vehicleType,
      driver: value.driver,
    }));
  }, [groupsVehicles]);

  return (
    <Modal
      LANGUAGE={LANGUAGE}
      closeModal={closeModal}
      title={
        LANGUAGE.management.tableColumns.groupVehicles + " " + dataObject.group
      }
    >
      <div className={styles.container}>
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
      </div>
    </Modal>
  );
};
