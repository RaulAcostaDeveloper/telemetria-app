"use client";
import { useState } from "react";

import styles from "./tabsContent.module.css";
import { TabSelector } from "../tabSelector/tabSelector";

interface Props {
  tabContents: React.ReactNode[];
  tabOptions: string[];
}

export const TabsContent = ({ tabContents, tabOptions }: Props) => {
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
