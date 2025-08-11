import styles from "./tableServerContent.module.css";
import {
  MinMaxFilter,
  PrimitiveValue,
  SelectorFilter,
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
import { TableFiltersButton } from "../tableFiltersButton/tableFiltersButton";
import { TableSearch } from "../tableSearch/tableSearch";

interface Props {
  LANGUAGE: LanguageInterface;
  columnOrdered: SelectorOrdered;
  columns: columnsTable;
  data: dataTable;
  deleteFunction?: (idElement: string | number) => void;
  filterSelectors: SelectorFilter[];
  filteredData: dataTable;
  handleMinMaxFilter: ({ colIndex, min, max }: MinMaxFilter) => void;
  handleSelectorFilter: ({ colIndex, value }: SelectorFilter) => void;
  idKey?: string;
  minMaxFilters: MinMaxFilter[];
  resetFilters: () => void;
  setColumnOrdered: React.Dispatch<React.SetStateAction<SelectorOrdered>>;
  setInputFilterValue: (value: string) => void;
  setMinHeight: (height: number) => void;
  showCreateButton?: boolean;
  showDelete?: boolean;
  showEdit?: boolean;
  showGoFuel?: boolean;
  showGoOBD?: boolean;
  showGoPageView?: boolean;
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
  filterSelectors,
  filteredData,
  handleMinMaxFilter,
  handleSelectorFilter,
  idKey,
  minMaxFilters,
  resetFilters,
  setColumnOrdered,
  setInputFilterValue,
  setMinHeight,
  showCreateButton,
  showDelete,
  showEdit,
  showGoFuel,
  showGoOBD,
  showGoPageView,
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
          <TableFiltersButton
            LANGUAGE={LANGUAGE}
            columns={columns}
            data={data}
            filterSelectors={filterSelectors}
            handleMinMaxFilter={handleMinMaxFilter}
            handleSelectorFilter={handleSelectorFilter}
            minMaxFilters={minMaxFilters}
            resetFilters={resetFilters}
            setMinHeight={setMinHeight}
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
                showDelete ||
                showEdit ||
                showGoPageView ||
                showGoFuel ||
                showGoOBD
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
                showDelete ||
                showEdit ||
                showGoPageView ||
                showGoFuel ||
                showGoOBD
              }
              showDelete={showDelete}
              showEdit={showEdit}
              showGoFuel={showGoFuel}
              showGoOBD={showGoOBD}
              showGoPageView={showGoPageView}
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
