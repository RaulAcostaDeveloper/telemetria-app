import styles from "./tabSelector.module.css";
import { SvgIconProps } from "@mui/material/SvgIcon";

type IconComponent = React.ComponentType<SvgIconProps>;
type TabOption = {
  text: string;
  icon?: IconComponent;
  style?: object;
};
interface Props {
  selectedTab: string;
  setSelectedTab: (option: string) => void;
  tabOptions: TabOption[];
}

export const TabSelector = ({
  selectedTab,
  setSelectedTab,
  tabOptions,
}: Props) => {
  return (
    <div className={`${styles.tabSelector}`}>
      {tabOptions.map((option) => (
        <button
          className={`${styles.tabElement} ${
            selectedTab === option.text ? styles.tabSelected : ""
          }`}
          onClick={() => setSelectedTab(option.text)}
          key={option.text}
        >
          {option.icon && (
            <option.icon
              fontSize="inherit"
              style={option.style && option.style}
            />
          )}
          {option.text}
        </button>
      ))}
    </div>
  );
};
