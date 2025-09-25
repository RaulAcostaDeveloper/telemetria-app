"use client";
import { OBDDataProvider } from "@/modules/telemetryObd/components";
import { useLanguage } from "@/modules/global/language/components/languageProvider/languageProvider";
import { FuelDataProvider } from "@/modules/fuel/components";

export default function Home() {
  const LANGUAGE = useLanguage();

  return (
    <div>
      {/* <section> */}
      <FuelDataProvider LANGUAGE={LANGUAGE} hideTabs />
      {/* </section> */}
      <OBDDataProvider LANGUAGE={LANGUAGE} hideTable />
    </div>
  );
}
