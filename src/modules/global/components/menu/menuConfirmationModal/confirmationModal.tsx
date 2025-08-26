import styles from "./confirmationModal.module.css";
import { LanguageInterface } from "@/modules/global/language/constants/language.model";
import { Modal } from "../../modal/modal";
import { ButtonTypes } from "../../generalButton/generalButton.model";
import { GeneralButton } from "../../generalButton/generalButton";

interface Props {
  LANGUAGE: LanguageInterface;
  closeModal: () => void;
  logoutState: () => void;
}

export const ConfirmationModal = ({
  LANGUAGE,
  closeModal,
  logoutState,
}: Props) => {
  return (
    <Modal
      LANGUAGE={LANGUAGE}
      closeModal={closeModal}
      title={LANGUAGE.menu.modal.titleLogout}
    >
      <div className={styles.title}>
        <p className={styles.message}>{LANGUAGE.menu.modal.messageLogout}</p>
        <div className={styles.buttons}>
          <GeneralButton
            type={ButtonTypes.NEUTRAL}
            title={LANGUAGE.menu.modal.buttonCancel}
            callback={closeModal}
          />
          <GeneralButton
            type={ButtonTypes.CONFIRM}
            title={LANGUAGE.menu.modal.buttonAccept}
            callback={logoutState}
          />
        </div>
      </div>
    </Modal>
  );
};
