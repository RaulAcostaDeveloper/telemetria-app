"use client";
import { FuelDataProvider } from "@/modules/fuel/components";
import { ModuleSeparator } from "@/modules/home/components/moduleSeparator/moduleSeparator";
import { OBDDataProvider } from "@/modules/telemetryObd/components";
import { useLanguage } from "@/global/language/components/languageProvider/languageProvider";

export default function Home() {
  const LANGUAGE = useLanguage();

  return (
    <div>
      <ModuleSeparator title={LANGUAGE.sectionName.fuel} />
      <FuelDataProvider LANGUAGE={LANGUAGE} hideTabs />
      <ModuleSeparator title={LANGUAGE.sectionName.telemetryobd} />
      <OBDDataProvider LANGUAGE={LANGUAGE} hideTable />
    </div>
  );
}
