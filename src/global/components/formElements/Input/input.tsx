import styles from "./input.module.css";

interface InputProps {
  title: string;
  name: string;
  value: string | undefined;
  set: (value: string) => void;
  //   Input color
  isColor?: boolean;
  //   Input large text
  isLarge?: boolean;
}

export const Input = ({
  title,
  name,
  value,
  set,
  isColor,
  isLarge,
}: InputProps) => {
  return (
    <div
      className={`${styles.inputNormal} ${isLarge ? styles.inputLarge : ""}`}
    >
      <label htmlFor={name}>{title}</label>
      {isLarge ? (
        <textarea
          name={name}
          id={name}
          value={value}
          onChange={(e) => set(e.target.value)}
          className={` ${styles.input} ${styles.textarea} ${
            value && value?.length > 0 ? styles.withValue : ""
          }`}
        />
      ) : (
        <input
          type={`${isColor ? "color" : "text"}`}
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
