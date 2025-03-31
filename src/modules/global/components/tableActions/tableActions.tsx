"use client";
import styles from "./tableActions.module.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { TableDeleteModal } from "../tableDeleteModal/tableDeleteModa";
import { useState } from "react";
import { TableEditFormModal } from "../tableEditFormModal/tableEditFormModa";
import { LanguageSelector } from "../../language/utils/languageSelector";

interface Props {
  showActions?: boolean;
  showDelete?: boolean;
  showEdit?: boolean;
  showView?: boolean;
}

export const TableActions = ({ showDelete, showEdit, showView }: Props) => {
  const [showDeleteModal, setShowDeleteModal] = useState<Boolean>(false);
  const [showEditModal, setShowEditModal] = useState<Boolean>(false);
  const LANGUAGE = LanguageSelector();

  return (
    <div className={`${styles.tableActions}`}>
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
      {showDeleteModal && (
        <TableDeleteModal closeModal={() => setShowDeleteModal(false)} />
      )}
      {showEditModal && (
        <TableEditFormModal closeModal={() => setShowEditModal(false)} />
      )}
    </div>
  );
};
