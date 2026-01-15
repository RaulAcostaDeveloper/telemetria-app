"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import CheckLogin from "@/modules/auth/components/checkLogin/checkLogin";
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
import { MainDataFetcher } from "./mainDataFetcher/mainDataFetcher";
import { Menu } from "../menu/menu";
import { PORTUGUES } from "../../language/constants/portugues";
import { PageContainer } from "../pageContainer/pageContainer";
import { RootState } from "@/global/redux/store";
import { SERVICE_STATUS } from "@/global/redux/serviceSlices/types/serviceTypes";
import { SPANISH } from "../../language/constants/spanish";
import { STORAGE_KEYS } from "../../localStorage/constants/storageKeys";
import { ToastAlertConfig } from "../toastAlertConfig/toastAlertConfig";
import { useAuth } from "../../../modules/auth/utils";

interface Props {
  children: React.ReactNode;
}

export const MainWrapper = ({ children }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean | null>(null);
  // LANGUAGE objeto que se utiliza en la interfaz
  const [LANGUAGE, setLanguageObject] = useState<LanguageInterface>(SPANISH);

  // Opción del lenguaje (ejemplo inglés, español, etc.)
  const languageSelected = useSelector(
    (state: RootState) => state.languageOption.languageSelected
  );

  // Usuario autenticado a nivel estado de la aplicación
  const { isAuthenticated, logoutState, tryFirstServerSession } = useAuth();

  // Servicio para probar la sesion activa
  const { brandsStatus } = useSelector((state: RootState) => state.brands);

  useEffect(() => {
    tryFirstServerSession();
  }, []);

  // Actualiza el objeto LANGUAGE según la opción del estado de la aplicación
  // Actualizar en caso de agregar un nuevo idioma
  useEffect(() => {
    switch (languageSelected) {
      case LANGUAGE_OPTIONS.SPANISH:
        setLanguageObject(SPANISH);
        break;
      case LANGUAGE_OPTIONS.ENGLISH:
        setLanguageObject(ENGLISH);
        break;
      case LANGUAGE_OPTIONS.PORTUGUES:
        setLanguageObject(PORTUGUES);
        break;
      default:
        setLanguageObject(SPANISH);
        break;
    }
  }, [languageSelected]);

  // Menu abierto o cerrado
  useEffect(() => {
    const defaultValue: boolean = false;
    const storedValue: boolean | null = localStorageGetItem(
      STORAGE_KEYS.MENU_OPEN
    );

    if (storedValue) {
      setIsMenuOpen(storedValue);
    } else {
      setIsMenuOpen(defaultValue);
      localStorageSetItem(STORAGE_KEYS.MENU_OPEN, defaultValue);
    }
  }, []);

  // Actualiza local storage con menú abierto o cerrado
  useEffect(() => {
    if (isMenuOpen !== null) {
      localStorageSetItem(STORAGE_KEYS.MENU_OPEN, isMenuOpen);
    }
  }, [isMenuOpen]);

  // Forzar el cerrado del menú en resolución movile
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

  // BrandsStatus es el servicio que usamos para la verificación de la sesión
  return brandsStatus === SERVICE_STATUS.loading ? (
    <div>
      <CheckLogin />
    </div>
  ) : (
    <div className={`${styles.mainWrapper}`}>
      <ToastAlertConfig />
      {isAuthenticated && <MainDataFetcher />}
      {isAuthenticated && (
        <Menu
          LANGUAGE={LANGUAGE}
          isMenuOpen={isMenuOpen}
          logoutState={logoutState}
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
