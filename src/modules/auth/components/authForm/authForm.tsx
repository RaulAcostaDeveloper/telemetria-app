"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";

import CheckLogin from "@/modules/auth/components/checkLogin/checkLogin";
import encryptUserAndPassword from "../../utils/cryptoReference/cryptoReference";
import styles from "./authForm.module.css";
import { ButtonTypes } from "@/modules/global/components/generalButton/generalButton.model";
import { ErrorMessage } from "@/modules/global/components/errorMessage/errorMessage";
import { GeneralButton } from "@/modules/global/components/generalButton/generalButton";
import { LanguageInterface } from "@/modules/global/language/constants/language.model";
import { RootState } from "@/globalConfig/redux/store";
import { SERVICE_STATUS } from "@/globalConfig/redux/types/serviceTypes";
import { useAuth } from "@/modules/auth/utils";

interface Props {
  LANGUAGE: LanguageInterface;
}

export const AuthForm = ({ LANGUAGE }: Props) => {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [memoryIfStatus, setMemoryIfStatus] = useState(false);
  const [memoryCodeStatus, setMemoryCodeStatus] = useState(-1);
  const [capsLock, setCapsLock] = useState(false);

  const { tryLoginHook } = useAuth();

  const { loginStatus, loginServerData } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    setIsFormValid(!!name && !!password);
  }, [name, password, LANGUAGE]);

  useEffect(() => {
    if (SERVICE_STATUS.loading === loginStatus) {
      setMemoryCodeStatus(-1);
      setMemoryIfStatus(false);
    }

    if (loginServerData && null !== loginServerData) {
      setMemoryIfStatus(!!loginServerData);
      setMemoryCodeStatus(loginServerData.code);
    } else if (
      SERVICE_STATUS.succeeded === loginStatus &&
      loginServerData &&
      200 === loginServerData
    ) {
      //Limpio si ya inició satisfactoriamente sesión
      setMemoryIfStatus(false);
      setMemoryCodeStatus(-1);
    } else if (
      SERVICE_STATUS.failed === loginStatus &&
      undefined === loginServerData
    ) {
      setMemoryIfStatus(true);
      setMemoryCodeStatus(0);
    }
  }, [loginServerData, loginStatus]);

  const onClickGetToken = async () => {
    const encrypted = await encryptUserAndPassword(`${name}:${password}`);
    if (encrypted !== undefined) {
      tryLoginHook(encrypted);
    } else {
      console.error("ERROR: No se ha encriptado el usuario y contraseña");
    }
  };

  function errorSelector() {
    if (200 === memoryCodeStatus || -1 === memoryCodeStatus) {
      //Login exitoso
      return;
    } else if (
      (memoryIfStatus && 401 === memoryCodeStatus) ||
      204 === memoryCodeStatus
    ) {
      //Error por usuario o contraseña
      return (
        <div className={styles.errorMessageContainer}>
          <span>{LANGUAGE.auth.authFormNote.nameOrPasswordError}</span>
        </div>
      );
    } else if (memoryIfStatus && 500 === memoryCodeStatus) {
      //Error inesperado
      return (
        <div className={styles.errorMessageContainer}>
          <span>{LANGUAGE.auth.authFormNote.unexpectedError}</span>
        </div>
      );
    } else if (
      (memoryIfStatus && 0 === memoryCodeStatus) ||
      499 === memoryCodeStatus
    ) {
      //Error de red
      return (
        <div className={styles.errorMessageContainer}>
          <span>{LANGUAGE.auth.authFormNote.networkError}</span>
        </div>
      );
    }
  }

  function handlePassKeyDown(event: { key: string }) {
    if ("Enter" === event.key && true === isFormValid) {
      onClickGetToken();
    }
  }

  const handleKeyEvent = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const isCaps = event.getModifierState("CapsLock");
    setCapsLock(isCaps);
  };

  return loginStatus === SERVICE_STATUS.loading ||
    loginStatus === SERVICE_STATUS.succeeded ? (
    <div>
      <CheckLogin />
    </div>
  ) : (
    <div className={styles.loginPage}>
      <div className={styles.formContainer}>
        <div className={styles.authForm}>
          <div className={styles.logoContainer}>
            <Image
              alt={LANGUAGE.menu.titles.logo}
              height={100}
              src={"/svg/Imagotipo_Black_transtelemetris.svg"}
              width={460}
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
              onKeyDown={(e) => {
                handlePassKeyDown(e);
                handleKeyEvent(e);
              }}
              onKeyUp={handleKeyEvent}
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
              onKeyDown={(e) => {
                handlePassKeyDown(e);
                handleKeyEvent(e);
              }}
              onKeyUp={handleKeyEvent}
            />
          </div>

          {capsLock && (
            <div className={styles.mayusActivated}>
              <Image
                src={"/png/bloq-mayus.png"}
                width={20}
                height={20}
                alt="bloq mayus"
              />
              <span>{LANGUAGE.auth.authForm.mayusActivated}</span>
            </div>
          )}

          <GeneralButton
            callback={onClickGetToken}
            title={LANGUAGE.auth.authForm.loginButton}
            type={ButtonTypes.CONFIRM}
            disabled={isFormValid ? false : true}
          />
          {errorSelector()}
          {loginStatus === SERVICE_STATUS.failed && (
            <ErrorMessage LANGUAGE={LANGUAGE} />
          )}
        </div>
      </div>
    </div>
  );
};
