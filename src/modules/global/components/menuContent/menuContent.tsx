"use client";
import AddCardIcon from "@mui/icons-material/AddCard";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import LogoutIcon from "@mui/icons-material/Logout";

import styles from "./menuContent.module.css";
import { ButtonTypes } from "../generalButton/generalButton.model";
import { GeneralButton } from "../generalButton/generalButton";
import { LanguageInterface } from "../../language/constants/language.model";
import { MenuRoute } from "../menuRoute/menuRoute";
import { usePathname } from "next/navigation";

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
          <GeneralButton
            Icon={<LogoutIcon />}
            buttonStyle={styles.buttonStyle}
            callback={() => {}}
            placeholder={LANGUAGE.menu.buttons.logOut}
            title={isOpen ? LANGUAGE.menu.buttons.logOut : ""}
            titleStyle={styles.buttonTitle}
            type={ButtonTypes.NEUTRAL}
          />
        </div>
      </div>
    </>
  );
};
