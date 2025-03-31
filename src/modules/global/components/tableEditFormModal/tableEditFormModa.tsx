import styles from "./tableEditFormModal.module.css";
import { GeneralButton } from "../generalButton/generalButton";
import CloseIcon from "@mui/icons-material/Close";
import { Modal } from "../modal/modal";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { LanguageSelector } from "../../language/utils/languageSelector";

interface Props {
  closeModal: () => void;
}

export const TableEditFormModal = ({ closeModal }: Props) => {
  const LANGUAGE = LanguageSelector();

  return (
    <Modal closeModal={closeModal}>
      <div className={`${styles.inside}`}>
        <div className={`${styles.generalTitle}`}>
          <h3>{LANGUAGE.table.actions.editElement}</h3>
        </div>
        <div className={`${styles.content}`}></div>
        <div className={`${styles.buttons}`}>
          <GeneralButton
            title={LANGUAGE.table.buttons.cancel}
            type={6}
            Icon={<CloseIcon />}
            callback={closeModal}
          />
          <GeneralButton
            title={LANGUAGE.table.buttons.saveEdit}
            type={1}
            Icon={<AddCircleOutlineIcon />}
            callback={() => {}}
          />
        </div>
      </div>
    </Modal>
  );
};
