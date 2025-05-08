"use client";

import { createContext, useContext } from "react";
import { LanguageInterface } from "../../constants/language.model";
import { SPANISH } from "../../constants/spanish";

// Español por defecto
// Provider
export const LanguageContext = createContext<LanguageInterface>(SPANISH);

// Obtener el valor del provider en page.tsx
export const useLanguage = () => useContext(LanguageContext);
