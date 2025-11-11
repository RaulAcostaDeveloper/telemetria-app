import styles from "./fuelDataReport.module.css";
import { LanguageInterface } from "@/global/language/constants/language.model";
import { PrimitiveValue } from "@/global/components/table/table.model";

interface Props {
  Icon: React.ElementType;
  LANGUAGE: LanguageInterface;
  data: string;
  title: string;
}

export const FuelDataReport = ({ LANGUAGE, title, data, Icon }: Props) => {
  const copyToClipboard = async (text: PrimitiveValue): Promise<void> => {
    try {
      await navigator.clipboard.writeText(String(text));
    } catch (err) {
      console.warn(LANGUAGE.table.actions.copyError, " ", err);
    }
  };

  return (
    <button
      className={styles.singleReportContainer}
      onClick={() => copyToClipboard(title + ": " + data)}
      title={`${LANGUAGE.table.actions.copy}  \"${title + ": " + data}\"`}
    >
      <div className={styles.iconContainer}>
        <Icon className={styles.color} />
      </div>
      <div className={styles.summaryContainer}>
        <h3>{title}</h3>
        <span>{data}</span>
      </div>
    </button>
  );
};
