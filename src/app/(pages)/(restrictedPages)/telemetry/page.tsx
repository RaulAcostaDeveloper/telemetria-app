"use client";
import { OBDDataProvider } from "@/modules/telemetryObd/components";
import { useLanguage } from "@/global/language/components/languageProvider/languageProvider";

export default function Telemetry() {
  const LANGUAGE = useLanguage();

  return <OBDDataProvider LANGUAGE={LANGUAGE} />;
}
