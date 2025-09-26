import LoaderAnimation from "../loaderAnimation/loaderAnimation";
import { ErrorMessage } from "../errorMessage/errorMessage";
import { LanguageInterface } from "../../language/constants/language.model";
import { SERVICE_STATUS } from "@/global/redux/serviceSlices/types/serviceTypes";
import styles from "./dataErrorHandler.module.css";

interface Props {
  LANGUAGE: LanguageInterface;
  hasData: boolean;
  infoStatus: SERVICE_STATUS;
}

const decideFeedback = ({ LANGUAGE, hasData, infoStatus }: Props) => {
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
          <ErrorMessage
            message={LANGUAGE.notifications.nullValue}
            LANGUAGE={LANGUAGE}
          />
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

export const DataErrorHandler = ({
  LANGUAGE,
  hasData,
  infoStatus,
}: Props): JSX.Element => {
  return <div>{decideFeedback({ LANGUAGE, hasData, infoStatus })}</div>;
};
