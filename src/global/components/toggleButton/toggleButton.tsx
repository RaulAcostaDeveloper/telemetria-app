import styles from "./toggleButton.module.css";

interface Props {
  isOn: boolean;
  action: () => void;
  title: string;
  activeColor: string;
}

export const ToggleButton = ({ isOn, action, title, activeColor }: Props) => {
  return (
    <button className={styles.toggleButton} onClick={() => action()}>
      <label className={`${styles.switch}`}>
        {/* para activar visualmente toggle */}
        <div data-active={isOn} />
        <span
          className={styles.slider}
          style={isOn ? { backgroundColor: activeColor } : undefined}
        />
      </label>
      <span>{title}</span>
    </button>
  );
};
