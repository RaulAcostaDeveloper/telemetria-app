"use client";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import VisibilityIcon from "@mui/icons-material/Visibility";

import styles from "./tableActions.module.css";
import { LanguageSelector } from "../../language/utils/languageSelector";
import { TableDeleteModal } from "../tableDeleteModal/tableDeleteModa";
import { TableEditFormModal } from "../tableEditFormModal/tableEditFormModa";

interface Props {
  showActions?: boolean;
  showDelete?: boolean;
  showEdit?: boolean;
  showView?: boolean;
}

export const TableActions = ({ showDelete, showEdit, showView }: Props) => {
  const LANGUAGE = LanguageSelector();
  const [showDeleteModal, setShowDeleteModal] = useState<Boolean>(false);
  const [showEditModal, setShowEditModal] = useState<Boolean>(false);

  return (
    <div className={`${styles.tableActions}`}>
      {/* Acciones de la tabla (Botones) */}
      {showView && (
        <button
          className={`${styles.button}`}
          title={LANGUAGE.table.actions.viewDetail}
        >
          <VisibilityIcon />
        </button>
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
        <TableEditFormModal closeModal={() => setShowEditModal(false)} />
      )}
    </div>
  );
};
