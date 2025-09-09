import { LanguageInterface } from "../../language/constants/language.model";
import { ErrorMessage } from "../errorMessage/errorMessage";
import LoaderAnimation from "../loaderAnimation/loaderAnimation";

interface Props {
  LANGUAGE: LanguageInterface;
  hasData: boolean;
  infoStatus: string;
  messageIfEmpty?: string;
}

const decideFeedback = ({
  LANGUAGE,
  hasData,
  infoStatus,
  messageIfEmpty,
}: Props) => {
  switch (infoStatus) {
    case "loading":
      return (
        <div>
          <LoaderAnimation />
        </div>
      );
      break;
    case "succeeded":
      return (
        hasData === false && (
          <ErrorMessage message={messageIfEmpty} LANGUAGE={LANGUAGE} />
        )
      );
      break;
    case "failed":
      return <ErrorMessage LANGUAGE={LANGUAGE} />;
    default:
      break;
  }
};

export const StatusNoInfoComponent = ({
  LANGUAGE,
  hasData,
  infoStatus,
  messageIfEmpty = LANGUAGE.notifications.nullValue,
}: Props): JSX.Element => {
  return (
    <div>
      {decideFeedback({ LANGUAGE, hasData, infoStatus, messageIfEmpty })}
    </div>
  );
};
