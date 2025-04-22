"use client";
import React, { useState } from "react";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CloseIcon from "@mui/icons-material/Close";

import styles from "./tableAddFormModal.module.css";
import { ButtonTypes } from "../generalButton/generalButton.model";
import { GeneralButton } from "../generalButton/generalButton";
import { LanguageSelector } from "../../language/utils/languageSelector";
import { Modal } from "../modal/modal";

interface Props {
  addFormContent?: React.FC<{
    dataObject?: { [key: string]: string | number };
    setIsDisabled: (val: boolean) => void;
    setSaveFunction: (cb: () => void) => void;
  }>;
  closeModal: () => void;
}

export const TableAddFormModal = ({ closeModal, addFormContent }: Props) => {
  const LANGUAGE = LanguageSelector();
  const [isSaveDisabled, setIsDisabled] = useState(true);
  const [saveFunction, setSaveFunction] = useState<() => void>(() => {});

  // Asignación a una variable con mayúscula
  const AddFormContent = addFormContent;

  return (
    <Modal closeModal={closeModal}>
      <div className={`${styles.inside}`}>
        <div className={`${styles.formTitle}`}>
          <h3>{LANGUAGE.table.formTitles.createElement}</h3>
        </div>
        <div className={`${styles.content}`}>
          {/* Renderizado de addFormContent */}
          {AddFormContent && (
            <AddFormContent
              setIsDisabled={setIsDisabled}
              setSaveFunction={setSaveFunction}
            />
          )}
        </div>
        <div className={`${styles.buttons}`}>
          <GeneralButton
            title={LANGUAGE.table.buttons.cancel}
            type={ButtonTypes.NEUTRAL}
            Icon={<CloseIcon />}
            callback={closeModal}
          />
          <GeneralButton
            Icon={<AddCircleOutlineIcon />}
            callback={saveFunction}
            disabled={isSaveDisabled}
            title={LANGUAGE.table.buttons.saveNew}
            type={ButtonTypes.CONFIRM}
          />
        </div>
      </div>
    </Modal>
  );
};
