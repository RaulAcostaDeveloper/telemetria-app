import styles from "./cardGeneric.module.css";

interface Props {
  children: React.ReactNode;
}

export default function CardGeneric({ children }: Props) {
  return <div className={styles.cardborder}>{children}</div>;
}
