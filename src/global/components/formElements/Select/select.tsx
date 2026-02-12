import styles from "../Input/input.module.css";

interface SelectProps {
  name: string;
  options: string[];
  selectTitle: string;
  set: (value: string) => void;
  title: string;
  value: string | undefined;
}

export const Select = ({
  name,
  options,
  selectTitle,
  set,
  title,
  value,
}: SelectProps) => {
  return (
    <div className={`${styles.inputNormal}`}>
      <label htmlFor={name}>{title}</label>
      <select
        id={name}
        name={name}
        value={value ?? ""}
        onChange={(e) => set(e.target.value)}
        className={` ${styles.input} ${styles.selectInput} ${value && value?.length > 0 ? styles.withValue : ""}`}
      >
        <option value="">{selectTitle}</option>
        {options.map((opt, index) => (
          <option key={index} value={opt ?? "asd"}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};
