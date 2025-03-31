import styles from "./tableDataSummatory.module.css";
import { LanguageSelector } from "../../language/utils/languageSelector";
import { columnsTable, dataTable } from "../table/table.model";

interface Props {
  columns: columnsTable;
  data: dataTable;
}

export const TableDataSummatory = ({ columns, data }: Props) => {
  const LANGUAGE = LanguageSelector();

  const calcSumm = () => {
    return 4231;
  };

  return (
    <div className={`${styles.tableDataSummatory}`}>
      {columns.map((el) => {
        const defaultSpace = {
          width: el.defaultSpace ? `${el.defaultSpace * 50}px` : "fit-content",
        };
        // Muestra el total de la suma de los datos de la columna correspondiente
        return (
          <>
            <div key={el.columnName + "filter"} style={defaultSpace}>
              {el.showTotal && (
                <div className={`${styles.summatory}`}>
                  <p>{LANGUAGE.table.elements.total}</p>
                  <span>{calcSumm()}</span>
                </div>
              )}
            </div>
          </>
        );
      })}
    </div>
  );
};
