"use client";

import { useState } from "react";

import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import styles from "../input.module.css";
import { LanguageInterface } from "@/global/language/constants/language.model";

interface Props {
  name: string;
  value: string | undefined;
  set: (value: string) => void;
  LANGUAGE: LanguageInterface;
}

export const InputPassword = ({ name, value, set, LANGUAGE }: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.inputWrapper}>
      <input
        type={showPassword ? "text" : "password"}
        name={name}
        id={name}
        value={value}
        onChange={(e) => set(e.target.value)}
        className={`${styles.input} ${value ? styles.withValue : ""}`}
        required
        autoComplete={"current-password"}
      />

      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        className={styles.toggleButton}
        aria-label={
          showPassword
            ? LANGUAGE.table.buttons.hidePassword
            : LANGUAGE.table.buttons.showPassword
        }
      >
        {showPassword ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
      </button>
    </div>
  );
};
