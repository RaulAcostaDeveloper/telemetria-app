"use client";
import { useState } from "react";
import Link from "next/link";

import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import VisibilityIcon from "@mui/icons-material/Visibility";

import styles from "./tableActions.module.css";
import { TableDeleteModal } from "../tableDeleteModal/tableDeleteModa";
import { TableEditFormModal } from "../tableEditFormModal/tableEditFormModa";
import { LanguageInterface } from "../../language/constants/language.model";

interface Props {
  LANGUAGE: LanguageInterface;
  dataObject: { [key: string]: string | number };
  deleteFunction?: (idElement: string | number) => void;
  idKey?: string;
  showActions?: boolean;
  showDelete?: boolean;
  showEdit?: boolean;
  showView?: boolean;
  viewPath?: string;
  editFormContent?: React.FC<{
    dataObject: { [key: string]: string | number };
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

      {/* Botón "Editar" */}
      {showEdit && (
        <button
          className={`${styles.button}`}
          title={LANGUAGE.table.actions.editElement}
          onClick={() => setShowEditModal(true)}
        >
          <ModeEditIcon />
        </button>
      )}

      {/* Botón "Eliminar" */}
      {showDelete && (
        <button
          className={`${styles.button}`}
          title={LANGUAGE.table.actions.deleteElement}
          onClick={() => setShowDeleteModal(true)}
        >
          <DeleteIcon />
        </button>
      )}

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
    </div>
  );
};
