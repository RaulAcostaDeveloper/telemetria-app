import styles from "./menuRoute.module.css";
import Link from "next/link";

interface Props {
  Icon: React.ElementType;
  active: boolean;
  isOpen: boolean | null;
  route: string;
  title: string;
}

export const MenuRoute = ({ Icon, active, isOpen, route, title }: Props) => {
  return (
    <Link
      className={`${styles.menuRoute} ${active ? styles.selected : ""}`}
      href={route}
      title={title}
    >
      <Icon sx={{ fontSize: "3rem" }} />
      {(isOpen === null || isOpen === true) && (
        <span className={`${styles.routeName}`}>{title}</span>
      )}
    </Link>
  );
};
