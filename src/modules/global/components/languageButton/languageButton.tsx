"use client";
import { ReactNode, useEffect, useMemo, useState } from "react";
import Image from "next/image";

import styles from "./languageButton.module.css";
import { LANGUAGE_OPTIONS } from "../../language/utils/languageSelector.model";
import { LanguageInterface } from "../../language/constants/language.model";
import { LanguageSelector } from "./languageSelector/languageSelector";
import { STORAGE_KEYS } from "../../localStorage/constants/storageKeys";
import { StarIcon } from "./starIcon/starIcon";
import {
  localStorageGetItem,
  localStorageSetItem,
} from "../../localStorage/utils/storageService";

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
    const storedLanguage = localStorageGetItem(STORAGE_KEYS.LANGUAGE_SELECTED);
    if (storedLanguage) {
      const selectedLanguage = languageOptions.find(
        (item) => item.option === storedLanguage
      );
      setLanguageSelected(selectedLanguage);
    } else {
      setLanguageSelected(languageOptions[0]);
      localStorageSetItem(
        STORAGE_KEYS.LANGUAGE_SELECTED,
        languageOptions[0].option
      );
    }
  }, [languageOptions]);

  const toggleSelector = () => {
    setIsSelectorOpen((prev) => !prev);
  };

  const selectLanguage = (languageOption: LanguageSelectorOption) => {
    setLanguageSelected(languageOption);
    localStorageSetItem(STORAGE_KEYS.LANGUAGE_SELECTED, languageOption.option);
  };

  return (
    <div>
      <button
        className={styles.languageButton}
        onClick={toggleSelector}
        id="languageButton"
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
          toggleSelector={toggleSelector}
        />
      )}
    </div>
  );
};
