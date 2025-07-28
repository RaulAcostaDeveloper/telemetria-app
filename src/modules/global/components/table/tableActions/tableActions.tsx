"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import DeleteIcon from "@mui/icons-material/Delete";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import styles from "./tableActions.module.css";
import { LanguageInterface } from "@/modules/global/language/constants/language.model";
import { PrimitiveValue } from "../table.model";
import { TableDeleteModal } from "../tableDeleteModal/tableDeleteModa";
import { TableEditFormModal } from "../tableEditFormModal/tableEditFormModa";

interface Props {
  LANGUAGE: LanguageInterface;
  dataObject: { [key: string]: PrimitiveValue };
  deleteFunction?: (idElement: string | number) => void;
  idKey?: string;
  showDelete?: boolean;
  showEdit?: boolean;
  showGoFuel?: boolean;
  showGoOBT?: boolean;
  showView?: boolean;
  viewPath?: string;
  editFormContent?: React.FC<{
    dataObject: { [key: string]: PrimitiveValue };
    setIsDisabled: (val: boolean) => void;
    setSaveFunction: (cb: () => void) => void;
  }>;
}

// Acciones de la tabla para los registros
export const TableActions = ({
  LANGUAGE,
  dataObject,
  deleteFunction,
  editFormContent,
  idKey,
  showDelete,
  showEdit,
  showGoFuel,
  showGoOBT,
  showView,
  viewPath,
}: Props) => {
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  return (
    <div className={`${styles.tableActions}`}>
      {/* Botón "Ver" */}
      {showView && viewPath && (
        <Link
          className={`${styles.button}`}
          title={LANGUAGE.table.actions.viewDetail}
          href={viewPath}
        >
          <VisibilityIcon />
        </Link>
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

              {/* Reporte individual de OBT */}
              {showGoOBT && (
                <Link
                  className={`${styles.button}`}
                  title={LANGUAGE.table.actions.goObtReport}
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
        {showEditModal && (
          <TableEditFormModal
            LANGUAGE={LANGUAGE}
            closeModal={() => setShowEditModal(false)}
            dataObject={dataObject}
            editFormContent={editFormContent}
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
      </>
    </div>
  );
};
