"use client";
import { useState } from "react";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CloseIcon from "@mui/icons-material/Close";

import styles from "./tableEditFormModal.module.css";
import { ButtonTypes } from "../generalButton/generalButton.model";
import { GeneralButton } from "../generalButton/generalButton";
import { LanguageSelector } from "../../language/utils/languageSelector";
import { Modal } from "../modal/modal";

interface Props {
  closeModal: () => void;
  dataObject: { [key: string]: string | number };
  editFormContent?: React.FC<{
    dataObject: { [key: string]: string | number };
    setIsDisabled: (val: boolean) => void;
    setSaveFunction: (cb: () => void) => void;
  }>;
}

export const TableEditFormModal = ({
  closeModal,
  dataObject,
  editFormContent,
}: Props) => {
  const LANGUAGE = LanguageSelector();
  const [isSaveDisabled, setIsDisabled] = useState(true);
  const [saveFunction, setSaveFunction] = useState<() => void>(() => {});

  // Asignación a una variable con mayúscula
  // Para poder usarlo como componente
  const EditFormContent = editFormContent;

  return (
    <Modal closeModal={closeModal}>
      <div className={`${styles.inside}`}>
        <div className={`${styles.formTitle}`}>
          <h3>{LANGUAGE.table.actions.editElement}</h3>
        </div>

        {/* Renderizado de editFormContent */}
        {/* Recibe como parámetro setIsDisabled para controlar el activar el botón */}
        {/* Y recibe como parámetro setSaveFunction para definir la función de EDITAR */}
        {/* Es importante usar como ejemplo el componente ExampleTableForm */}
        <div className={`${styles.content}`}>
          {EditFormContent && (
            <EditFormContent
              dataObject={dataObject}
              setIsDisabled={setIsDisabled}
              setSaveFunction={setSaveFunction}
            />
          )}
        </div>

        {/* Contenido genérico de los modales de EDITAR */}
        <div className={`${styles.buttons}`}>
          <GeneralButton
            Icon={<CloseIcon />}
            callback={closeModal}
            title={LANGUAGE.table.buttons.cancel}
            type={ButtonTypes.NEUTRAL}
          />
          <GeneralButton
            Icon={<AddCircleOutlineIcon />}
            callback={saveFunction}
            disabled={isSaveDisabled}
            title={LANGUAGE.table.buttons.saveEdit}
            type={ButtonTypes.CONFIRM}
          />
        </div>
      </div>
    </Modal>
  );
};
