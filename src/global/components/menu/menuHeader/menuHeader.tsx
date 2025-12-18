import Image from "next/image";
import styles from "./menuHeader.module.css";
import { LanguageInterface } from "@/global/language/constants/language.model";

interface Props {
  isOpen: boolean | null;
  setIsOpen: (isOpen: boolean) => void;
  LANGUAGE: LanguageInterface;
}

export const MenuHeader = ({ isOpen, setIsOpen, LANGUAGE }: Props) => {
  return (
    <div
      className={`${styles.header} ${isOpen ? styles.isOpen : ""}`}
      onClick={() => setIsOpen(!isOpen)}
      title={isOpen ? LANGUAGE.menu.titles.close : LANGUAGE.menu.titles.open}
    >
      <div className={styles.container}>
        {isOpen ? (
          // IMAGEN PROPORCIÓN LOGO 6:1
          <Image
            alt={LANGUAGE.menu.titles.logo}
            height={26}
            src={"/png/Imagotipo_color-5-textLarge.png"}
            width={83}
          />
        ) : (
          // IMAGEN PROPORCIÓN LOGO 1:1
          <Image
            alt={LANGUAGE.menu.titles.logo}
            height={30}
            src={"/svg/mini_Imagotipo_color-5.svg"}
            width={30}
          />
        )}
      </div>
    </div>
  );
};
