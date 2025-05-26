"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LanguageInterface } from "@/modules/global/language/constants/language.model";
import { ButtonTypes } from "@/modules/global/components/generalButton/generalButton.model";
import { GeneralButton } from "@/modules/global/components/generalButton/generalButton";
import styles from "./authForm.module.css";

interface Props {
  LANGUAGE: LanguageInterface;
}

export const AuthForm = ({ LANGUAGE }: Props) => {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  useEffect(() => {
    setIsFormValid(!!name && !!password);
  }, [name, password, LANGUAGE]);

  return (
    <div className={styles.authForm}>
      <div className={styles.logoContainer}>
        {" "}
        <Image
          alt={LANGUAGE.menu.titles.logo}
          height={40}
          src={"/svg/Imagotipo_Black_transtelemetris.svg"}
          width={250}
        />
      </div>

      <div className={styles.inputsContainers}>
        <label htmlFor="username">{LANGUAGE.auth.authForm.name}</label>
        <input
          id="username"
          type="text"
          placeholder={LANGUAGE.auth.authForm.name}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className={styles.inputsContainers}>
        <label htmlFor="password">{LANGUAGE.auth.authForm.password}</label>
        <input
          id="password"
          type="password"
          placeholder={LANGUAGE.auth.authForm.password}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <GeneralButton
        callback={() => {}}
        title={LANGUAGE.auth.authForm.loginButton}
        type={ButtonTypes.CONFIRM}
        disabled={isFormValid ? false : true}
      />
    </div>
  );
};
