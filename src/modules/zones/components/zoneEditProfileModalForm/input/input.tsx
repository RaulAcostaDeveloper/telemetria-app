import styles from "../zoneEditProfileModalForm.module.css";

interface InputProps {
  title: string;
  name: string;
  value: string;
  set: (value: string) => void;
  isColor?: boolean;
  isLarge?: boolean;
  isLeft?: boolean;
}

export const Input = ({
  title,
  name,
  value,
  set,
  isColor,
  isLarge,
  isLeft,
}: InputProps) => {
  return (
    <div
      className={`${styles.inputNormal} ${isLeft ? styles.left : ""} ${
        isLarge ? styles.inputLarge : ""
      }`}
    >
      <label htmlFor={name}>{title}</label>
      {isLarge ? (
        <textarea
          name={name}
          id={name}
          value={value}
          onChange={(e) => set(e.target.value)}
          className={` ${styles.input} ${styles.textarea} ${
            value !== "" ? styles.withValue : ""
          }`}
        />
      ) : (
        <input
          type={`${isColor ? "color" : "text"}`}
          name={name}
          id={name}
          value={value}
          onChange={(e) => set(e.target.value)}
          className={` ${styles.input} ${value !== "" ? styles.withValue : ""}`}
        />
      )}
    </div>
  );
};
