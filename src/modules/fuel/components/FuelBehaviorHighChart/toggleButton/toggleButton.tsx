import styles from "./toggleButton.module.css";

interface Props {
  isOn: boolean;
  action: () => void;
  title: string;
  activeColor: string;
}

export const ToggleButton = ({ isOn, action, title, activeColor }: Props) => {
  return (
    <div className={styles.toggleButton} onClick={() => action()}>
      <label className={`${styles.switch}`}>
        <input type="checkbox" checked={isOn} />
        <span
          className={styles.slider}
          style={isOn ? { backgroundColor: activeColor } : undefined}
        />
      </label>
      <span>{title}</span>
    </div>
  );
};
