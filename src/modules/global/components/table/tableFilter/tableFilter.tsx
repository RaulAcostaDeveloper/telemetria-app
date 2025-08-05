import styles from "./tableFilter.module.css";
import { LanguageInterface } from "@/modules/global/language/constants/language.model";
import { PrimitiveValue } from "../table.model";

interface Props {
  LANGUAGE: LanguageInterface;
  columnName: string;
  filterRenderIndex: number;
  handleSelectorFilter: (propIndex: number, value: string) => void;
  options: PrimitiveValue[];
  propIndex: number;
  selectedOptions: string[];
  setSelectedOptions: React.Dispatch<React.SetStateAction<string[]>>;
}

export const TableFilter = ({
  LANGUAGE,
  columnName,
  filterRenderIndex,
  handleSelectorFilter,
  options,
  propIndex,
  selectedOptions,
  setSelectedOptions,
}: Props) => {
  // Actualiza los filtros desde el componente TableFiltersButton
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleSelectorFilter(propIndex, e.target.value);
    setSelectedOptions((prevOptions) => {
      const updated = [...prevOptions];
      updated[filterRenderIndex] = e.target.value;
      return updated;
    });
  };

  // Va a usar el arreglo de selectedOptions
  return (
    <select
      id={`filter-${columnName}`}
      className={`${styles.selectInput} ${
        selectedOptions[filterRenderIndex] ? styles.selectedOption : ""
      }`}
      value={selectedOptions[filterRenderIndex]}
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
