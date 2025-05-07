import styles from "./tableFilters.module.css";
import { LanguageInterface } from "../../language/constants/language.model";
import { TableFilter } from "../tableFilter/tableFilter";
import { columnsTable } from "../table/table.model";

interface Props {
  LANGUAGE: LanguageInterface;
  columns: columnsTable;
}

export const TableFilters = ({ columns, LANGUAGE }: Props) => {
  return (
    <div className={`${styles.tableFilters}`}>
      {columns.map((el, index) => {
        // Espacio que se le indicó en la columna
        const defaultSpace = {
          width: el.defaultSpace ? `${el.defaultSpace * 50}px` : "fit-content",
        };
        return (
          <div key={el.columnName + index} style={defaultSpace}>
            {/* Mostrar un selector con las opciones de filtrado disponible */}
            {el.filterOptions && (
              <TableFilter LANGUAGE={LANGUAGE} columnName={el.columnName} />
            )}
          </div>
        );
      })}
    </div>
  );
};
//
