import { LanguageSelector } from "../../language/utils/languageSelector";
import styles from "./modal.module.css";
import CloseIcon from "@mui/icons-material/Close";
interface Props {
  closeModal: () => void;
  children: React.ReactNode;
}
export const Modal = ({ closeModal, children }: Props) => {
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
