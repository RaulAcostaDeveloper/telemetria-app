"use client";

import { useLanguage } from "@/global/language/components/languageProvider/languageProvider";

export default function Home() {
  const LANGUAGE = useLanguage();

  return (
    <div>
      <p>{LANGUAGE.sectionName.iam}</p>
    </div>
  );
}
