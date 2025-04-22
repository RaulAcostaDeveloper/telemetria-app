"use client";
import { useState } from "react";
import Link from "next/link";

import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import VisibilityIcon from "@mui/icons-material/Visibility";

import styles from "./tableActions.module.css";
import { LanguageSelector } from "../../language/utils/languageSelector";
import { TableDeleteModal } from "../tableDeleteModal/tableDeleteModa";
import { TableEditFormModal } from "../tableEditFormModal/tableEditFormModa";

interface Props {
  dataObject: { [key: string]: string | number };
  editFormContent?: React.FC<{
    dataObject: { [key: string]: string | number };
    setIsDisabled: (val: boolean) => void;
    setSaveFunction: (cb: () => void) => void;
  }>;
  idKey?: string;
  showActions?: boolean;
  showDelete?: boolean;
  showEdit?: boolean;
  showView?: boolean;
  viewPath?: string;
}

export const TableActions = ({
  dataObject,
  editFormContent,
  showDelete,
  showEdit,
  showView,
  viewPath,
}: Props) => {
  const LANGUAGE = LanguageSelector();
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  return (
    <div className={`${styles.tableActions}`}>
      {/* Acciones de la tabla (Botones) */}
      {showView && viewPath && (
        <Link
          className={`${styles.button}`}
          title={LANGUAGE.table.actions.viewDetail}
          href={viewPath}
        >
          <VisibilityIcon />
        </Link>
      )}

      {showEdit && (
        <button
          className={`${styles.button}`}
          title={LANGUAGE.table.actions.editElement}
          onClick={() => setShowEditModal(true)}
        >
          <ModeEditIcon />
        </button>
      )}

      {showDelete && (
        <button
          className={`${styles.button}`}
          title={LANGUAGE.table.actions.deleteElement}
          onClick={() => setShowDeleteModal(true)}
        >
          <DeleteIcon />
        </button>
      )}

      {/* Modales de Editar y Borrar */}
      {showDeleteModal && (
        <TableDeleteModal closeModal={() => setShowDeleteModal(false)} />
      )}

      {showEditModal && (
        <TableEditFormModal
          closeModal={() => setShowEditModal(false)}
          dataObject={dataObject}
          editFormContent={editFormContent}
        />
      )}
    </div>
  );
};
