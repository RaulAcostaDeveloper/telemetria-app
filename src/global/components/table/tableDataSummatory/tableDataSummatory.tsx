import styles from "./tableDataSummatory.module.css";
import { LanguageInterface } from "@/global/language/constants/language.model";
import { SummatoryButtons } from "./summatoryButtons";
import { columnsTable, dataTable } from "../table.model";
import { ndIfEmpty, NO_DATA } from "@/global/utils/ndIfEmpty";

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
  const calcValidDataLength = (index: number) => {
    let validDataLength = 0;

    filteredData.map((item) => {
      const key = Object.keys(item)[index];
      if (ndIfEmpty(item[key]) !== NO_DATA) {
        validDataLength++;
      }
    });
    return validDataLength;
  };

  return (
    <div className={`${styles.tableDataSummatory}`}>
      {columns.map((el, index) => {
        const defaultSpace = {
          width: el.defaultSpace ? `${el.defaultSpace * 50}px` : "fit-content",
        };
        return (
          <div key={el.columnName + index} style={defaultSpace}>
            {el.showTotal && filteredData.length > 0 && (
              <SummatoryButtons
                LANGUAGE={LANGUAGE}
                filteredData={filteredData}
                index={index}
                validDataLength={calcValidDataLength(index)}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
