import Link from "next/link";
import styles from "./menuRoute.module.css";

interface Props {
  Icon: React.ElementType;
  active: boolean;
  isOpen: boolean | null;
  route: string;
  title: string;
}

export const MenuRoute = ({ route, title, isOpen, Icon, active }: Props) => {
  return (
    <Link
      className={`${styles.menuRoute} ${active ? styles.selected : ""}`}
      href={route}
      title={title}
    >
      <Icon sx={{ fontSize: "3rem" }} />
      {(isOpen === null || isOpen === true) && (
        <span className={`${styles.title}`}>{title}</span>
      )}
    </Link>
  );
};
