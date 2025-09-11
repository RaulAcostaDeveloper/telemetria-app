"use client";
import { useEffect, useRef } from "react";

import styles from "./languageSelector.module.css";
import { LanguageSelectorOption } from "../languageButton";

interface Props {
  languageOptions: LanguageSelectorOption[];
  selectLanguage: (languageOption: LanguageSelectorOption) => void;
  setIsSelectorOpen: (toggle: boolean) => void;
}

export const LanguageSelector = ({
  languageOptions,
  selectLanguage,
  setIsSelectorOpen,
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsSelectorOpen(false);
      }
    };

    if (typeof window !== "undefined") {
      document.addEventListener("mousedown", onClickOutside);
      return () => document.removeEventListener("mousedown", onClickOutside);
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.inside} ref={containerRef}>
        {languageOptions.map((languageOption, index) => (
          <button
            className={styles.languageElement}
            key={index}
            onClick={() => selectLanguage(languageOption)}
          >
            {languageOption.flagIcon}
            <p>{languageOption.title}</p>
          </button>
        ))}
      </div>
    </div>
  );
};
