import ErrorIcon from "@mui/icons-material/Error";

import styles from "./errorMessage.module.css";
import { LanguageInterface } from "../../language/constants/language.model";

interface Props {
  message?: string;
  LANGUAGE: LanguageInterface;
}

export const ErrorMessage = ({ message, LANGUAGE }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.element}>
        <div className={styles.icon}>
          <ErrorIcon sx={{ fontSize: "3rem" }} />
        </div>
        {message ? (
          <span className={styles.errorMessage}>{message}</span>
        ) : (
          <span className={styles.errorMessage}>
            {LANGUAGE.notifications.genericServiceError}
          </span>
        )}
      </div>
    </div>
  );
};
