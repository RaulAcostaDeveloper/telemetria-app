"use client";
import { useLanguage } from "@/global/language/components/languageProvider/languageProvider";
import { ManagementDataProvider } from "@/modules/management/components";

export default function Management() {
  const LANGUAGE = useLanguage();

  return <ManagementDataProvider LANGUAGE={LANGUAGE} />;
}
