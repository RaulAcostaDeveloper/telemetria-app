"use client";
import { usePathname, useRouter } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import styles from "./headerBackButton.module.css";
import { LanguageSelector } from "../../language/utils/languageSelector";

export const HeaderBackButton = () => {
  const router = useRouter();
  const pathname = usePathname();
  const LANGUAGE = LanguageSelector();

  // Retroceder a la página anterior.
  const goBack = (): void => {
    if (pathname !== "/") {
      router.back();
    }
  };

  return (
    <button
      onClick={goBack}
      className={styles.returnButton}
      title={LANGUAGE.header.backButton.hover}
    >
      <ArrowBackIcon />
    </button>
  );
};
