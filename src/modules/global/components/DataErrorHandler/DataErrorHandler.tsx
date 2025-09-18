import { LanguageInterface } from "../../language/constants/language.model";
import { ErrorMessage } from "../errorMessage/errorMessage";
import LoaderAnimation from "../loaderAnimation/loaderAnimation";
import styles from "./dataErrorHandler.module.css";

interface Props {
  LANGUAGE: LanguageInterface;
  hasData: boolean;
  infoStatus: string;
}

const decideFeedback = ({ LANGUAGE, hasData, infoStatus }: Props) => {
  switch (infoStatus) {
    case "loading":
      return (
        <div>
          <LoaderAnimation />
        </div>
      );
    case "succeeded":
      return (
        hasData === false && (
          <ErrorMessage
            message={LANGUAGE.notifications.nullValue}
            LANGUAGE={LANGUAGE}
          />
        )
      );
    case "failed":
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
