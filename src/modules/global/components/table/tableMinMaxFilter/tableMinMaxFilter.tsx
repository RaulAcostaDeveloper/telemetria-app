import styles from "./tableMinMaxFilter.module.css";
import { MinMaxFilter } from "../table.model";
import { LanguageInterface } from "@/modules/global/language/constants/language.model";

interface Props {
  LANGUAGE: LanguageInterface;
  colIndex: number;
  handleMinMaxFilter: ({ colIndex, min, max }: MinMaxFilter) => void;
  minMaxFilters: MinMaxFilter[];
}
export const TableMinMaxFilter = ({
  LANGUAGE,
  colIndex,
  handleMinMaxFilter,
  minMaxFilters,
}: Props) => {
  const handleChangeMin = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleMinMaxFilter({
      colIndex,
      min: Number(event.target.value),
      max: minMaxFilters[colIndex].max,
    });
  };

  const handleChangeMax = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleMinMaxFilter({
      colIndex,
      min: minMaxFilters[colIndex].min,
      max: Number(event.target.value),
    });
  };

  return (
    <div className={styles.tableMinMaxFilter}>
      <div className={styles.title}>
        <span>Min</span>
        <span>Max</span>
      </div>
      <div className={styles.inputs}>
        <input
          type="number"
          onChange={handleChangeMin}
          value={minMaxFilters[colIndex].min ?? ""}
          placeholder={LANGUAGE.table.actions.any}
          className={`${styles.input} ${
            minMaxFilters[colIndex].min !== undefined
              ? styles.selectedOption
              : ""
          }`}
        />
        <input
          type="number"
          onChange={handleChangeMax}
          value={minMaxFilters[colIndex].max ?? ""}
          placeholder={LANGUAGE.table.actions.any}
          className={`${styles.input} ${
            minMaxFilters[colIndex].max !== undefined
              ? styles.selectedOption
              : ""
          }`}
        />
      </div>
    </div>
  );
};
