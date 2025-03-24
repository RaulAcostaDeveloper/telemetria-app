"use client";
import { useState } from "react";
import { TabSelector } from "../tabSelector/tabSelector";
import styles from "./tabsContent.module.css";

interface Props {
  tabOptions: string[];
  tabContents: React.ReactNode[];
}

export const TabsContent = ({ tabOptions, tabContents }: Props) => {
  const [selectedTab, setSelectedTab] = useState<string>(tabOptions[0]);

  return (
    <div className={`${styles.tabsContent}`}>
      <TabSelector
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        tabOptions={tabOptions}
      />
      <div className={`${styles.tabContent}`}>
        {tabOptions?.map((tabOption, index) => (
          <div key={tabOption}>
            {selectedTab === tabOption && tabContents[index]}
          </div>
        ))}
      </div>
    </div>
  );
};
