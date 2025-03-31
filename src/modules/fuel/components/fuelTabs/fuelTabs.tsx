import { TabsContent } from "@/modules/global/components";
import { LanguageSelector } from "@/modules/global/language/utils/languageSelector";

export const FuelTabs: React.FC = () => {
  const LANGUAGE = LanguageSelector();
  const tabOptions = [
    LANGUAGE.fuel.tabs.groups,
    LANGUAGE.fuel.tabs.unitys,
    LANGUAGE.fuel.tabs.zones,
  ];
  return (
    <TabsContent
      tabOptions={tabOptions}
      tabContents={[
        <div key={1}>1</div>,
        <div key={2}>2</div>,
        <div key={3}>3</div>,
      ]}
    />
  );
};
