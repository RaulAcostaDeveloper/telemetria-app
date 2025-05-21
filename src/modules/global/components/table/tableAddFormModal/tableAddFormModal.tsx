"use client";
import React, { useState } from "react";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CloseIcon from "@mui/icons-material/Close";

import styles from "./tableAddFormModal.module.css";
import { ButtonTypes } from "../../generalButton/generalButton.model";
import { GeneralButton } from "../../generalButton/generalButton";
import { LanguageInterface } from "@/modules/global/language/constants/language.model";
import { Modal } from "../../modal/modal";

interface Props {
  LANGUAGE: LanguageInterface;
  createFormContent?: React.FC<{
    dataObject?: { [key: string]: string | number };
    setIsDisabled: (val: boolean) => void;
    setSaveFunction: (cb: () => void) => void;
  }>;
  closeModal: () => void;
}

export const TableAddFormModal = ({
  closeModal,
  createFormContent,
  LANGUAGE,
}: Props) => {
  const [isSaveDisabled, setIsDisabled] = useState(true);
  const [saveFunction, setSaveFunction] = useState<() => void>(() => {});

  // Asignación a una variable con mayúscula
  // Para poder usarlo como componente
  const CreateFormContent = createFormContent;

  return (
    <Modal LANGUAGE={LANGUAGE} closeModal={closeModal}>
      <div className={`${styles.inside}`}>
        <div className={`${styles.formTitle}`}>
          <h3>{LANGUAGE.table.formTitles.createElement}</h3>
        </div>

        {/* Renderizado de CreateFormContent */}
        {/* Recibe como parámetro setIsDisabled para controlar el activar el botón */}
        {/* Y recibe como parámetro setSaveFunction para definir la función de CREAR */}
        {/* Es importante usar como ejemplo el componente ExampleTableForm */}
        <div className={`${styles.content}`}>
          {CreateFormContent && (
            <CreateFormContent
              setIsDisabled={setIsDisabled}
              setSaveFunction={setSaveFunction}
            />
          )}
        </div>

        {/* Contenido genérico de los modales de CREAR */}
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
