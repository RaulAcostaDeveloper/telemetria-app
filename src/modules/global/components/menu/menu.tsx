import styles from "./menu.module.css";
import { MenuContent } from "./menuContent/menuContent";
import { LanguageInterface } from "../../language/constants/language.model";
import { MenuHeader } from "./menuHeader/menuHeader";

interface Props {
  isMenuOpen: boolean | null;
  setIsMenuOpen: (isOpen: boolean) => void;
  LANGUAGE: LanguageInterface;
}

export const Menu = ({ isMenuOpen, setIsMenuOpen, LANGUAGE }: Props) => {
  return (
    <>
      <div
        className={`${styles.menu} ${
          isMenuOpen ? `${styles.open}` : `${styles.close}`
        }`}
      >
        <MenuHeader
          LANGUAGE={LANGUAGE}
          isOpen={isMenuOpen}
          setIsOpen={setIsMenuOpen}
        />
        <MenuContent LANGUAGE={LANGUAGE} isOpen={isMenuOpen} />
      </div>

      <div
        className={`${
          isMenuOpen ? `${styles.ghostMenuOpen}` : `${styles.ghostMenuClosed}`
        }`}
      >
        {/* Ghost menu to fix the space */}
      </div>
    </>
  );
};
