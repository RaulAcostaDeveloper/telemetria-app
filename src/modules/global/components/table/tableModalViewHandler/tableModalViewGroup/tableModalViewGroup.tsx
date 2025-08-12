// Ver los vehículos que pertenecen a este grupo
"use client";
import { useSelector } from "react-redux";

import LoaderAnimation from "../../../loaderAnimation/loaderAnimation";
import styles from "./tableModalViewGroup.module.css";
import {
  MODAL_OPTION,
  PrimitiveValue,
  columnsTable,
  dataTable,
} from "../../table.model";
import { LanguageInterface } from "@/modules/global/language/constants/language.model";
import { Modal } from "../../../modal/modal";
import { RootState } from "@/globalConfig/redux/store";
import { Table } from "../../table";

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
  const { vehiclesData, vehiclesStatus } = useSelector(
    (state: RootState) => state.vehicles
  );

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

  const vehiclesTableData: dataTable | undefined =
    vehiclesData?.value.vehicles.map((value) => ({
      plate: value.plate,
      year: value.year,
      name: value.name,
      brand: value.brand,
      model: value.model,
      imeIs: value.imeIs,
      id: value.id,
    }));

  return (
    <Modal
      LANGUAGE={LANGUAGE}
      closeModal={closeModal}
      title={
        LANGUAGE.management.tableColumns.groupVehicles + " " + dataObject.group
      }
    >
      <div className={styles.container}>
        {vehiclesStatus === "succeeded" && vehiclesTableData ? (
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
        ) : (
          <div>
            <LoaderAnimation />
          </div>
        )}
      </div>
    </Modal>
  );
};
