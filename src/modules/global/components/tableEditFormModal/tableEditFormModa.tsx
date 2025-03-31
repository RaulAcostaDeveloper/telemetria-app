import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CloseIcon from "@mui/icons-material/Close";

import styles from "./tableEditFormModal.module.css";
import { ButtonTypes } from "../generalButton/generalButton.model";
import { GeneralButton } from "../generalButton/generalButton";
import { LanguageSelector } from "../../language/utils/languageSelector";
import { Modal } from "../modal/modal";

interface Props {
  closeModal: () => void;
}

export const TableEditFormModal = ({ closeModal }: Props) => {
  const LANGUAGE = LanguageSelector();

  return (
    <Modal closeModal={closeModal}>
      <div className={`${styles.inside}`}>
        <div className={`${styles.formTitle}`}>
          <h3>{LANGUAGE.table.actions.editElement}</h3>
        </div>
        <div className={`${styles.content}`}></div>
        <div className={`${styles.buttons}`}>
          <GeneralButton
            Icon={<CloseIcon />}
            callback={closeModal}
            title={LANGUAGE.table.buttons.cancel}
            type={ButtonTypes.NEUTRAL}
          />
          <GeneralButton
            Icon={<AddCircleOutlineIcon />}
            callback={() => {}}
            title={LANGUAGE.table.buttons.saveEdit}
            type={ButtonTypes.CONFIRM}
          />
        </div>
      </div>
    </Modal>
  );
};
