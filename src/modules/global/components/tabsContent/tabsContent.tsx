"use client";
import { useState } from "react";

import styles from "./tabsContent.module.css";
import { TabSelector } from "./tabSelector/tabSelector";
import { SvgIconProps } from "@mui/material/SvgIcon";

type IconComponent = React.ComponentType<SvgIconProps>;

type TabOption = {
  text: string;
  icon?: IconComponent;
};

interface Props {
  tabContents: React.ReactNode[];
  tabOptions: TabOption[];
}

export const TabsContent = ({ tabContents, tabOptions }: Props) => {
  const [selectedTab, setSelectedTab] = useState<number>(0);

  return (
    <div className={`${styles.tabsContent}`}>
      <TabSelector
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        tabOptions={tabOptions}
      />
      <div className={`${styles.tabContent}`}>
        {tabOptions?.map((tabOption, index) => (
          <div key={tabOption.text}>
            {selectedTab === index && tabContents[index]}
          </div>
        ))}
      </div>
    </div>
  );
};
