import styles from "./header.module.css";

export const Header = () => {
  return (
    <header className={`${styles.header}`}>
      <nav className={styles.navBar}></nav>
    </header>
  );
};
