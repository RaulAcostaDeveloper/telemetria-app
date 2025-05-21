"use client";
import { useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import styles from "./tableAddNewButton.module.css";
import { ButtonTypes } from "../../generalButton/generalButton.model";
import { GeneralButton } from "../../generalButton/generalButton";
import { LanguageInterface } from "@/modules/global/language/constants/language.model";
import { TableAddFormModal } from "../tableAddFormModal/tableAddFormModal";

interface Props {
  LANGUAGE: LanguageInterface;
  createFormContent?: React.FC<{
    dataObject?: { [key: string]: string | number };
    setIsDisabled: (val: boolean) => void;
    setSaveFunction: (cb: () => void) => void;
  }>;
}

export const TableAddNewButton = ({ createFormContent, LANGUAGE }: Props) => {
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
      {showEditModal && createFormContent && (
        <TableAddFormModal
          LANGUAGE={LANGUAGE}
          createFormContent={createFormContent}
          closeModal={() => setShowEditModal(false)}
        />
      )}
    </>
  );
};
