"use client";
import { useLanguage } from "@/modules/global/language/components/languageProvider/languageProvider";
import { TelemetryHome } from "@/modules/telemetryObd/components";

export default function Telemetry() {
  const LANGUAGE = useLanguage();

  return (
    <div>
      <TelemetryHome LANGUAGE={LANGUAGE} />
    </div>
  );
}
