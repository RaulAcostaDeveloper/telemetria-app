import styles from "./tableDataContent.module.css";
import { TableActions } from "../tableActions/tableActions";
import { TableDataProp } from "../tableDataProp/tableDataProp";
import { columnsTable, dataTable } from "../table/table.model";
import { LanguageInterface } from "../../language/constants/language.model";

interface Props {
  LANGUAGE: LanguageInterface;
  columns: columnsTable;
  data: dataTable;
  deleteFunction?: (idElement: string | number) => void;
  idKey?: string;
  showActions?: boolean;
  showDelete?: boolean;
  showEdit?: boolean;
  showView?: boolean;
  viewPath?: string;
  editFormContent?: React.FC<{
    dataObject: { [key: string]: string | number };
    setIsDisabled: (val: boolean) => void;
    setSaveFunction: (cb: () => void) => void;
  }>;
}

export const TableDataContent = ({
  LANGUAGE,
  columns,
  data,
  deleteFunction,
  editFormContent,
  idKey,
  showActions,
  showDelete,
  showEdit,
  showView,
  viewPath,
}: Props) => {
  return (
    <div className={styles.dataContent}>
      {data.map((dataObject, dataIndex) => (
        // Registros de la tabla
        <div key={dataIndex} className={styles.dataObject}>
          {columns.map((col, colIndex) => {
            // Espacio que se le indicó en la columna
            const defaultSpace = {
              width: columns[colIndex].defaultSpace
                ? `${columns[colIndex].defaultSpace * 50}px`
                : "fit-content",
            };
            const dataValues = Object.values(dataObject);
            return (
              <div key={colIndex} style={defaultSpace}>
                <TableDataProp
                  LANGUAGE={LANGUAGE}
                  value={String(dataValues[colIndex] ?? "-")}
                  defaultSpace={defaultSpace}
                />
              </div>
            );
          })}

          {/* Acciones de los registros */}
          {showActions && (
            <TableActions
              LANGUAGE={LANGUAGE}
              dataObject={dataObject}
              deleteFunction={deleteFunction}
              editFormContent={editFormContent}
              idKey={idKey}
              showDelete={showDelete}
              showEdit={showEdit}
              showView={showView}
              viewPath={`${viewPath}${dataObject[idKey ?? ""]}`}
            />
          )}
        </div>
      ))}
    </div>
  );
};
