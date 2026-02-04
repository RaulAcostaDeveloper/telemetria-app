import { LanguageInterface } from "@/global/language/constants/language.model";

interface Props {
  LANGUAGE: LanguageInterface;
}

export const RolesTabContent = ({ LANGUAGE }: Props) => {
  return <div>{LANGUAGE.iam.tabs.roles}</div>;
};
