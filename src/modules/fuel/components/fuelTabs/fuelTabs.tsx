import { LanguageInterface } from "@/global/language/constants/language.model";
import { TabsContent } from "@/global/components";

interface Props {
  LANGUAGE: LanguageInterface;
}

export const FuelTabs = ({ LANGUAGE }: Props) => {
  const tabOptions = [
    { text: LANGUAGE.fuel.tabs.charges }, //.fuel.tabs.groups
    { text: LANGUAGE.fuel.tabs.unitys },
    { text: LANGUAGE.fuel.tabs.discharges }, //.fuel.tabs.zones
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
