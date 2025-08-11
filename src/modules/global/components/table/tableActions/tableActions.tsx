"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import ArticleIcon from "@mui/icons-material/Article";
import DeleteIcon from "@mui/icons-material/Delete";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import VisibilityIcon from "@mui/icons-material/Visibility";

import styles from "./tableActions.module.css";
import { LanguageInterface } from "@/modules/global/language/constants/language.model";
import { MODAL_OPTION, PrimitiveValue } from "../table.model";
import { TableDeleteModal } from "../tableDeleteModal/tableDeleteModa";
import { TableModalEditHandler } from "../tableModalEditHandler/tableModalEditHandler";
import { TableModalViewHandler } from "../tableModalViewHandler/tableModalHandler";

interface Props {
  LANGUAGE: LanguageInterface;
  dataObject: { [key: string]: PrimitiveValue };
  deleteFunction?: (idElement: string | number) => void;
  idKey?: string;
  modalOption?: MODAL_OPTION;
  showDelete?: boolean;
  showEdit?: boolean;
  showGoFuel?: boolean;
  showGoOBD?: boolean;
  showGoPageView?: boolean;
  showViewModal?: boolean;
  viewPath?: string;
}

// Acciones de la tabla para los registros
export const TableActions = ({
  LANGUAGE,
  dataObject,
  deleteFunction,
  idKey,
  modalOption,
  showDelete,
  showEdit,
  showGoFuel,
  showGoOBD,
  showGoPageView,
  showViewModal,
  viewPath,
}: Props) => {
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [viewModal, setViewModal] = useState<boolean>(false);

  return (
    <div className={`${styles.tableActions}`}>
      {/* Botón "Ver" */}
      {showGoPageView && viewPath && (
        <Link
          className={`${styles.button}`}
          title={LANGUAGE.table.actions.goPage + " " + viewPath}
          href={viewPath}
        >
          <ArticleIcon sx={{ fontSize: "2rem" }} />
        </Link>
      )}
      {showViewModal && modalOption && (
        <button
          className={`${styles.button}`}
          title={LANGUAGE.table.actions.viewDetail}
          onClick={() => setViewModal(true)}
        >
          <VisibilityIcon sx={{ fontSize: "2rem" }} />
        </button>
      )}
      {idKey && dataObject[idKey] !== null && (
        <>
          {/* Requiere IMEI */}
          {dataObject[idKey].toString().length > 10 && (
            <>
              {/* Reporte individual de combustible */}
              {showGoFuel && (
                <Link
                  className={`${styles.button}`}
                  title={LANGUAGE.table.actions.goFuelReport}
                  href={`/fuel/vehicle/${dataObject[idKey]}`}
                >
                  <LocalGasStationIcon sx={{ fontSize: "2rem" }} />
                </Link>
              )}

              {/* Reporte individual de OBD */}
              {showGoOBD && (
                <Link
                  className={`${styles.button}`}
                  title={LANGUAGE.table.actions.goObdReport}
                  href={`/telemetry/vehicle/${dataObject[idKey]}`}
                >
                  <Image
                    src={"/png/car-gps.png"}
                    width={22}
                    height={22}
                    alt="car services"
                  />
                </Link>
              )}
            </>
          )}

          {/* No requiere imei > 10 */}
          {/* Editar */}
          {showEdit && (
            <button
              className={`${styles.button}`}
              title={LANGUAGE.table.actions.editElement}
              onClick={() => setShowEditModal(true)}
            >
              <ModeEditIcon />
            </button>
          )}

          {/* Eliminar */}
          {showDelete && (
            <button
              className={`${styles.button}`}
              title={LANGUAGE.table.actions.deleteElement}
              onClick={() => setShowDeleteModal(true)}
            >
              <DeleteIcon />
            </button>
          )}
        </>
      )}
      <>
        {/* Modal que contiene el formulario de Editar*/}
        {showEditModal && modalOption && (
          <TableModalEditHandler
            LANGUAGE={LANGUAGE}
            closeModal={() => setShowEditModal(false)}
            modalOption={modalOption}
          />
        )}

        {/* Modal que contiene el formulario de Eliminar*/}
        {showDeleteModal && (
          <TableDeleteModal
            LANGUAGE={LANGUAGE}
            closeModal={() => setShowDeleteModal(false)}
            deleteFunction={deleteFunction}
            idObject={idKey ? dataObject[idKey] : undefined}
          />
        )}

        {viewModal && modalOption && (
          <TableModalViewHandler
            LANGUAGE={LANGUAGE}
            closeModal={() => setViewModal(false)}
            dataObject={dataObject}
            modalOption={modalOption}
          />
        )}
      </>
    </div>
  );
};
