"use client";
import { useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import styles from "./tableAddNewButton.module.css";
import { ButtonTypes } from "../../generalButton/generalButton.model";
import { GeneralButton } from "../../generalButton/generalButton";
import { LanguageInterface } from "@/global/language/constants/language.model";
import { MODAL_OPTION } from "../table.model";
import { TableModalCreateHandler } from "../tableModalCreateHandler/tableModalCreateHandler";

interface Props {
  LANGUAGE: LanguageInterface;
  modalOption?: MODAL_OPTION;
}

export const TableAddNewButton = ({ LANGUAGE, modalOption }: Props) => {
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
      {showEditModal && modalOption && (
        <TableModalCreateHandler
          LANGUAGE={LANGUAGE}
          closeModal={() => setShowEditModal(false)}
          modalOption={modalOption}
        />
      )}
    </>
  );
};
