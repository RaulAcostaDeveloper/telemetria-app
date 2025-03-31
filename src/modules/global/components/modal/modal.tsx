import CloseIcon from "@mui/icons-material/Close";

import styles from "./modal.module.css";
import { LanguageSelector } from "../../language/utils/languageSelector";

interface Props {
  children: React.ReactNode;
  closeModal: () => void;
}

export const Modal = ({ children, closeModal }: Props) => {
  const LANGUAGE = LanguageSelector();

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
