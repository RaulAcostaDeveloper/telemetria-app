"use client";
import { useEffect, useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";

import styles from "./modal.module.css";
import { LanguageInterface } from "../../language/constants/language.model";

interface Props {
  LANGUAGE: LanguageInterface;
  children: React.ReactNode;
  closeModal: () => void;
  title?: string;
}

export const Modal = ({ children, closeModal, LANGUAGE, title }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeModal();
      }
    };

    if (typeof window !== "undefined") {
      document.addEventListener("mousedown", onClickOutside);
      return () => document.removeEventListener("mousedown", onClickOutside);
    }
  }, []);

  return (
    <div className={`${styles.modal}`}>
      <div className={`${styles.insideModal}`} ref={modalRef}>
        <button
          className={`${styles.closeButton}`}
          onClick={closeModal}
          title={LANGUAGE.table.actions.close}
        >
          <CloseIcon sx={{ fontSize: "2.5rem" }} />
        </button>
        <div className={styles.title}>
          <h3>{title}</h3>
        </div>
        <>{children}</>
      </div>
    </div>
  );
};
