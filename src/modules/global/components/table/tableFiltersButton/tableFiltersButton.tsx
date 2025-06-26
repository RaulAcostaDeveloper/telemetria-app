"use client";
import { useState } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

import styles from "./tableFiltersButton.module.css";
import { ButtonTypes } from "../../generalButton/generalButton.model";
import { GeneralButton } from "../../generalButton/generalButton";
import { LanguageInterface } from "@/modules/global/language/constants/language.model";
import { TableFilters } from "../tableFilters/tableFilters";
import { columnsTable, dataTable } from "../table.model";

interface Props {
  LANGUAGE: LanguageInterface;
  columns: columnsTable;
  data: dataTable;
  handleSelectorFilter: (propIndex: number, value: string) => void;
}

export const TableFiltersButton = ({
  LANGUAGE,
  columns,
  data,
  handleSelectorFilter,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={styles.container}>
      <GeneralButton
        type={ButtonTypes.CONFIRM}
        callback={() => {
          setIsOpen(!isOpen);
        }}
        buttonStyle={styles.button}
        placeholder={LANGUAGE.table.buttons.filtersButton}
        Icon={<FilterAltIcon />}
      />
      {isOpen && (
        <div className={styles.filtersContent}>
          <TableFilters
            LANGUAGE={LANGUAGE}
            columns={columns}
            data={data}
            handleSelectorFilter={handleSelectorFilter}
          />
          <div className={styles.buttonCloseContainer}>
            <GeneralButton
              type={ButtonTypes.NEUTRAL}
              callback={() => {
                setIsOpen(!isOpen);
              }}
              title={LANGUAGE.table.actions.close}
              placeholder={LANGUAGE.table.actions.close}
            />
          </div>
        </div>
      )}
      {/* Agregar "no hay filtros disponibles para esta tabla" */}
    </div>
  );
};
