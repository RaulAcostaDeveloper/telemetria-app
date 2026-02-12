"use client";
import { useLanguage } from "@/global/language/components/languageProvider/languageProvider";
import { ResourcesDataProvider } from "@/modules/resources/components";

export default function Resources() {
  const LANGUAGE = useLanguage();

  return <ResourcesDataProvider LANGUAGE={LANGUAGE} />;
}
