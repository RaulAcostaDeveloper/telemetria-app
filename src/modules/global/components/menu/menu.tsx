"use client";
import { useEffect, useState } from "react";
import styles from "./menu.module.css";
import { StorageService } from "../../localStorage/utils/storageService";
import { STORAGE_KEYS } from "../../localStorage/constants/storageKeys";

export const Menu = () => {
  // Es importante que el valor inicial sea null
  const [isOpen, setIsOpen] = useState<boolean | null>(null);

  useEffect(() => {
    // Inicialización del valor
    const defaultValue: boolean = true;
    const storedValue: boolean | null = StorageService.getItem(
      STORAGE_KEYS.MENU_OPEN
    );
    // Si existe el valor en LocalStorage, lo asigna.
    // Si no existe, asigna el valor por defecto.
    setIsOpen(storedValue !== null ? storedValue : defaultValue);
  }, []);

  useEffect(() => {
    // Actualización del elemento en LocalStorage
    // Usa el valor null para evita actualizarlo en el primer render
    if (isOpen !== null) {
      StorageService.setItem(STORAGE_KEYS.MENU_OPEN, isOpen);
    }
  }, [isOpen]);

  return (
    <div
      className={`${styles.menu} ${
        isOpen ? `${styles.open}` : `${styles.close}`
      }`}
      onClick={() => setIsOpen(!isOpen)}
    >
      {isOpen ? <div>open</div> : <div>close</div>}
    </div>
  );
};
