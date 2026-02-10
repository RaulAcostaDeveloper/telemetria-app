import CloseIcon from "@mui/icons-material/Close";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

import styles from "./deleteConfirmationModal.module.css";
import { ButtonTypes, GeneralButton, Modal } from "@/global/components";
import { LanguageInterface } from "@/global/language/constants/language.model";

interface Props {
  LANGUAGE: LanguageInterface;
  closeModal: () => void;
  deleteFunction: () => void;
}

export const DeleteConfirmationModal = ({
  LANGUAGE,
  closeModal,
  deleteFunction,
}: Props) => {
  return (
    <Modal
      LANGUAGE={LANGUAGE}
      closeModal={closeModal}
      title={LANGUAGE.iam.users.userForm.deleteUser}
    >
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
            Icon={<CloseIcon />}
            buttonStyle={`${styles.button}`}
            callback={closeModal}
            title={LANGUAGE.table.buttons.cancel}
            type={ButtonTypes.NEUTRAL}
          />
          <GeneralButton
            Icon={<DeleteForeverIcon />}
            buttonStyle={`${styles.button}`}
            callback={deleteFunction}
            title={LANGUAGE.iam.users.userForm.deleteUser}
            type={ButtonTypes.DANGER}
          />
        </div>
      </div>
      <></>
    </Modal>
  );
};
