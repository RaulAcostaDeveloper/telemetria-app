"use client";
import AddCardIcon from "@mui/icons-material/AddCard";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";

import LogoutIcon from "@mui/icons-material/Logout";
import styles from "./menuContent.module.css";
import { MenuButton } from "../menuButton/menuButton";
import { MenuRoute } from "../menuRoute/menuRoute";
import { usePathname } from "next/navigation";
import { LanguageInterface } from "../../language/constants/language.model";

interface Props {
  isOpen: boolean | null;
  LANGUAGE: LanguageInterface;
}

export const MenuContent = ({ isOpen, LANGUAGE }: Props) => {
  const pathname = usePathname();

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

  return (
    <>
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
            callback={() => {}}
          />
        </div>
      </div>
    </>
  );
};
