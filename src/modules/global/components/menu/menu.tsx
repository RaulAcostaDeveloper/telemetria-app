"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import AddCardIcon from "@mui/icons-material/AddCard";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import LogoutIcon from "@mui/icons-material/Logout";

import styles from "./menu.module.css";
import {
  localStorageGetItem,
  localStorageSetItem,
} from "../../localStorage/utils/storageService";
import { LanguageSelector } from "../../language/utils/languageSelector";
import { MenuRoute } from "../menuRoute/menuRoute";
import { STORAGE_KEYS } from "../../localStorage/constants/storageKeys";
import { MenuButton } from "../menuButton/menuButton";

const LANGUAGE = LanguageSelector();
const menuList = [
  {
    icon: LocalGasStationIcon,
    route: "/fuel",
    title: LANGUAGE.menu.titles.fuel,
  },
  {
    icon: AddCardIcon,
    route: "/management",
    title: LANGUAGE.menu.titles.management,
  },
];

export const Menu = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean | null>(null);

  useEffect(() => {
    // Handle movile
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const defaultValue: boolean = true;
    const storedValue: boolean | null = localStorageGetItem(
      STORAGE_KEYS.MENU_OPEN
    );
    setIsOpen(storedValue !== null ? storedValue : defaultValue);
  }, []);

  useEffect(() => {
    if (isOpen !== null) {
      localStorageSetItem(STORAGE_KEYS.MENU_OPEN, isOpen);
    }
  }, [isOpen]);

  const renderHead = () => (
    <div
      className={`${styles.header}`}
      onClick={() => setIsOpen(!isOpen)}
      title={isOpen ? LANGUAGE.menu.titles.close : LANGUAGE.menu.titles.open}
    >
      {isOpen === null || isOpen === true ? (
        // IMAGEN PROPORCIÓN 6:1
        <Image
          alt="logo company"
          height={38}
          src={"/png/imagotipo_transtelemetrix_blanco.png"}
          width={228}
        />
      ) : (
        // IMAGEN PROPORCIÓN 1:1
        <Image
          alt="logo company"
          height={50}
          src={"/svg/Isotipo_transtelemetris.svg"}
          width={50}
        />
      )}
    </div>
  );

  return (
    <div
      className={`${styles.menu} ${
        isOpen === null || isOpen === true
          ? `${styles.open}`
          : `${styles.close}`
      }`}
    >
      {/* Head */}
      {renderHead()}

      {/* Content */}
      <div className={`${styles.menuContent}`}>
        <nav>
          {menuList.map((el) => (
            <MenuRoute
              Icon={el.icon}
              active={pathname.includes(el.route)}
              isOpen={isOpen}
              key={el.title}
              route={el.route}
              title={el.title}
            />
          ))}
        </nav>
        <div className={`${styles.bottom}`}>
          <MenuButton
            title={LANGUAGE.menu.buttons.logOut}
            Icon={LogoutIcon}
            isOpen={isOpen}
            callback={() => console.log("Log out button from menu")}
          />
        </div>
      </div>
    </div>
  );
};
