"use client";
import { useState } from "react";
import { GeneralButton } from "../generalButton/generalButton";
import styles from "./tableAddNewButton.module.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { TableAddFormModal } from "../tableAddFormModal/tableAddFormModal";
import { LanguageSelector } from "../../language/utils/languageSelector";

export const TableAddNewButton = () => {
  const [showEditModal, setShowEditModal] = useState<Boolean>(false);
  const LANGUAGE = LanguageSelector();
  return (
    <>
      <GeneralButton
        Icon={<AddCircleOutlineIcon />}
        buttonStyle={styles.tableAddNewButton}
        callback={() => setShowEditModal(true)}
        title={LANGUAGE.table.buttons.create}
        type={1}
      />
      {showEditModal && (
        <TableAddFormModal closeModal={() => setShowEditModal(false)} />
      )}
    </>
  );
};
