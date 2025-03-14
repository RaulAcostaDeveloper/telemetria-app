"use client";
import { useState } from "react";
import styles from "./menu.module.css";

export const Menu = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className={`${styles.menu}`} onClick={() => setIsOpen(!isOpen)}>
      {isOpen ? (
        <div className={`${styles.open}`}>open</div>
      ) : (
        <div className={`${styles.close}`}>close</div>
      )}
    </div>
  );
};
