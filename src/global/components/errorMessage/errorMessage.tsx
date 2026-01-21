import ErrorIcon from "@mui/icons-material/Error";

import styles from "./errorMessage.module.css";
import { LanguageInterface } from "../../language/constants/language.model";

interface Props {
  message?: string;
  message2?: string;
  LANGUAGE?: LanguageInterface;
}

export const ErrorMessage = ({ message, message2, LANGUAGE }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.element}>
        <div className={styles.icon}>
          <ErrorIcon sx={{ fontSize: "3rem" }} />
        </div>
        {message ? (
          <div>
            <span className={styles.errorMessage}>{message}</span>
            {message2 && (
              <span className={styles.errorMessage}>{message2}</span>
            )}
          </div>
        ) : (
          <span className={styles.errorMessage}>
            {LANGUAGE && LANGUAGE.notifications.genericServiceError}
          </span>
        )}
      </div>
    </div>
  );
};
