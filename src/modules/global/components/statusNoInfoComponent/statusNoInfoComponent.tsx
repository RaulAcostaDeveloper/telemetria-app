import { LanguageInterface } from "../../language/constants/language.model";
import { ErrorMessage } from "../errorMessage/errorMessage";
import LoaderAnimation from "../loaderAnimation/loaderAnimation";

interface Props {
  LANGUAGE: LanguageInterface;
  hasData: boolean;
  infoStatus: string;
  messageIfEmpty?: string;
}

export const StatusNoInfoComponent = ({
  LANGUAGE,
  hasData,
  infoStatus,
  messageIfEmpty = LANGUAGE.notifications.nullValue,
}: Props): JSX.Element => {
  return (
    <div>
      {hasData === false && (
        <ErrorMessage message={messageIfEmpty} LANGUAGE={LANGUAGE} />
      )}

      {infoStatus === "loading" && (
        <div>
          <LoaderAnimation />
        </div>
      )}

      {infoStatus === "failed" && <ErrorMessage LANGUAGE={LANGUAGE} />}
    </div>
  );
};
