"use client";
import { useEffect, useRef } from "react";

import styles from "./languageSelector.module.css";
import { LanguageInterface } from "@/modules/global/language/constants/language.model";
import { LanguageSelectorOption } from "../languageButton";

interface Props {
  LANGUAGE: LanguageInterface;
  languageOptions: LanguageSelectorOption[];
  selectLanguage: (languageOption: LanguageSelectorOption) => void;
  toggleSelector: () => void;
}

export const LanguageSelector = ({
  LANGUAGE,
  languageOptions,
  selectLanguage,
  toggleSelector,
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node) &&
        !(e.target as HTMLElement).closest("#languageButton")
      ) {
        toggleSelector();
      }
    };

    if (typeof window !== "undefined") {
      document.addEventListener("mousedown", onClickOutside);
      return () => document.removeEventListener("mousedown", onClickOutside);
    }
  }, [toggleSelector]);

  return (
    <div className={styles.inside} ref={containerRef}>
      {languageOptions.map((languageOption, index) => (
        <button
          className={styles.languageElement}
          key={index}
          // Envía el objeto completo a la función
          onClick={() => selectLanguage(languageOption)}
          title={LANGUAGE.languageButton.selectLanguage}
        >
          {languageOption.flagIcon}
          <p>{languageOption.title}</p>
        </button>
      ))}
    </div>
  );
};
