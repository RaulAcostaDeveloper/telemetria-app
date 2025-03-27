"use client";
import styles from "./generalButton.module.css";

interface Props {
  title: string;
  Icon: React.ReactElement;
  callback: () => void;
  type: number;
  buttonStyle?: string;
  titleStyle?: string;
}

export const GeneralButton = ({
  title,
  Icon,
  callback,
  type,
  buttonStyle,
  titleStyle,
}: Props) => {
  return (
    <button
      className={`
        ${buttonStyle ? buttonStyle : ""}
        ${styles.buttonElement}
        ${type === 1 && styles.principal}
        ${type === 2 && styles.success}
        ${type === 3 && styles.danger}
        ${type === 4 && styles.warning}
        ${type === 5 && styles.userAction}
        ${type === 6 && styles.neutral}
        ${type === 7 && styles.premium}
      `}
      onClick={callback}
      title={title}
    >
      <span className={` ${titleStyle ? titleStyle : ""} ${styles.title}`}>
        {title}
      </span>

      <>{Icon}</>
    </button>
  );
};
