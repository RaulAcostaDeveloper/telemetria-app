import CloseIcon from "@mui/icons-material/Close";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

import styles from "./tableDeleteModal.module.css";
import { ButtonTypes } from "../generalButton/generalButton.model";
import { GeneralButton } from "../generalButton/generalButton";
import { Modal } from "../modal/modal";
import { LanguageInterface } from "../../language/constants/language.model";

interface Props {
  closeModal: () => void;
  LANGUAGE: LanguageInterface;
}

export const TableDeleteModal = ({ closeModal, LANGUAGE }: Props) => {
  return (
    <Modal LANGUAGE={LANGUAGE} closeModal={closeModal}>
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
