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

interface Props {
  children: React.ReactNode;
}

export const MainWrapper = ({ children }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean | null>(null);

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
      <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <div className={`${styles.rightContent}`}>
        <Header isMenuOpen={isMenuOpen} />

        {/* Contenido de la página */}
        <PageContainer>{children}</PageContainer>
      </div>
    </div>
  );
};
