import CloseIcon from "@mui/icons-material/Close";

import styles from "./modal.module.css";
import { LanguageInterface } from "../../language/constants/language.model";

interface Props {
  children: React.ReactNode;
  closeModal: () => void;
  LANGUAGE: LanguageInterface;
}

export const Modal = ({ children, closeModal, LANGUAGE }: Props) => {
  return (
    <div className={`${styles.modal}`}>
      <div className={`${styles.insideModal}`}>
        <button
          className={`${styles.closeButton}`}
          onClick={closeModal}
          title={LANGUAGE.table.actions.close}
        >
          <CloseIcon sx={{ fontSize: "2rem" }} />
        </button>

        <>{children}</>
      </div>
    </div>
  );
};
