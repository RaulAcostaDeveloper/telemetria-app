"use client";

import { useLanguage } from "@/modules/global/language/components/languageProvider/languageProvider";
//import { AuthForm } from "@/modules/auth/components";
import LoaderAnimation from "@/modules/global/components/loaderAnimation/loaderAnimation";
import styles from "./CheckLogin.module.css";

export default function CheckLogin() {
  const LANGUAGE = useLanguage();

  return (
    <div className={styles.checklogin}>
      <p>{LANGUAGE.auth.checklogin.maintitle}</p>
      <LoaderAnimation cellSize={52} />
    </div>
  );
}
