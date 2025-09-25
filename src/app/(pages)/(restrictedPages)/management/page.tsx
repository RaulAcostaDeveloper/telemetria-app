"use client";
import { useLanguage } from "@/modules/global/language/components/languageProvider/languageProvider";
import { ManagementDataProvider } from "@/modules/management/components";

export default function Management() {
  const LANGUAGE = useLanguage();

  return (
    <div>
      <ManagementDataProvider LANGUAGE={LANGUAGE} />
    </div>
  );
}
