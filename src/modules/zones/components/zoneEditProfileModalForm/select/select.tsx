import styles from "../zoneEditProfileModalForm.module.css";

interface Option {
  name: string;
  id: string;
}

interface SelectProps {
  isLeft?: boolean;
  name: string;
  options: Option[];
  selectTitle: string;
  set: (value: string) => void;
  title: string;
  value: string;
}

export const Select = ({
  isLeft,
  name,
  options,
  selectTitle,
  set,
  title,
  value,
}: SelectProps) => {
  return (
    <div className={`${styles.inputNormal} ${isLeft ? styles.left : ""}`}>
      <label htmlFor={name}>{title}</label>
      <select
        name={name}
        value={value}
        onChange={(e) => set(e.target.value)}
        className={` ${styles.input} ${styles.selectInput} ${
          value !== "" ? styles.withValue : ""
        }`}
      >
        <option value="">{selectTitle}</option>
        {options.map((opt, index) => (
          <option key={index} value={opt.name?.toString() ?? ""}>
            {opt.name}
          </option>
        ))}
      </select>
    </div>
  );
};
