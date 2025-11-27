"use client";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import ArticleIcon from "@mui/icons-material/Article";
import DeleteIcon from "@mui/icons-material/Delete";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import VisibilityIcon from "@mui/icons-material/Visibility";

import styles from "./tableActions.module.css";
import { LanguageInterface } from "@/global/language/constants/language.model";
import { MODAL_OPTION, PrimitiveValue } from "../table.model";
import { TableActionButton } from "./tableActionButton/tableActionButton";
import { TableActionLink } from "./tableActionLink/tableActionLink";
import { TableModals } from "./tableModals/tableModals";

interface Props {
  LANGUAGE: LanguageInterface;
  dataObject: { [key: string]: PrimitiveValue };
  deleteFunction?: (idElement: string | number) => void;
  idImei?: string;
  idKey?: string;
  idZone?: string;
  modalOption?: MODAL_OPTION;
  showDelete?: boolean;
  showEdit?: boolean;
  showGoGenericReport?: boolean;
  showGoPageView?: boolean;
  showViewModal?: boolean;
  viewPath?: string;
}

// Acciones de la tabla para los registros
export const TableActions = ({
  LANGUAGE,
  dataObject,
  deleteFunction,
  idImei,
  idKey,
  idZone,
  modalOption,
  showDelete,
  showEdit,
  showGoGenericReport,
  showGoPageView,
  showViewModal,
  viewPath,
}: Props) => {
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [viewModal, setViewModal] = useState<boolean>(false);

  const escFunction = useCallback((event: { key: string }) => {
    if (event.key === "Escape") {
      setViewModal(false);
      setShowEditModal(false);
      setShowDeleteModal(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [escFunction]);

  return (
    <div className={`${styles.tableActions}`}>
      {showViewModal && modalOption && (
        <TableActionButton
          title={LANGUAGE.table.actions.viewDetail}
          callBack={() => setViewModal(true)}
          Icon={VisibilityIcon}
        />
      )}

      {showEdit && (
        <TableActionButton
          title={LANGUAGE.table.actions.editElement}
          callBack={() => setShowEditModal(true)}
          Icon={ModeEditIcon}
        />
      )}

      {idImei && (
        <TableActionLink
          hasCompleteRoute={idImei ? true : false}
          noImeiTitle={LANGUAGE.table.actions.noImei}
          title={LANGUAGE.table.actions.goFuelReport}
          Icon={LocalGasStationIcon}
          href={`/fuel/vehicle/${dataObject[idImei ?? ""]}`}
        />
      )}

      {idImei && (
        <TableActionLink
          hasCompleteRoute={idImei ? true : false}
          noImeiTitle={LANGUAGE.table.actions.noImei}
          title={LANGUAGE.table.actions.goObdReport}
          href={`/telemetry/vehicle/${dataObject[idImei ?? ""]}`}
        >
          <Image
            src={"/png/car-gps.png"}
            width={22}
            height={22}
            alt="car services"
          />
        </TableActionLink>
      )}

      {idZone && (
        <TableActionLink
          hasCompleteRoute={idZone ? true : false}
          title={LANGUAGE.table.actions.goZoneReport}
          Icon={ArrowRightAltIcon}
          href={`/zones/zone/${dataObject[idZone ?? ""] ?? ""}`}
        />
      )}

      {showGoGenericReport && viewPath && (
        <TableActionLink
          hasCompleteRoute={idKey ? true : false}
          title={LANGUAGE.table.actions.goGenericReport}
          Icon={ArrowRightAltIcon}
          href={`${viewPath}${dataObject[idKey ?? ""] ?? ""}`}
        />
      )}

      {showGoPageView && (
        <TableActionLink
          hasCompleteRoute={viewPath ? true : false}
          noImeiTitle={""}
          title={LANGUAGE.table.actions.goPage + " " + viewPath}
          Icon={ArticleIcon}
          href={`${viewPath}${dataObject[idKey ?? ""] ?? ""}`}
        />
      )}

      {showDelete && (
        <TableActionButton
          title={LANGUAGE.table.actions.deleteElement}
          callBack={() => setShowDeleteModal(true)}
          Icon={DeleteIcon}
        />
      )}

      <TableModals
        showDeleteModal={showDeleteModal}
        LANGUAGE={LANGUAGE}
        showEditModal={showEditModal}
        modalOption={modalOption}
        viewModal={viewModal}
        dataObject={dataObject}
        idObject={idKey ? dataObject[idKey] : null}
        deleteFunction={deleteFunction}
        closeDeleteModal={() => setShowDeleteModal(false)}
        closeEditModal={() => setShowEditModal(false)}
        closeViewModal={() => setViewModal(false)}
      />
    </div>
  );
};
