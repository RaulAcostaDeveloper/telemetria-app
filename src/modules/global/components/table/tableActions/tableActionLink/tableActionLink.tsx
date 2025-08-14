import Link from "next/link";
import styles from "./tableActionLink.module.css";

interface Props {
  Icon?: React.ElementType;
  children?: React.ReactNode;
  hasCompleteRoute: boolean;
  href: string;
  noImeiTitle?: string;
  title: string;
}

export const TableActionLink = ({
  Icon,
  children,
  hasCompleteRoute,
  href,
  noImeiTitle,
  title,
}: Props) => {
  return (
    <div
      className={`${styles.button}  ${
        hasCompleteRoute ? "" : `${styles.reportsDisabled}`
      }`}
      title={`${hasCompleteRoute ? "" : noImeiTitle}`}
    >
      <Link
        className={`${hasCompleteRoute ? "" : styles.reportDisabled}`}
        title={title}
        href={href}
      >
        {Icon ? <Icon sx={{ fontSize: "2rem" }} /> : children}
      </Link>
    </div>
  );
};
