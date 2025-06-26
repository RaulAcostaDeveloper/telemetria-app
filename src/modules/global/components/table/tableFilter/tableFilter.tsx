"use client";
import { useState } from "react";

import styles from "./tableFilter.module.css";
import { LanguageInterface } from "@/modules/global/language/constants/language.model";
import { PrimitiveValue } from "../table.model";

interface Props {
  LANGUAGE: LanguageInterface;
  columnName: string;
  handleSelectorFilter: (propIndex: number, value: string) => void;
  options: PrimitiveValue[];
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
      <label className={styles.title}>{columnName} </label>
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
          <option key={opt} value={opt ? opt : ""}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};
