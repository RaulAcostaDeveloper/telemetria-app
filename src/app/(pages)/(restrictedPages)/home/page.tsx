"use client";
import { HomeBriefFuelDataProvider } from "@/modules/home/components";
import { OBDDataProvider } from "@/modules/telemetryObd/components";
import { useLanguage } from "@/modules/global/language/components/languageProvider/languageProvider";

export default function Home() {
  const LANGUAGE = useLanguage();

  return (
    <div>
      {/* <section> */}
      <HomeBriefFuelDataProvider LANGUAGE={LANGUAGE} />
      {/* </section> */}
      <OBDDataProvider LANGUAGE={LANGUAGE} />
    </div>
  );
}
