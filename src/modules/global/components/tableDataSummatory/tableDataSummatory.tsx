import styles from "./tableDataSummatory.module.css";
import { columnsTable, dataTable } from "../table/table.model";
import { LanguageInterface } from "../../language/constants/language.model";

interface Props {
  LANGUAGE: LanguageInterface;
  columns: columnsTable;
  data: dataTable;
}

export const TableDataSummatory = ({ columns, data, LANGUAGE }: Props) => {
  const calcSumm = () => {
    return 4231;
  };

  return (
    <div className={`${styles.tableDataSummatory}`}>
      {columns.map((el, index) => {
        // Espacio que se le indicó en la columna
        const defaultSpace = {
          width: el.defaultSpace ? `${el.defaultSpace * 50}px` : "fit-content",
        };

        // Muestra el total de la suma de los datos de la columna correspondiente
        return (
          <div key={el.columnName + index} style={defaultSpace}>
            {el.showTotal && (
              <div className={`${styles.summatory}`}>
                <p>{LANGUAGE.table.elements.total}</p>
                <span>{calcSumm()}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
