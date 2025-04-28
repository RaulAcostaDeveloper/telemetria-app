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
  disabled?: boolean;
}

export const GeneralButton = ({
  Icon,
  buttonStyle,
  callback,
  title,
  titleStyle,
  type,
  disabled,
}: Props) => {
  const handleCallback = () => {
    if (disabled) {
      return null;
    } else {
      callback();
    }
  };
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
        ${disabled ? styles.disabled : ""} 
      `}
      onClick={handleCallback}
      title={title}
    >
      <span className={` ${titleStyle ? titleStyle : ""}`}>{title}</span>

      {Icon && <div className={styles.icon}>{Icon} </div>}
    </button>
  );
};
