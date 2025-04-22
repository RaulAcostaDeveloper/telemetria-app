import styles from "./tableDataContent.module.css";
import { TableActions } from "../tableActions/tableActions";
import { TableDataProp } from "../tableDataProp/tableDataProp";
import { columnsTable, dataTable } from "../table/table.model";

interface Props {
  columns: columnsTable;
  data: dataTable;
  editFormContent?: React.FC<{
    dataObject: { [key: string]: string | number };
    setIsDisabled: (val: boolean) => void;
    setSaveFunction: (cb: () => void) => void;
  }>;
  idKey?: string;
  showActions?: boolean;
  showDelete?: boolean;
  showEdit?: boolean;
  showView?: boolean;
  viewPath?: string;
}

export const TableDataContent = ({
  columns,
  data,
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
        <div key={dataIndex} className={styles.dataObject}>
          {columns.map((col, colIndex) => {
            const defaultSpace = {
              width: columns[colIndex].defaultSpace
                ? `${columns[colIndex].defaultSpace * 50}px`
                : "fit-content",
            };
            const dataValues = Object.values(dataObject);
            return (
              <div key={colIndex} style={defaultSpace}>
                <TableDataProp
                  value={String(dataValues[colIndex] ?? "-")}
                  defaultSpace={defaultSpace}
                />
              </div>
            );
          })}
          {showActions && (
            <TableActions
              dataObject={dataObject}
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
