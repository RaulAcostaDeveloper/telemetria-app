"use client";
import { OBDDataProvider } from "@/modules/telemetryObd/components";
import { useLanguage } from "@/modules/global/language/components/languageProvider/languageProvider";

export default function Telemetry() {
  const LANGUAGE = useLanguage();

  return (
    <div>
      <OBDDataProvider LANGUAGE={LANGUAGE} showTable />
    </div>
  );
}
