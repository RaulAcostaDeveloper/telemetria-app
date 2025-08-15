"use client";
import AddCardIcon from "@mui/icons-material/AddCard";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import HomeIcon from "@mui/icons-material/Home";
import QueryStats from "@mui/icons-material/QueryStats";
import LogoutIcon from "@mui/icons-material/Logout";

import styles from "./menuContent.module.css";
import { ButtonTypes } from "../../generalButton/generalButton.model";
import { GeneralButton } from "../../generalButton/generalButton";
import { LanguageInterface } from "../../../language/constants/language.model";
import { MenuRoute } from "../menuRoute/menuRoute";
import { usePathname } from "next/navigation";

interface Props {
  logoutState: () => void;
  LANGUAGE: LanguageInterface;
  isOpen: boolean | null;
}

export const MenuContent = ({ isOpen, LANGUAGE, logoutState }: Props) => {
  const pathname = usePathname();

  const menuList = [
    {
      icon: HomeIcon,
      route: "/home",
      title: LANGUAGE.sectionName.home,
    },
    {
      icon: AddCardIcon,
      route: "/management",
      title: LANGUAGE.sectionName.management,
    },
    {
      icon: LocalGasStationIcon,
      route: "/fuel",
      title: LANGUAGE.sectionName.fuel,
    },
    {
      icon: QueryStats,
      route: "/telemetry",
      title: LANGUAGE.sectionName.telemetryobd,
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
            callback={logoutState}
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
