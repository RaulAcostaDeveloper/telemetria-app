import styles from "./mainWrapper.module.css";
import { Header } from "../header/header";
import { Menu } from "../menu/menu";

interface Props {
  children: React.ReactNode;
}

export const MainWrapper = ({ children }: Props) => {
  return (
    <div className={`${styles.mainWrapper}`}>
      <Menu />
      <div className={`${styles.leftContent}`}>
        <Header />
        {children}
      </div>
    </div>
  );
};
