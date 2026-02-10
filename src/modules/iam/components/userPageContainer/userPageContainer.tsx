import { LanguageInterface } from "@/global/language/constants/language.model";
import { UserPageForm } from "./userPageForm/userPageForm";

interface Props {
  userId: string;
  LANGUAGE: LanguageInterface;
}

export const UserPageContainer = ({ userId, LANGUAGE }: Props) => {
  return <UserPageForm userId={userId} LANGUAGE={LANGUAGE} />;
};
