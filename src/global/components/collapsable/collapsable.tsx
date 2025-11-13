"use client";

import { useEffect, useState } from "react";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import styles from "./collapsable.module.css";
import { LanguageInterface } from "@/global/language/constants/language.model";

interface Props {
  LANGUAGE: LanguageInterface;
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean | null | undefined; // por asunto del local storage debe iniciar null
  set?: (toggle: boolean) => void; // para controlar el local storage en un nivel superior
}

export const Collapsable = ({
  LANGUAGE,
  title,
  children,
  defaultOpen,
  set = () => {},
}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsOpen(defaultOpen ?? false);
  }, [defaultOpen]);

  return (
    <>
      <button
        className={styles.header}
        onClick={() => {
          setIsOpen(!isOpen);
          set(!isOpen);
        }}
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
