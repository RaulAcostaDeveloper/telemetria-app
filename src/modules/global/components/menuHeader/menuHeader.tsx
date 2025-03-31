import Image from "next/image";
import { LanguageSelector } from "../../language/utils/languageSelector";
import styles from "./menuHeader.module.css";

interface Props {
  isOpen: boolean | null;
  setIsOpen: (isOpen: boolean) => void;
}

export const MenuHeader = ({ isOpen, setIsOpen }: Props) => {
  const LANGUAGE = LanguageSelector();
  return (
    <div
      className={`${styles.header}`}
      onClick={() => setIsOpen(!isOpen)}
      title={isOpen ? LANGUAGE.menu.titles.close : LANGUAGE.menu.titles.open}
    >
      {isOpen === null || isOpen === true ? (
        // IMAGEN PROPORCIÓN LOGO 6:1
        <Image
          alt={LANGUAGE.menu.titles.logo}
          height={38}
          src={"/png/imagotipo_transtelemetrix_blanco.png"}
          width={228}
        />
      ) : (
        // IMAGEN PROPORCIÓN LOGO 1:1
        <Image
          alt={LANGUAGE.menu.titles.logo}
          height={50}
          src={"/svg/Isotipo_transtelemetris.svg"}
          width={50}
        />
      )}
    </div>
  );
};
