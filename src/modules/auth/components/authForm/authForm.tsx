"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/globalConfig/redux/store";
import encryptUserAndPassword from "../../utils/cryptoReference/cryptoReference";
import styles from "./authForm.module.css";
import { ButtonTypes } from "@/modules/global/components/generalButton/generalButton.model";
import { GeneralButton } from "@/modules/global/components/generalButton/generalButton";
import { LanguageInterface } from "@/modules/global/language/constants/language.model";
import { useAuth } from "@/modules/auth/utils";
import CheckLogin from "@/app/(pages)/checkLogin/page";

interface Props {
  LANGUAGE: LanguageInterface;
}

export const AuthForm = ({ LANGUAGE }: Props) => {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const { tryLoginHook } = useAuth();

  const { loginStatus } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    setIsFormValid(!!name && !!password);
  }, [name, password, LANGUAGE]);

  const onClickGetToken = async () => {
    const encrypted = await encryptUserAndPassword(`${name}:${password}`);
    if (encrypted !== undefined) {
      tryLoginHook(encrypted);
    } else {
      console.error("ERROR: No se ha encriptado el usuario y contraseña");
    }
  };

  return loginStatus === "loading" || loginStatus === "succeeded" ? (
    <div>
      <CheckLogin />
    </div>
  ) : (
    <div className={styles.authForm}>
      <div className={styles.logoContainer}>
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
        callback={onClickGetToken}
        title={LANGUAGE.auth.authForm.loginButton}
        type={ButtonTypes.CONFIRM}
        disabled={isFormValid ? false : true}
      />
      {true && (
        <div className={styles.errorMessageContainer}>
          <span>{LANGUAGE.auth.authForm.nameOrPasswordError}</span>
        </div>
      )}
    </div>
  );
};
