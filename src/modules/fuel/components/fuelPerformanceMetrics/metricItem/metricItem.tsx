"use client";
import styles from "./metricItem.module.css";
import { LanguageInterface } from "@/modules/global/language/constants/language.model";
import { PrimitiveValue } from "@/modules/global/components/table/table.model";

interface Props {
  LANGUAGE: LanguageInterface;
  isLast?: boolean;
  metric: string;
  name: string;
  value: string;
}

export const MetricItem = ({
  LANGUAGE,
  isLast,
  metric,
  name,
  value,
}: Props) => {
  const copyToClipboard = async (text: PrimitiveValue): Promise<void> => {
    try {
      await navigator.clipboard.writeText(String(text));
    } catch (err) {
      console.error(LANGUAGE.table.actions.copyError, " ", err);
    }
  };
  return (
    <button
      className={`${styles.metricItem} ${isLast ? "" : styles.border}`}
      onClick={() => copyToClipboard(name + " " + value + " " + metric)}
      title={`${LANGUAGE.table.actions.copy}  \"${
        name + " " + value + " " + metric
      }\"`}
    >
      <div>
        <span className={styles.title}>{name}</span>
      </div>
      <div>
        <span>{value}</span> <span>{metric}</span>
      </div>
    </button>
  );
};
