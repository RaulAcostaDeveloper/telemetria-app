"use client";
import { ReactNode, useEffect, useMemo, useState } from "react";
import Image from "next/image";

import styles from "./languageButton.module.css";
import { StarIcon } from "./starIcon/starIcon";
import { LanguageSelector } from "./languageSelector/languageSelector";
import { LanguageInterface } from "../../language/constants/language.model";
import { LANGUAGE_OPTIONS } from "../../language/utils/languageSelector.model";

export type LanguageSelectorOption = {
  flagIcon: ReactNode;
  option: LANGUAGE_OPTIONS;
  title: string;
};

interface Props {
  LANGUAGE: LanguageInterface;
}

export const LanguageButton = ({ LANGUAGE }: Props) => {
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [languageSelected, setLanguageSelected] =
    useState<LanguageSelectorOption>();

  const languageOptions = useMemo<LanguageSelectorOption[]>(() => {
    return [
      {
        flagIcon: (
          <Image src="/png/english.png" width={20} height={20} alt="language" />
        ),
        option: LANGUAGE_OPTIONS.ENGLISH,
        title: LANGUAGE.languages.english,
      },
      {
        flagIcon: (
          <Image src="/png/espanol.png" width={20} height={20} alt="language" />
        ),
        option: LANGUAGE_OPTIONS.SPANISH,
        title: LANGUAGE.languages.spanish,
      },
    ];
  }, [LANGUAGE]);

  useEffect(() => {
    // Primer render
    setLanguageSelected(languageOptions[0]);
  }, [languageOptions]);

  const selectLanguage = (languageOption: LanguageSelectorOption) => {
    setLanguageSelected(languageOption);
  };

  return (
    <div>
      <button
        className={styles.languageButton}
        onClick={() => setIsSelectorOpen(!isSelectorOpen)}
      >
        <div className={styles.insideButton}>
          {languageSelected?.flagIcon}
          <h3>{languageSelected?.title}</h3>
        </div>
        <div className={styles.stars}>
          <div className={styles.star2}>
            <StarIcon />
          </div>
          <div className={styles.star3}>
            <StarIcon />
          </div>
          <div className={styles.star4}>
            <StarIcon />
          </div>
          <div className={styles.star5}>
            <StarIcon />
          </div>
          <div className={styles.star6}>
            <StarIcon />
          </div>
        </div>
      </button>
      {isSelectorOpen && (
        <LanguageSelector
          languageOptions={languageOptions}
          selectLanguage={selectLanguage}
          setIsSelectorOpen={setIsSelectorOpen}
        />
      )}
    </div>
  );
};
