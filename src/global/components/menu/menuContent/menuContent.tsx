"use client";

import AddCardIcon from "@mui/icons-material/AddCard";
import HomeIcon from "@mui/icons-material/Home";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import Assignment from "@mui/icons-material/Assignment";
import LogoutIcon from "@mui/icons-material/Logout";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import QueryStats from "@mui/icons-material/QueryStats";

import styles from "./menuContent.module.css";
import { ButtonTypes } from "../../generalButton/generalButton.model";
import { GeneralButton } from "../../generalButton/generalButton";
import { LanguageInterface } from "../../../language/constants/language.model";
import { MenuRoute } from "../menuRoute/menuRoute";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ConfirmationModal } from "../menuConfirmationModal/confirmationModal";

interface Props {
  logoutState: () => void;
  LANGUAGE: LanguageInterface;
  isOpen: boolean | null;
}

export const MenuContent = ({ isOpen, LANGUAGE, logoutState }: Props) => {
  const pathname = usePathname();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const menuList = [
    {
      icon: HomeIcon,
      route: "/home",
      title: LANGUAGE.sectionName.home,
    },
    {
      icon: PeopleAltIcon,
      route: "/iam",
      title: LANGUAGE.sectionName.iam,
    },
    {
      icon: Assignment,
      route: "/management",
      title: LANGUAGE.sectionName.management,
    },
    {
      icon: AddCardIcon,
      route: "/resources",
      title: LANGUAGE.sectionName.resources,
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
            callback={() => setShowLogoutModal(true)}
            placeholder={LANGUAGE.menu.buttons.logOut}
            title={isOpen ? LANGUAGE.menu.buttons.logOut : ""}
            titleStyle={styles.buttonTitle}
            type={ButtonTypes.NEUTRAL}
          />
        </div>
      </div>
      {showLogoutModal && (
        <ConfirmationModal
          LANGUAGE={LANGUAGE}
          closeModal={() => setShowLogoutModal(false)}
          logoutState={logoutState}
        ></ConfirmationModal>
      )}
    </>
  );
};
