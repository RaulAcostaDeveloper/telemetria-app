import styles from "./authForm.module.css";
import { LanguageInterface } from "@/modules/global/language/constants/language.model";

interface Props {
  LANGUAGE: LanguageInterface;
}

export const AuthForm = ({ LANGUAGE }: Props) => {
  return (
    <div className={`${styles.authForm}`}>
      <p>{LANGUAGE.auth.authForm.title}</p>
      <div>
        <label htmlFor="">{LANGUAGE.auth.authForm.name}</label>
        <input type="text" placeholder={LANGUAGE.auth.authForm.name} />
      </div>
      <div>
        <label htmlFor="">{LANGUAGE.auth.authForm.password}</label>
        <input type="password" placeholder={LANGUAGE.auth.authForm.password} />
      </div>
    </div>
  );
};
