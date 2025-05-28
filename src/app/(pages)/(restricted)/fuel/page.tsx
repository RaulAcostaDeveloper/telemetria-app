"use client";
import { FuelDataProvider } from "@/modules/fuel/components";

import { useLanguage } from "@/modules/global/language/components/languageProvider/languageProvider";

export default function Fuel() {
  const LANGUAGE = useLanguage();
  return (
    <div>
      <h1>Fuel page</h1>
      <FuelDataProvider LANGUAGE={LANGUAGE} />
    </div>
  );
}
