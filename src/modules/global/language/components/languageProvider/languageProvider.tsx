// context/LanguageContext.tsx
"use client";

import { createContext, useContext } from "react";
import { LanguageInterface } from "../../constants/language.model";
import { ENGLISH } from "../../constants/english";

export const LanguageContext = createContext<LanguageInterface>(ENGLISH);

export const useLanguage = () => useContext(LanguageContext);

// aqui
