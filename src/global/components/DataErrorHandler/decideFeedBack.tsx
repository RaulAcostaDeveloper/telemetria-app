import { LanguageInterface } from "@/global/language/constants/language.model";
import { SERVICE_STATUS } from "@/global/redux/serviceSlices/types/serviceTypes";
import styles from "./dataErrorHandler.module.css";
import LoaderAnimation from "../loaderAnimation/loaderAnimation";
import { ErrorMessage } from "../errorMessage/errorMessage";

interface Props {
  LANGUAGE: LanguageInterface;
  hasData: boolean;
  lessThanOneDay: boolean;
  infoStatus: SERVICE_STATUS;
}

export const decideFeedback = ({
  LANGUAGE,
  hasData,
  lessThanOneDay,
  infoStatus,
}: Props) => {
  switch (infoStatus) {
    case SERVICE_STATUS.loading:
      return (
        <div>
          <LoaderAnimation />
        </div>
      );
    case SERVICE_STATUS.succeeded:
      return (
        hasData === false && (
          <>
            {lessThanOneDay ? (
              <ErrorMessage
                message={LANGUAGE.notifications.lessThanOneDay}
                LANGUAGE={LANGUAGE}
              />
            ) : (
              <ErrorMessage
                message={LANGUAGE.notifications.nullValue}
                LANGUAGE={LANGUAGE}
              />
            )}
          </>
        )
      );
    case SERVICE_STATUS.failed:
      return (
        <div>
          <ErrorMessage LANGUAGE={LANGUAGE} />
          <div className={styles.onErrorAndTry}>
            <LoaderAnimation cellSize={10} />
          </div>
        </div>
      );
    default:
      break;
  }
};
