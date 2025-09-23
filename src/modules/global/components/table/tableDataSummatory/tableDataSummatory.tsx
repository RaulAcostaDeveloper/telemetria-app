import styles from "./tableDataSummatory.module.css";
import { LanguageInterface } from "@/modules/global/language/constants/language.model";
import { columnsTable, dataTable } from "../table.model";

interface Props {
  LANGUAGE: LanguageInterface;
  columns: columnsTable;
  filteredData: dataTable;
}

export const TableDataSummatory = ({
  columns,
  filteredData,
  LANGUAGE,
}: Props) => {
  // Calcula la suma de todos los valores de ese parámetro
  const calcSumm = (index: number): number => {
    let total = 0;

    for (const item of filteredData) {
      const key = Object.keys(item)[index];

      if (key) {
        const rawValue = item[key];
        const value = Number(rawValue);

        if (!isNaN(value)) {
          total += value;
        }
      }
    }

    // Máximo 3 decimales
    return Math.round(total * 1000) / 1000;
  };
  const calcAverage = (index: number): number => {
    const sum = calcSumm(index);
    if (0 !== sum && 0 !== filteredData.length) {
      return Math.round(((sum / filteredData.length) * 1000) / 1000);
    } else {
      return 0;
    }
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
              <>
                <div className={`${styles.summatory}`}>
                  <p>{LANGUAGE.table.elements.total}</p>
                  <span>{calcSumm(index)}</span>
                </div>
                <div className={`${styles.average}`}>
                  <p>{LANGUAGE.table.elements.average}</p>
                  <span>{calcAverage(index)}</span>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};
