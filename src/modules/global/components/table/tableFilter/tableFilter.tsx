import styles from "./tableFilter.module.css";
import { LanguageInterface } from "@/modules/global/language/constants/language.model";
import { PrimitiveValue, SelectorFilter } from "../table.model";

interface Props {
  LANGUAGE: LanguageInterface;
  columnName: string;
  handleSelectorFilter: ({ colIndex, value }: SelectorFilter) => void;
  options: PrimitiveValue[];
  colIndex: number;
  filterSelectors: SelectorFilter[];
}

export const TableFilter = ({
  LANGUAGE,
  columnName,
  handleSelectorFilter,
  options,
  colIndex,
  filterSelectors,
}: Props) => {
  // Actualiza los filtros desde el componente TableFiltersButton
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleSelectorFilter({ colIndex, value: e.target.value });
  };

  return (
    <select
      id={`filter-${columnName}`}
      className={`${styles.selectInput} ${
        filterSelectors[colIndex].value ? styles.selectedOption : ""
      }`}
      value={filterSelectors[colIndex].value}
      onChange={handleChange}
    >
      <option value="">{LANGUAGE.table.actions.any}</option>
      {options.map((opt) => (
        <option key={opt} value={opt ?? ""}>
          {opt}
        </option>
      ))}
    </select>
  );
};
