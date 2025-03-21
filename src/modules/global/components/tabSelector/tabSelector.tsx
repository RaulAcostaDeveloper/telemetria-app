import styles from "./tabSelector.module.css";

const tabOptions = [
  { name: "Grupos" },
  { name: "Zonas" },
  { name: "Unidades" },
];

interface Props {
  selectedTab: string;
  setSelectedTab: (name: string) => void;
}

export const TabSelector = ({ selectedTab, setSelectedTab }: Props) => {
  return (
    <div className={`${styles.tabSelector}`}>
      {tabOptions.map((el) => (
        <button
          className={`${styles.tabElement} ${
            selectedTab === el.name ? styles.tabSelected : ""
          }`}
          onClick={() => setSelectedTab(el.name)}
          key={el.name}
        >
          {el.name}
        </button>
      ))}
    </div>
  );
};
