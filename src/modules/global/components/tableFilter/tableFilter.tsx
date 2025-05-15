"use client";
import { useState } from "react";

import styles from "./tableFilter.module.css";
import { LanguageInterface } from "../../language/constants/language.model";

interface Props {
  LANGUAGE: LanguageInterface;
  columnName: string;
  newSelectorFilter: (propIndex: number, value: string) => void;
  options: string[];
  propIndex: number;
}

export const TableFilter = ({
  LANGUAGE,
  columnName,
  newSelectorFilter,
  options,
  propIndex,
}: Props) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
    newSelectorFilter(propIndex, e.target.value);
  };

  return (
    <div
      className={styles.selector}
      title={`${LANGUAGE.table.actions.filterBy} "${columnName}"`}
    >
      <select
        id={`filter-${columnName}`}
        className={styles.selectInput}
        value={selectedOption}
        onChange={handleChange}
      >
        <option value="no-filter">{LANGUAGE.table.actions.any}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};
