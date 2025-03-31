"use client";
import { useEffect, useState } from "react";

import styles from "./menu.module.css";
import {
  localStorageGetItem,
  localStorageSetItem,
} from "../../localStorage/utils/storageService";
import { STORAGE_KEYS } from "../../localStorage/constants/storageKeys";
import { MenuHeader } from "../menuHeader/menuHeader";
import { MenuContent } from "../menuContent/menuContent";

export const Menu = () => {
  const [isOpen, setIsOpen] = useState<boolean | null>(null);

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

  useEffect(() => {
    // Menu closed en resolución movile
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setTimeout(() => {
          setIsOpen(false);
        }, 10);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`${styles.menu} ${
        isOpen === null || isOpen === true
          ? `${styles.open}`
          : `${styles.close}`
      }`}
    >
      <MenuHeader isOpen={isOpen} setIsOpen={setIsOpen} />
      <MenuContent isOpen={isOpen} />
    </div>
  );
};
