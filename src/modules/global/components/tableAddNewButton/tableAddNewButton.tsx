"use client";
import { useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import styles from "./tableAddNewButton.module.css";
import { ButtonTypes } from "../generalButton/generalButton.model";
import { GeneralButton } from "../generalButton/generalButton";
import { LanguageSelector } from "../../language/utils/languageSelector";
import { TableAddFormModal } from "../tableAddFormModal/tableAddFormModal";

export const TableAddNewButton = () => {
  const LANGUAGE = LanguageSelector();
  const [showEditModal, setShowEditModal] = useState<Boolean>(false);

  return (
    <>
      <GeneralButton
        Icon={<AddCircleOutlineIcon />}
        buttonStyle={styles.tableAddNewButton}
        callback={() => setShowEditModal(true)}
        title={LANGUAGE.table.buttons.create}
        type={ButtonTypes.CONFIRM}
      />
      {showEditModal && (
        <TableAddFormModal closeModal={() => setShowEditModal(false)} />
      )}
    </>
  );
};
