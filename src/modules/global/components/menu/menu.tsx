import styles from "./menu.module.css";
import { MenuContent } from "./menuContent/menuContent";
import { LanguageInterface } from "../../language/constants/language.model";
import { MenuHeader } from "./menuHeader/menuHeader";

interface Props {
  LANGUAGE: LanguageInterface;
  isMenuOpen: boolean | null;
  logoutState: () => void;
  setIsMenuOpen: (isOpen: boolean) => void;
}

export const Menu = ({
  LANGUAGE,
  logoutState,
  isMenuOpen,
  setIsMenuOpen,
}: Props) => {
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
        <MenuContent
          LANGUAGE={LANGUAGE}
          isOpen={isMenuOpen}
          logoutState={logoutState}
        />
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
