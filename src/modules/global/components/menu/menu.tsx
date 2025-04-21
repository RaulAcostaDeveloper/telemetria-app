import styles from "./menu.module.css";
import { MenuContent } from "../menuContent/menuContent";
import { MenuHeader } from "../menuHeader/menuHeader";

interface Props {
  isMenuOpen: boolean | null;
  setIsMenuOpen: (isOpen: boolean | null) => void;
}

export const Menu = ({ isMenuOpen, setIsMenuOpen }: Props) => {
  return (
    <>
      <div
        className={`${styles.menu} ${
          isMenuOpen === null || isMenuOpen === true
            ? `${styles.open}`
            : `${styles.close}`
        }`}
      >
        <MenuHeader isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
        <MenuContent isOpen={isMenuOpen} />
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
