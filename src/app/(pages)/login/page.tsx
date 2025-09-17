"use client";

import { AuthForm } from "@/modules/auth/components";
import { useLanguage } from "@/modules/global/language/components/languageProvider/languageProvider";
import styles from "./Loginpage.module.css";

export default function LoginPage() {
  const LANGUAGE = useLanguage();

  return (
    <div className={styles.loginPage}>
      <AuthForm LANGUAGE={LANGUAGE} />
    </div>
  );
}
