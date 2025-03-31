"use client";
import { ButtonTypes } from "./generalButton.model";
import styles from "./generalButton.module.css";

interface Props {
  Icon?: React.ReactElement;
  buttonStyle?: string;
  callback: () => void;
  title: string;
  titleStyle?: string;
  type: ButtonTypes;
}

export const GeneralButton = ({
  Icon,
  buttonStyle,
  callback,
  title,
  titleStyle,
  type,
}: Props) => {
  return (
    <button
      className={`
        ${styles.generalButton} 
        ${buttonStyle ? buttonStyle : ""} 
        ${type === ButtonTypes.CONFIRM && styles.confirm} 
        ${type === ButtonTypes.SUCCESS && styles.success} 
        ${type === ButtonTypes.DANGER && styles.danger} 
        ${type === ButtonTypes.WARNING && styles.warning} 
        ${type === ButtonTypes.USER_ACTION && styles.userAction} 
        ${type === ButtonTypes.NEUTRAL && styles.neutral} 
        ${type === ButtonTypes.PREMIUM && styles.premium} 
      `}
      onClick={callback}
      title={title}
    >
      <span className={` ${titleStyle ? titleStyle : ""} ${styles.title}`}>
        {title}
      </span>

      <>{Icon && Icon}</>
    </button>
  );
};
