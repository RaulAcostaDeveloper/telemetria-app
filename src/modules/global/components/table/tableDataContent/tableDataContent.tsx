import styles from "./tableDataContent.module.css";
import { LanguageInterface } from "../../../language/constants/language.model";
import { TableActions } from "../tableActions/tableActions";
import { TableDataProp } from "../tableDataProp/tableDataProp";
import { MODAL_OPTION, columnsTable, dataTable } from "../table.model";

interface Props {
  LANGUAGE: LanguageInterface;
  columns: columnsTable;
  data: dataTable;
  deleteFunction?: (idElement: string | number) => void;
  idKey?: string;
  modalOption?: MODAL_OPTION;
  showActions?: boolean;
  showDelete?: boolean;
  showEdit?: boolean;
  showGoFuel?: boolean;
  showGoOBD?: boolean;
  showGoPageView?: boolean;
  showViewModal?: boolean;
  viewPath?: string;
}

export const TableDataContent = ({
  LANGUAGE,
  columns,
  data,
  deleteFunction,
  idKey,
  modalOption,
  showActions,
  showDelete,
  showEdit,
  showGoFuel,
  showGoOBD,
  showGoPageView,
  showViewModal,
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
                  value={dataValues[colIndex] ?? "-"}
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
              idKey={idKey}
              modalOption={modalOption}
              showDelete={showDelete}
              showEdit={showEdit}
              showGoFuel={showGoFuel}
              showGoOBD={showGoOBD}
              showGoPageView={showGoPageView}
              showViewModal={showViewModal}
              viewPath={`${viewPath}${dataObject[idKey ?? ""] ?? ""}`}
            />
          )}
        </div>
      ))}
    </div>
  );
};
