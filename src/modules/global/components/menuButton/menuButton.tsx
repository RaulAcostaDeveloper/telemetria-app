import styles from "./menuButton.module.css";

interface Props {
  Icon: React.ElementType;
  callback: () => void;
  isOpen: boolean | null;
  title: string;
}

export const MenuButton = ({ Icon, callback, isOpen, title }: Props) => {
  return (
    <button
      className={`${styles.menuButton} ${isOpen ? "" : styles.close}`}
      onClick={callback}
      title={title}
    >
      <Icon sx={{ fontSize: "3rem" }} />
      {(isOpen === null || isOpen === true) && (
        <span className={`${styles.title}`}>{title}</span>
      )}
    </button>
  );
};
