import styles from "./tableDataSummatory.module.css";
import { columnsTable, dataTable } from "../table/table.model";
import { LanguageInterface } from "../../language/constants/language.model";

interface Props {
  LANGUAGE: LanguageInterface;
  columns: columnsTable;
  data: dataTable;
}

export const TableDataSummatory = ({ columns, data, LANGUAGE }: Props) => {
  // Calcula la suma de todos los valores de ese parámetro
  const calcSumm = (index: number): number => {
    let total = 0;

    for (const item of data) {
      const key = Object.keys(item)[index];

      if (key) {
        const value = parseFloat(item[key]);
        if (!isNaN(value)) {
          total += value;
        }
      }
    }

    return total;
  };

  return (
    <div className={`${styles.tableDataSummatory}`}>
      {columns.map((el, index) => {
        const defaultSpace = {
          width: el.defaultSpace ? `${el.defaultSpace * 50}px` : "fit-content",
        };
        return (
          <div key={el.columnName + index} style={defaultSpace}>
            {el.showTotal && (
              <div className={`${styles.summatory}`}>
                <p>{LANGUAGE.table.elements.total}</p>
                <span>{calcSumm(index)}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
