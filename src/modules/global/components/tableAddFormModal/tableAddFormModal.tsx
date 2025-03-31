import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CloseIcon from "@mui/icons-material/Close";

import styles from "./tableAddFormModal.module.css";
import { ButtonTypes } from "../generalButton/generalButton.model";
import { GeneralButton } from "../generalButton/generalButton";
import { LanguageSelector } from "../../language/utils/languageSelector";
import { Modal } from "../modal/modal";

interface Props {
  closeModal: () => void;
}

export const TableAddFormModal = ({ closeModal }: Props) => {
  const LANGUAGE = LanguageSelector();

  return (
    <Modal closeModal={closeModal}>
      <div className={`${styles.inside}`}>
        <div className={`${styles.formTitle}`}>
          <h3>{LANGUAGE.table.formTitles.createElement}</h3>
        </div>
        <div className={`${styles.content}`}></div>
        <div className={`${styles.buttons}`}>
          <GeneralButton
            title={LANGUAGE.table.buttons.cancel}
            type={ButtonTypes.NEUTRAL}
            Icon={<CloseIcon />}
            callback={closeModal}
          />
          <GeneralButton
            title={LANGUAGE.table.buttons.saveNew}
            type={ButtonTypes.CONFIRM}
            Icon={<AddCircleOutlineIcon />}
            callback={() => {}}
          />
        </div>
      </div>
    </Modal>
  );
};
