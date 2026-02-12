import { LanguageInterface } from "@/global/language/constants/language.model";
import styles from "./input.module.css";
import { InputPassword } from "./InputPassword/inputPassword";

interface InputProps {
  title: string;
  name: string;
  value: string | undefined;
  set: (value: string) => void;
  type?: "text" | "password" | "color";
  isLarge?: boolean;
  LANGUAGE: LanguageInterface;
}

export const Input = ({
  title,
  name,
  value,
  set,
  type,
  isLarge,
  LANGUAGE,
}: InputProps) => {
  return (
    <div
      className={`${styles.inputNormal} ${isLarge ? styles.inputLarge : ""}`}
    >
      <label htmlFor={name}>{title}</label>

      {isLarge && (
        <textarea
          name={name}
          id={name}
          value={value}
          onChange={(e) => set(e.target.value)}
          className={` ${styles.input} ${styles.textarea} ${
            value && value?.length > 0 ? styles.withValue : ""
          }`}
        />
      )}

      {type === "password" ? (
        <InputPassword
          value={value}
          name={name}
          set={set}
          LANGUAGE={LANGUAGE}
        />
      ) : (
        <input
          type={type ?? "text"}
          name={name}
          id={name}
          value={value}
          onChange={(e) => set(e.target.value)}
          className={` ${styles.input} ${value && value?.length > 0 ? styles.withValue : ""}`}
        />
      )}
    </div>
  );
};
