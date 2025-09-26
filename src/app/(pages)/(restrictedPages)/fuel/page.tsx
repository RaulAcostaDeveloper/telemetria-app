"use client";
import { FuelDataProvider } from "@/modules/fuel/components";
import { useLanguage } from "@/global/language/components/languageProvider/languageProvider";

export default function Fuel() {
  const LANGUAGE = useLanguage();
  return <FuelDataProvider LANGUAGE={LANGUAGE} />;
}
