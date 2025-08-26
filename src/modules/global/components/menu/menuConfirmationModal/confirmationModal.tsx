import styles from "./confirmationModal.module.css";
import { LanguageInterface } from "@/modules/global/language/constants/language.model";
import { Modal } from "../../modal/modal";

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
          <button onClick={closeModal}>
            {LANGUAGE.menu.modal.buttonCancel}
          </button>
          <button onClick={logoutState}>
            {LANGUAGE.menu.modal.buttonAccept}
          </button>
        </div>
      </div>
    </Modal>
  );
};
