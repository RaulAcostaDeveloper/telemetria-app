import styles from "./tableFilter.module.css";
import { LanguageInterface } from "@/global/language/constants/language.model";
import { PrimitiveValue, SelectorFilter } from "../table.model";
import { ndIfEmpty } from "@/global/utils/ndIfEmpty";

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
      {options.map((opt, index) => (
        <option
          key={index}
          // He hecho que si viene ND entonces no haga el filtro
          // Porque los valores actuales de "ND" no son "ND", si no "", null, undefined, "  ", etc
          value={ndIfEmpty(opt) === "ND" ? "" : opt?.toString()}
        >
          {ndIfEmpty(opt)}
        </option>
      ))}
    </select>
  );
};
