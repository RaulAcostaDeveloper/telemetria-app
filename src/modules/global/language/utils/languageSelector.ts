import { ENGLISH } from "../constants/english";
import { LanguageInterface } from "../constants/language.model";
import { SPANISH } from "../constants/spanish";
import { LANGUAGE_OPTIONS } from "./languageSelector.model";

// Manejar esta opción en una cookie / global state
const languageOption: LANGUAGE_OPTIONS = LANGUAGE_OPTIONS.SPANISH;

export const LanguageSelector = (): LanguageInterface => {
  console.log("languageOption ", languageOption);

  if (languageOption === LANGUAGE_OPTIONS.SPANISH) {
    return SPANISH;
  }
  if (languageOption === LANGUAGE_OPTIONS.ENGLISH) {
    return ENGLISH;
  }
  return ENGLISH;
};
