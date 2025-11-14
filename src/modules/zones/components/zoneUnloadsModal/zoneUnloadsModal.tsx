import { PrimitiveValue } from "@/global/components/table/table.model";
import { LanguageInterface } from "@/global/language/constants/language.model";

interface Props {
  LANGUAGE: LanguageInterface;
  closeModal: () => void;
  dataObject: { [key: string]: PrimitiveValue };
}

export const ZoneUnloadsModal = ({
  LANGUAGE,
  closeModal,
  dataObject,
}: Props) => {
  return <></>;
};
