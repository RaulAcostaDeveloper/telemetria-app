// Ver los vehículos que pertenecen a este grupo
"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import LoaderAnimation from "../../../loaderAnimation/loaderAnimation";
import styles from "./tableModalViewGroup.module.css";
import {
  MODAL_OPTION,
  PrimitiveValue,
  columnsTable,
  dataTable,
} from "../../table.model";
import { ErrorMessage } from "../../../errorMessage/errorMessage";
import { LanguageInterface } from "@/modules/global/language/constants/language.model";
import { Modal } from "../../../modal/modal";
import { RootState } from "@/globalConfig/redux/store";
import { Table } from "../../table";
import { Vehicles } from "@/globalConfig/redux/slices/vehiclesSlice";

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
    if (!vehiclesData || !dataObject?.id) return;
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
      columnName: LANGUAGE.management.tableColumns.year,
      defaultSpace: 2,
      orderColumn: true,
      minMaxFilter: true,
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
  ];

  const vehiclesTableData: dataTable | undefined = groupsVehicles?.map(
    (value) => ({
      plate: value.plate,
      year: value.year,
      name: value.name,
      brand: value.brand,
      model: value.model,
      groupName: value.group[0].name,
      groupId: value.group[0].id,
      imeIs: value.imeIs,
      id: value.id,
      serialNumber: value.serialNumber,
      vehicleType: value.vehicleType,
      driver: value.driver,
    })
  );

  return (
    <Modal
      LANGUAGE={LANGUAGE}
      closeModal={closeModal}
      title={
        LANGUAGE.management.tableColumns.groupVehicles + " " + dataObject.group
      }
    >
      <div className={styles.container}>
        {vehiclesStatus === "succeeded" && vehiclesTableData && (
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

        {vehiclesStatus === "loading" && (
          <div>
            <LoaderAnimation />
          </div>
        )}

        {vehiclesStatus === "failed" && <ErrorMessage LANGUAGE={LANGUAGE} />}
      </div>
    </Modal>
  );
};
