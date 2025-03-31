import styles from "./tableDeleteModal.module.css";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { GeneralButton } from "../generalButton/generalButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CloseIcon from "@mui/icons-material/Close";
import { Modal } from "../modal/modal";
import { LanguageSelector } from "../../language/utils/languageSelector";

interface Props {
  closeModal: () => void;
}

export const TableDeleteModal = ({ closeModal }: Props) => {
  const LANGUAGE = LanguageSelector();

  return (
    <Modal closeModal={closeModal}>
      <>
        <div className={`${styles.warningIconSection}`}>
          <div className={`${styles.warningIconContainer}`}>
            <WarningAmberIcon
              sx={{ fontSize: "4rem", color: "red" }}
              className={`${styles.warningIcon}`}
            />
          </div>
        </div>
        <div className={`${styles.adviceSection}`}>
          <h3>{LANGUAGE.table.formTitles.deleteElement}</h3>
          <p>{LANGUAGE.table.formTitles.deleteSubString}</p>
        </div>
        <div className={`${styles.buttons}`}>
          <GeneralButton
            title={LANGUAGE.table.buttons.cancel}
            type={6}
            Icon={<CloseIcon />}
            callback={closeModal}
            buttonStyle={`${styles.button}`}
          />
          <GeneralButton
            title={LANGUAGE.table.buttons.delete}
            type={3}
            Icon={<DeleteForeverIcon />}
            callback={() => {}}
            buttonStyle={`${styles.button}`}
          />
        </div>
      </>
    </Modal>
  );
};
