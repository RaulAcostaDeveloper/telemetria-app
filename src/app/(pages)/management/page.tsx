"use client";
import { TabsContent } from "@/modules/global/components";
import { useLanguage } from "@/modules/global/language/components/languageProvider/languageProvider";

export default function Management() {
  const LANGUAGE = useLanguage();
  const fuelTabs = [
    LANGUAGE.management.tabs.accounts,
    LANGUAGE.management.tabs.clients,
    LANGUAGE.management.tabs.devices,
    LANGUAGE.management.tabs.drivers,
    LANGUAGE.management.tabs.groups,
    LANGUAGE.management.tabs.users,
    LANGUAGE.management.tabs.vehicles,
  ];

  return (
    <div>
      <TabsContent tabOptions={fuelTabs} tabContents={[<div key={0}></div>]} />
    </div>
  );
}
