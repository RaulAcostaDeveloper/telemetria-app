import { GeneralButton } from "../generalButton/generalButton";
import { Modal } from "../modal/modal";
import styles from "./tableAddFormModal.module.css";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { LanguageSelector } from "../../language/utils/languageSelector";

interface Props {
  closeModal: () => void;
}

export const TableAddFormModal = ({ closeModal }: Props) => {
  const LANGUAGE = LanguageSelector();

  return (
    <Modal closeModal={closeModal}>
      <div className={`${styles.inside}`}>
        <div className={`${styles.generalTitle}`}>
          <h3>{LANGUAGE.table.formTitles.createElement}</h3>
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
            title={LANGUAGE.table.buttons.saveNew}
            type={1}
            Icon={<AddCircleOutlineIcon />}
            callback={() => {}}
          />
        </div>
      </div>
    </Modal>
  );
};
