"use client";
import { HomeBriefFuelDataProvider } from "@/modules/home/components";
import { useLanguage } from "@/modules/global/language/components/languageProvider/languageProvider";
import { TelemetryHome } from "@/modules/telemetryObd/components";

export default function Home() {
  const LANGUAGE = useLanguage();

  return (
    <div>
      {/* <section> */}
      <HomeBriefFuelDataProvider />
      {/* </section> */}
      <TelemetryHome LANGUAGE={LANGUAGE} />
    </div>
  );
}
