"use client";

import { TabsContent } from "@/modules/global/components";
import { useLanguage } from "@/modules/global/language/components/languageProvider/languageProvider";

interface Page {
  params: {
    id: string;
  };
}

export default function TelemetryVehicle({ params }: Page) {
  const { id } = params;
  const LANGUAGE = useLanguage();

  const tabOptions = [
    LANGUAGE.onBoardDiagnosticsVehicle.tabs.averageRpm,
    LANGUAGE.onBoardDiagnosticsVehicle.tabs.analysis,
    LANGUAGE.onBoardDiagnosticsVehicle.tabs.totalDistance,
    LANGUAGE.onBoardDiagnosticsVehicle.tabs.totalTimeWorked,
  ];
  return (
    <div>
      <TabsContent
        tabOptions={tabOptions}
        tabContents={[
          <div key={1}></div>,
          <div key={2}></div>,
          <div key={3}></div>,
          <div key={4}></div>,
        ]}
      />
    </div>
  );
}
