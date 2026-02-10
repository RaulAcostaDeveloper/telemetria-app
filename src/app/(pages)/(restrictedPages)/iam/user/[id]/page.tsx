"use client";

import { UserPageContainer } from "@/modules/iam/components/userPageContainer/userPageContainer";
import { useLanguage } from "@/global/language/components/languageProvider/languageProvider";

interface Page {
  params: {
    id: string;
  };
}

export default function User({ params }: Page) {
  const { id } = params; // id del usuario

  const LANGUAGE = useLanguage();

  return <UserPageContainer LANGUAGE={LANGUAGE} userId={id} />;
}
