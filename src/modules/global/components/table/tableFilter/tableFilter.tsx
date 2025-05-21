"use client";
import { useState } from "react";

import styles from "./tableFilter.module.css";
import { LanguageInterface } from "@/modules/global/language/constants/language.model";

interface Props {
  LANGUAGE: LanguageInterface;
  columnName: string;
  handleSelectorFilter: (propIndex: number, value: string) => void;
  options: string[];
  propIndex: number;
}

export const TableFilter = ({
  LANGUAGE,
  columnName,
  handleSelectorFilter,
  options,
  propIndex,
}: Props) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleSelectorFilter(propIndex, e.target.value);
    setSelectedOption(e.target.value);
  };

  return (
    <div
      className={styles.selector}
      title={`${LANGUAGE.table.actions.filterBy} "${columnName}"`}
    >
      <select
        id={`filter-${columnName}`}
        className={`${styles.selectInput} ${
          selectedOption ? styles.selectedOption : ""
        }`}
        value={selectedOption}
        onChange={handleChange}
      >
        <option value="">{LANGUAGE.table.actions.any}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};
