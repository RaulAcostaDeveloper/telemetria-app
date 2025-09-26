import styles from "./tabSelector.module.css";
import { SvgIconProps } from "@mui/material/SvgIcon";

type IconComponent = React.ComponentType<SvgIconProps>;
type TabOption = {
  text: string;
  icon?: IconComponent;
  iconStyle?: object;
};
interface Props {
  selectedTab: number;
  setSelectedTab: (option: number) => void;
  tabOptions: TabOption[];
}

export const TabSelector = ({
  selectedTab,
  setSelectedTab,
  tabOptions,
}: Props) => {
  return (
    <div className={`${styles.tabSelector}`}>
      {tabOptions.map((option, index) => (
        <button
          className={`${styles.tabElement} ${
            selectedTab === index ? styles.tabSelected : ""
          }`}
          onClick={() => setSelectedTab(index)}
          key={option.text}
        >
          {option.icon && (
            <option.icon
              fontSize="inherit"
              style={option.iconStyle && option.iconStyle}
            />
          )}
          {option.text}
        </button>
      ))}
    </div>
  );
};
