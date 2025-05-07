"use client";
import { useEffect, useState } from "react";

import styles from "./mainWrapper.module.css";
import {
  localStorageGetItem,
  localStorageSetItem,
} from "../../localStorage/utils/storageService";
import { Header } from "../header/header";
import { Menu } from "../menu/menu";
import { PageContainer } from "../pageContainer/pageContainer";
import { STORAGE_KEYS } from "../../localStorage/constants/storageKeys";
import { LanguageContext } from "../../language/components/languageProvider/languageProvider";
import { LanguageInterface } from "../../language/constants/language.model";
import { ENGLISH } from "../../language/constants/english";
import { SPANISH } from "../../language/constants/spanish";
// aqui
interface Props {
  children: React.ReactNode;
}

export const MainWrapper = ({ children }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean | null>(null);
  const [LANGUAGE, setLanguage] = useState<LanguageInterface>(ENGLISH);

  // Aquí trae de redux y modifica el lenguaje
  useEffect(() => {
    setTimeout(() => {
      setLanguage(SPANISH);
    }, 2000);
  }, []);

  useEffect(() => {
    const defaultValue: boolean = true;
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
  }, []);

  return (
    <div className={`${styles.mainWrapper}`}>
      <Menu
        LANGUAGE={LANGUAGE}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
      <div className={`${styles.rightContent}`}>
        <Header LANGUAGE={LANGUAGE} isMenuOpen={isMenuOpen} />

        {/* Contenido de la página */}
        <LanguageContext.Provider value={LANGUAGE}>
          <PageContainer>{children}</PageContainer>
        </LanguageContext.Provider>
      </div>
    </div>
  );
};
