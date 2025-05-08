import styles from "./menu.module.css";
import { MenuContent } from "../menuContent/menuContent";
import { MenuHeader } from "../menuHeader/menuHeader";
import { LanguageInterface } from "../../language/constants/language.model";

interface Props {
  isMenuOpen: boolean | null;
  setIsMenuOpen: (isOpen: boolean | null) => void;
  LANGUAGE: LanguageInterface;
}

export const Menu = ({ isMenuOpen, setIsMenuOpen, LANGUAGE }: Props) => {
  return (
    <>
      <div
        className={`${styles.menu} ${
          isMenuOpen === null || isMenuOpen === true
            ? `${styles.open}`
            : `${styles.close}`
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
          isMenuOpen === null || isMenuOpen === true
            ? `${styles.ghostMenuOpen}`
            : `${styles.ghostMenuClosed}`
        }`}
      >
        {/* Ghost menu to fix the space */}
      </div>
    </>
  );
};
