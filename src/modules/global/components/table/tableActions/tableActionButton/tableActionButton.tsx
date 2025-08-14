import styles from "./tableActionButton.module.css";

interface Props {
  Icon?: React.ElementType;
  callBack: () => void;
  children?: React.ReactNode;
  title: string;
}

export const TableActionButton = ({
  Icon,
  callBack,
  children,
  title,
}: Props) => {
  return (
    <button className={`${styles.button}`} title={title} onClick={callBack}>
      {Icon ? <Icon sx={{ fontSize: "2rem" }} /> : children}
    </button>
  );
};
