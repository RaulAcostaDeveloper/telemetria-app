import styles from "./mainWrapper.module.css";
import { Header } from "../header/header";
import { Menu } from "../menu/menu";
import { PageContainer } from "../pageContainer/pageContainer";

interface Props {
  children: React.ReactNode;
}

export const MainWrapper = ({ children }: Props) => {
  return (
    <div className={`${styles.mainWrapper}`}>
      <Menu />
      <div className={`${styles.leftContent}`}>
        <Header />
        <PageContainer>{children}</PageContainer>
      </div>
    </div>
  );
};
