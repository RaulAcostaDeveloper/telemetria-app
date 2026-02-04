import { LanguageInterface } from "@/global/language/constants/language.model";

interface Props {
  LANGUAGE: LanguageInterface;
}

export const PermissionsTabContent = ({ LANGUAGE }: Props) => {
  return <div>{LANGUAGE.iam.tabs.permissions}</div>;
};
