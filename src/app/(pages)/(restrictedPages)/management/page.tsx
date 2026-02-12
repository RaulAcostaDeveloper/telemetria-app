"use client";
import { useLanguage } from "@/global/language/components/languageProvider/languageProvider";

export default function Management() {
  const LANGUAGE = useLanguage();

  return <div LANGUAGE={LANGUAGE} />;
}
