"use client";
import { useState } from "react";
import styles from "./menu.module.css";

export const Menu = () => {
  const [isOpen, setIsOpen] = useState(true);
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
