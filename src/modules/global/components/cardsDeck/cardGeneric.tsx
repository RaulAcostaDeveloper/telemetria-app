import styles from "./cardGeneric.module.css";

interface Props {
  children: React.ReactNode;
}

/** Forma básica de contorno de carta. Sin limite de ancho ni alto */
export default function CardGeneric({ children }: Props) {
  return <div className={styles.cardborder}>{children}</div>;
}
