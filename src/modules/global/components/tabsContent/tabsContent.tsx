"use client";
import { useEffect, useState } from "react";
import { TabSelector } from "../tabSelector/tabSelector";
import styles from "./tabsContent.module.css";

export const TabsContent = () => {
  const [selectedTab, setSelectedTab] = useState<string>("tab 1");
  useEffect(() => {
    console.log("selectedTab", selectedTab);
  }, [selectedTab]);
  return (
    <div className={`${styles.tabsContent}`}>
      <TabSelector selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <div className={`${styles.tabContent}`}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem laudantium
        quae odio fuga1 tempore2 non3 nemo4 vero5 assumenda accusamus, quaerat
        ullam magni voluptatibus mollitia soluta pariatur eaque aliquam dolor
        optio.
      </div>
    </div>
  );
};
