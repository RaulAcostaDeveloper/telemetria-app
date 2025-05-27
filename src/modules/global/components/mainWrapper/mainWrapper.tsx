"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import styles from "./mainWrapper.module.css";
import {
  localStorageGetItem,
  localStorageSetItem,
} from "../../localStorage/utils/storageService";
import { ENGLISH } from "../../language/constants/english";
import { Header } from "../header/header";
import { LANGUAGE_OPTIONS } from "../../language/utils/languageSelector.model";
import { LanguageContext } from "../../language/components/languageProvider/languageProvider";
import { LanguageInterface } from "../../language/constants/language.model";
import { Menu } from "../menu/menu";
import { PageContainer } from "../pageContainer/pageContainer";
import { RootState } from "@/globalConfig/redux/store";
import { SPANISH } from "../../language/constants/spanish";
import { STORAGE_KEYS } from "../../localStorage/constants/storageKeys";
import { UserData } from "@/globalConfig/redux/slices/authSlice";
import { useAuth } from "../../../auth/utils";

interface Props {
  children: React.ReactNode;
}

export const MainWrapper = ({ children }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean | null>(null);
  const [LANGUAGE, setLanguageObject] = useState<LanguageInterface>(SPANISH);

  const languageSelected = useSelector(
    (state: RootState) => state.languageOption.languageSelected
  );

  const { isAuthenticated, tryLoginHook, logoutHook } = useAuth();

  useEffect(() => {
    // Simular datos de usuario
    const user: UserData = {
      email: "user@test.com",
      name: "usernameTest",
      id: "12412",
    };

    // Traer token del localStorage o definir uno de prueba
    // Cambiar a "" o null si se quiere forzar logout temporalmente
    const token = "112e21e";

    // Intentar iniciar sesión si hay token
    tryLoginHook(token, user);
  }, []);

  // Aquí trae de redux y modifica el LANGUAGE
  // Actualizar en caso de agregar un nuevo idioma
  useEffect(() => {
    switch (languageSelected) {
      case LANGUAGE_OPTIONS.SPANISH:
        setLanguageObject(SPANISH);
        break;
      case LANGUAGE_OPTIONS.ENGLISH:
        setLanguageObject(ENGLISH);
        break;
      default:
        setLanguageObject(SPANISH);
        break;
    }
  }, [languageSelected]);

  // Ejemplo de como cambiar el idioma
  // setTimeout(() => {
  //   dispatch(setLanguageReducer(LANGUAGE_OPTIONS.ENGLISH));
  // }, 5000);

  useEffect(() => {
    const defaultValue: boolean = false;
    const storedValue: boolean | null = localStorageGetItem(
      STORAGE_KEYS.MENU_OPEN
    );
    setIsMenuOpen(storedValue !== null ? storedValue : defaultValue);
  }, []);

  useEffect(() => {
    if (isMenuOpen !== null) {
      localStorageSetItem(STORAGE_KEYS.MENU_OPEN, isMenuOpen);
    }
  }, [isMenuOpen]);

  // Cerrar el menú en resolución movile
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        if (window.innerWidth <= 768) {
          setTimeout(() => {
            setIsMenuOpen(false);
          }, 10);
        }
      };
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return (
    <div className={`${styles.mainWrapper}`}>
      {isAuthenticated && (
        <Menu
          LANGUAGE={LANGUAGE}
          isMenuOpen={isMenuOpen}
          logoutHook={logoutHook}
          setIsMenuOpen={setIsMenuOpen}
        />
      )}

      <div className={`${styles.rightContent}`}>
        {isAuthenticated && (
          <Header LANGUAGE={LANGUAGE} isMenuOpen={isMenuOpen} />
        )}

        {/* Contenido de la página */}
        <LanguageContext.Provider value={LANGUAGE}>
          <PageContainer>{children}</PageContainer>
        </LanguageContext.Provider>
      </div>
    </div>
  );
};
