"use client";

import { useState } from "react";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import styles from "./collapsable.module.css";
import { LanguageInterface } from "@/global/language/constants/language.model";

interface Props {
  LANGUAGE: LanguageInterface;
  title: string;
  children: React.ReactNode;
}

export const Collapsable = ({ LANGUAGE, title, children }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <button
        className={styles.header}
        onClick={() => setIsOpen(!isOpen)}
        title={
          isOpen
            ? LANGUAGE.fuel.filter.hideFilters
            : LANGUAGE.fuel.filter.showFilters
        }
      >
        <h2 className={styles.title}>{title}</h2>
        <ArrowForwardIosIcon
          className={`${styles.icon} ${isOpen ? styles.iconOpen : ""}`}
        />
      </button>

      <div className={styles.inside}>
        {/* Content */}
        {isOpen && children}
      </div>
    </>
  );
};
