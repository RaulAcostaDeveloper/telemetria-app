import styles from "./cardGenThird.module.css";

interface Props {
  children: React.ReactNode;
}

export default function CardGenThird({ children }: Props) {
  return <div className={styles.cardborder}>{children}</div>;
}
