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
  statusCode?: number;
}

export const decideFeedback = ({
  LANGUAGE,
  hasData,
  lessThanOneDay,
  infoStatus,
  statusCode,
}: Props) => {
  switch (infoStatus) {
    case SERVICE_STATUS.loading:
      return <LoaderAnimation />;
    case SERVICE_STATUS.succeeded:
      return (
        hasData === false && (
          <>
            {statusCode === 429 && (
              <ErrorMessage
                message={LANGUAGE.notifications.tooManyRequest}
                message2={LANGUAGE.notifications.pleaseReTry}
                LANGUAGE={LANGUAGE}
              />
            )}

            {lessThanOneDay && (
              <ErrorMessage
                message={LANGUAGE.notifications.lessThanOneDay}
                LANGUAGE={LANGUAGE}
              />
            )}

            {/* Caso genérico */}
            {statusCode !== 429 && !lessThanOneDay && (
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
        <>
          <ErrorMessage LANGUAGE={LANGUAGE} />
          <div className={styles.onErrorAndTry}>
            <LoaderAnimation cellSize={10} />
          </div>
        </>
      );
    default:
      break;
  }
};
