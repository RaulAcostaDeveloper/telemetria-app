import styles from "./tabSelector.module.css";

interface Props {
  selectedTab: string;
  setSelectedTab: (name: string) => void;
  tabOptions: string[];
}

export const TabSelector = ({
  selectedTab,
  setSelectedTab,
  tabOptions,
}: Props) => {
  return (
    <div className={`${styles.tabSelector}`}>
      {tabOptions.map((name) => (
        <button
          className={`${styles.tabElement} ${
            selectedTab === name ? styles.tabSelected : ""
          }`}
          onClick={() => setSelectedTab(name)}
          key={name}
        >
          {name}
        </button>
      ))}
    </div>
  );
};
