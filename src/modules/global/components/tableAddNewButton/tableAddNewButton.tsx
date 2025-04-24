"use client";
import { useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import styles from "./tableAddNewButton.module.css";
import { ButtonTypes } from "../generalButton/generalButton.model";
import { GeneralButton } from "../generalButton/generalButton";
import { LanguageSelector } from "../../language/utils/languageSelector";
import { TableAddFormModal } from "../tableAddFormModal/tableAddFormModal";

interface Props {
  addFormContent?: React.FC<{
    dataObject?: { [key: string]: string | number };
    setIsDisabled: (val: boolean) => void;
    setSaveFunction: (cb: () => void) => void;
  }>;
}

export const TableAddNewButton = ({ addFormContent }: Props) => {
  const LANGUAGE = LanguageSelector();
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  return (
    <>
      <GeneralButton
        Icon={<AddCircleOutlineIcon />}
        buttonStyle={styles.tableAddNewButton}
        callback={() => setShowEditModal(true)}
        title={LANGUAGE.table.buttons.create}
        type={ButtonTypes.CONFIRM}
      />

      {/* Modal de CREAR registro */}
      {/* Recibe el componente de formulario de CREAR */}
      {showEditModal && addFormContent && (
        <TableAddFormModal
          addFormContent={addFormContent}
          closeModal={() => setShowEditModal(false)}
        />
      )}
    </>
  );
};
