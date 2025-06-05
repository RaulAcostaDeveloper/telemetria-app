"use client";
import { FuelDataProvider, FuelFilter } from "@/modules/fuel/components";

import { useLanguage } from "@/modules/global/language/components/languageProvider/languageProvider";

export default function Fuel() {
  const LANGUAGE = useLanguage();
  return (
    <div>
      <FuelFilter LANGUAGE={LANGUAGE} />
      <FuelDataProvider LANGUAGE={LANGUAGE} />
    </div>
  );
}
