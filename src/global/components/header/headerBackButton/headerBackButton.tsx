"use client";
import { usePathname, useRouter } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import styles from "./headerBackButton.module.css";
import { LanguageInterface } from "@/global/language/constants/language.model";

interface Props {
  LANGUAGE: LanguageInterface;
}

export const HeaderBackButton = ({ LANGUAGE }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

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
