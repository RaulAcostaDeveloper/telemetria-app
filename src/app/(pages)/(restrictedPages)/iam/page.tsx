"use client";

import { IAmMainContainer } from "@/modules/iam/components/iAmMainContainer/iAmMainContainer";
import { useLanguage } from "@/global/language/components/languageProvider/languageProvider";

export default function Home() {
  const LANGUAGE = useLanguage();

  return <IAmMainContainer LANGUAGE={LANGUAGE} />;
}
