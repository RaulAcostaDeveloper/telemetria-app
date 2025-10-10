import styles from "./cardGenThird.module.css";

interface Props {
  children: React.ReactNode;
}

/** Forma básica de contorno de carta, con ancho fijo de 320px */
export default function CardGenThird({ children }: Props) {
  return <div className={styles.cardborder}>{children}</div>;
}
