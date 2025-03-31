import styles from "./tableDataContent.module.css";
import { TableActions } from "../tableActions/tableActions";
import { TableDataProp } from "../tableDataProp/tableDataProp";
import { columnsTable, dataTable } from "../table/table.model";

interface Props {
  columns: columnsTable;
  data: dataTable;
  showActions?: boolean;
  showDelete?: boolean;
  showEdit?: boolean;
  showView?: boolean;
}

export const TableDataContent = ({
  columns,
  data,
  showActions,
  showDelete,
  showEdit,
  showView,
}: Props) => {
  return (
    <>
      {data.map((dataObject, index) => (
        <div key={index} className={styles.dataObject}>
          {/* Datos de la tabla por columna */}
          {Object.entries(dataObject).map(([key, value], propIndex) => {
            const defaultSpace = {
              width: columns[propIndex].defaultSpace
                ? `${columns[propIndex].defaultSpace * 50}px`
                : "fit-content",
            };
            return (
              <TableDataProp
                value={String(value)}
                defaultSpace={defaultSpace}
              />
            );
          })}

          {/* Acciones de la tabla */}
          {showActions && (
            <TableActions
              showDelete={showDelete}
              showEdit={showEdit}
              showView={showView}
            />
          )}
        </div>
      ))}
    </>
  );
};
