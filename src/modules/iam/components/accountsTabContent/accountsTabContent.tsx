import { LanguageInterface } from "@/global/language/constants/language.model";

interface Props {
  LANGUAGE: LanguageInterface;
}

export const AccountsTabContent = ({ LANGUAGE }: Props) => {
  return <div>{LANGUAGE.iam.tabs.accounts}</div>;
};
