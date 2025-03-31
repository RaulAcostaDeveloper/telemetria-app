import CloseIcon from "@mui/icons-material/Close";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

import styles from "./tableDeleteModal.module.css";
import { ButtonTypes } from "../generalButton/generalButton.model";
import { GeneralButton } from "../generalButton/generalButton";
import { LanguageSelector } from "../../language/utils/languageSelector";
import { Modal } from "../modal/modal";

interface Props {
  closeModal: () => void;
}

export const TableDeleteModal = ({ closeModal }: Props) => {
  const LANGUAGE = LanguageSelector();

  return (
    <Modal closeModal={closeModal}>
      <div className={`${styles.inside}`}>
        <div className={`${styles.warningIconContainer}`}>
          <div className={`${styles.warningIcon}`}>
            <WarningAmberIcon
              sx={{ fontSize: "4rem", color: "red" }}
              className={`${styles.icon}`}
            />
          </div>
        </div>
        <div className={`${styles.formTitle}`}>
          <h3>{LANGUAGE.table.formTitles.deleteElement}</h3>
          <p>{LANGUAGE.table.formTitles.deleteSubString}</p>
        </div>
        <div className={`${styles.content}`}></div>
        <div className={`${styles.buttons}`}>
          <GeneralButton
            title={LANGUAGE.table.buttons.cancel}
            type={ButtonTypes.NEUTRAL}
            Icon={<CloseIcon />}
            callback={closeModal}
            buttonStyle={`${styles.button}`}
          />
          <GeneralButton
            title={LANGUAGE.table.buttons.delete}
            type={ButtonTypes.DANGER}
            Icon={<DeleteForeverIcon />}
            callback={() => {}}
            buttonStyle={`${styles.button}`}
          />
        </div>
      </div>
      <></>
    </Modal>
  );
};
