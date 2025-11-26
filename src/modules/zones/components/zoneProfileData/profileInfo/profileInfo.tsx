import styles from "./profileInfo.module.css";
import { ndIfEmpty } from "@/global/utils/ndIfEmpty";

interface Props {
  title: string;
  value?: string;
  isLarge?: boolean;
}

export const ProfileInfo = ({ title, value, isLarge }: Props) => {
  return (
    <div className={`${styles.profileInfo} ${isLarge ? styles.isLarge : ""}`}>
      <span className={styles.title}>{title}:</span>
      <span className={styles.value}>{ndIfEmpty(value)}</span>
    </div>
  );
};
