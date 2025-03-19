import styles from "./menuButton.module.css";

interface Props {
  title: string;
  Icon: React.ElementType;
  isOpen: boolean | null;
  callback: () => void;
}

export const MenuButton = ({ Icon, callback, isOpen, title }: Props) => {
  return (
    <button className={`${styles.menuButton}`} onClick={callback} title={title}>
      <Icon sx={{ fontSize: "3rem" }} />
      {(isOpen === null || isOpen === true) && (
        <span className={`${styles.title}`}>{title}</span>
      )}
    </button>
  );
};
