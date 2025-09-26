"use client";
import { ReactNode, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";

import styles from "./languageButton.module.css";
import {
  localStorageGetItem,
  localStorageSetItem,
} from "../../../globalConfig/localStorage/utils/storageService";
import { AppDispatch } from "@/global/redux/store";
import { LANGUAGE_OPTIONS } from "../../language/utils/languageSelector.model";
import { LanguageInterface } from "../../language/constants/language.model";
import { LanguageSelector } from "./languageSelector/languageSelector";
import { STORAGE_KEYS } from "../../../globalConfig/localStorage/constants/storageKeys";
import { StarIcon } from "./starIcon/starIcon";
import { setLanguageReducer } from "@/global/redux/slices/languageSlice";

export type LanguageSelectorOption = {
  flagIcon: ReactNode;
  option: LANGUAGE_OPTIONS;
  title: string;
};

interface Props {
  LANGUAGE: LanguageInterface;
}

export const LanguageButton = ({ LANGUAGE }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  // Datos del lenguaje para este componente
  const [languageSelectedForButton, setLanguageSelectedForButton] =
    useState<LanguageSelectorOption>();

  const [isLanguageSelectorOpen, setIsLanguageSelectorOpen] = useState(false);

  // Actualizar este arreglo si se agrega un nuevo idioma
  const languageOptions = useMemo<LanguageSelectorOption[]>(() => {
    return [
      {
        flagIcon: (
          <Image
            src="/png/english.png"
            width={20}
            height={20}
            alt="language english"
          />
        ),
        option: LANGUAGE_OPTIONS.ENGLISH,
        title: LANGUAGE.languages.english,
      },
      {
        flagIcon: (
          <Image
            src="/png/espanol.png"
            width={20}
            height={20}
            alt="language español"
          />
        ),
        option: LANGUAGE_OPTIONS.SPANISH,
        title: LANGUAGE.languages.spanish,
      },
      {
        flagIcon: (
          <Image
            src="/png/portugues.png"
            width={20}
            height={20}
            alt="language portugues"
          />
        ),
        option: LANGUAGE_OPTIONS.PORTUGUES,
        title: LANGUAGE.languages.portugues,
      },
    ];
  }, [LANGUAGE]);

  // Primer render, valor por default es languageOptions[0].option
  useEffect(() => {
    const storedLanguage = localStorageGetItem(STORAGE_KEYS.LANGUAGE_SELECTED);

    if (storedLanguage) {
      const selectedOption: LanguageSelectorOption | undefined =
        languageOptions.find((item) => item.option === storedLanguage);

      setLanguageSelectedForButton(selectedOption);

      // Si se encontró en el arreglo
      if (selectedOption) {
        dispatch(setLanguageReducer(selectedOption.option));
      } else {
        dispatch(setLanguageReducer(languageOptions[0].option));
      }
    } else {
      // Si no había nada en localStorage
      setLanguageSelectedForButton(languageOptions[0]);
      localStorageSetItem(
        STORAGE_KEYS.LANGUAGE_SELECTED,
        languageOptions[0].option
      );
      dispatch(setLanguageReducer(languageOptions[0].option));
    }
  }, [languageOptions]);

  const toggleSelector = () => {
    setIsLanguageSelectorOpen(!isLanguageSelectorOpen);
  };

  const selectLanguage = (languageOption: LanguageSelectorOption) => {
    setLanguageSelectedForButton(languageOption);
    localStorageSetItem(STORAGE_KEYS.LANGUAGE_SELECTED, languageOption.option);
    dispatch(setLanguageReducer(languageOption.option));
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.languageButton}
        onClick={toggleSelector}
        id="languageButton"
      >
        <div className={styles.insideButton}>
          {languageSelectedForButton?.flagIcon}
          <h3>{languageSelectedForButton?.title}</h3>
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

      <div
        className={`${
          isLanguageSelectorOpen
            ? `${styles.selectorOpen}`
            : `${styles.selectorClosed}`
        }`}
      >
        {isLanguageSelectorOpen && (
          <LanguageSelector
            languageOptions={languageOptions}
            selectLanguage={selectLanguage}
            toggleSelector={toggleSelector}
            LANGUAGE={LANGUAGE}
          />
        )}
      </div>
    </div>
  );
};
