import { Header } from "../header/header";
import { Menu } from "../menu/menu";
import styles from "./headerContainer.module.css";

export const HeaderContainer = () => {
  return (
    <div className={`${styles.headerContainer}`}>
      <Menu />
      <Header />
    </div>
  );
};
