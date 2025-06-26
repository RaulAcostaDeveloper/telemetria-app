import styles from "./tableServerContent.module.css";
import {
  PrimitiveValue,
  SelectorOrdered,
  columnsTable,
  dataTable,
} from "../table.model";
import { LanguageInterface } from "@/modules/global/language/constants/language.model";
import { TableAddNewButton } from "../tableAddNewButton/tableAddNewButton";
import { TableCSVButtonsContainer } from "../tableCSVButtonsContainer/tableCSVButtonsContainer";
import { TableColumns } from "../tableColumns/tableColumns";
import { TableDataContent } from "../tableDataContent/tableDataContent";
import { TableDataSummatory } from "../tableDataSummatory/tableDataSummatory";
import { TableFilters } from "../tableFilters/tableFilters";
import { TableFiltersButton } from "../tableFiltersButton/tableFiltersButton";
import { TableSearch } from "../tableSearch/tableSearch";

interface Props {
  LANGUAGE: LanguageInterface;
  columnOrdered: SelectorOrdered;
  columns: columnsTable;
  data: dataTable;
  deleteFunction?: (idElement: string | number) => void;
  filteredData: dataTable;
  handleSelectorFilter: (propIndex: number, value: string) => void;
  idKey?: string;
  setColumnOrdered: React.Dispatch<React.SetStateAction<SelectorOrdered>>;
  setInputFilterValue: (value: string) => void;
  showCreateButton?: boolean;
  showDelete?: boolean;
  showEdit?: boolean;
  showGoFuel?: boolean;
  showGoOBT?: boolean;
  showView?: boolean;
  title?: string;
  viewPath?: string;
  createFormContent?: React.FC<{
    dataObject?: { [key: string]: PrimitiveValue };
    setIsDisabled: (val: boolean) => void;
    setSaveFunction: (cb: () => void) => void;
  }>;
  editFormContent?: React.FC<{
    dataObject: { [key: string]: PrimitiveValue };
    setIsDisabled: (val: boolean) => void;
    setSaveFunction: (cb: () => void) => void;
  }>;
}

export const TableServerContent = ({
  LANGUAGE,
  columnOrdered,
  columns,
  createFormContent,
  data,
  deleteFunction,
  editFormContent,
  filteredData,
  handleSelectorFilter,
  idKey,
  setColumnOrdered,
  setInputFilterValue,
  showCreateButton,
  showDelete,
  showEdit,
  showGoFuel,
  showGoOBT,
  showView,
  title,
  viewPath,
}: Props) => {
  return (
    <>
      <div className={styles.inside}>
        {/* Título */}
        {title && <h4 className={`${styles.title}`}>{title}</h4>}

        {/* Búsqueda en la primer columna*/}
        <div className={`${styles.topActions}`}>
          <TableSearch
            LANGUAGE={LANGUAGE}
            setInputFilterValue={setInputFilterValue}
          />
          {showCreateButton && (
            <TableAddNewButton
              LANGUAGE={LANGUAGE}
              createFormContent={createFormContent}
            />
          )}
          <TableCSVButtonsContainer
            LANGUAGE={LANGUAGE}
            columns={columns}
            filteredData={filteredData}
            tableData={data}
            title={title}
          />
          <TableFiltersButton LANGUAGE={LANGUAGE} />
        </div>
        {/* Filtros por columna */}
        <div className={`${styles.topActions}`}>
          <TableFilters
            LANGUAGE={LANGUAGE}
            columns={columns}
            data={data}
            handleSelectorFilter={handleSelectorFilter}
          />
        </div>

        {/* Tabla */}
        <div className={`${styles.tableContent}`}>
          <div>
            {/* Columnas */}
            <TableColumns
              LANGUAGE={LANGUAGE}
              columnOrdered={columnOrdered}
              columns={columns}
              setColumnOrdered={setColumnOrdered}
              showActions={
                showDelete || showEdit || showView || showGoFuel || showGoOBT
              }
            />

            {/* Registros de la tabla */}
            <TableDataContent
              LANGUAGE={LANGUAGE}
              columns={columns}
              data={filteredData}
              deleteFunction={deleteFunction}
              editFormContent={editFormContent}
              idKey={idKey}
              showActions={
                showDelete || showEdit || showView || showGoFuel || showGoOBT
              }
              showDelete={showDelete}
              showEdit={showEdit}
              showGoFuel={showGoFuel}
              showGoOBT={showGoOBT}
              showView={showView}
              viewPath={viewPath}
            />
          </div>
        </div>

        {/* Suma de valores */}
        <TableDataSummatory
          LANGUAGE={LANGUAGE}
          columns={columns}
          data={filteredData}
        />
      </div>
    </>
  );
};
