import styles from "./tableServerContent.module.css";
import {
  MODAL_OPTION,
  MinMaxFilter,
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
  modalOption?: MODAL_OPTION;
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
  showViewModal?: boolean;
  title?: string;
  viewPath?: string;
  windowMaxSize?: number;
}

export const TableServerContent = ({
  LANGUAGE,
  columnOrdered,
  columns,
  data,
  deleteFunction,
  filterSelectors,
  filteredData,
  handleMinMaxFilter,
  handleSelectorFilter,
  idKey,
  minMaxFilters,
  modalOption,
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
  showViewModal,
  title,
  viewPath,
  windowMaxSize,
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
            <TableAddNewButton LANGUAGE={LANGUAGE} modalOption={modalOption} />
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
                showGoFuel ||
                showGoOBD ||
                showGoPageView ||
                showViewModal
              }
            />

            {/* Registros de la tabla */}
            <TableDataContent
              LANGUAGE={LANGUAGE}
              columns={columns}
              deleteFunction={deleteFunction}
              filteredData={filteredData}
              idKey={idKey}
              modalOption={modalOption}
              showActions={
                showDelete ||
                showEdit ||
                showGoFuel ||
                showGoOBD ||
                showGoPageView ||
                showViewModal
              }
              showDelete={showDelete}
              showEdit={showEdit}
              showGoFuel={showGoFuel}
              showGoOBD={showGoOBD}
              showGoPageView={showGoPageView}
              showViewModal={showViewModal}
              viewPath={viewPath}
              windowMaxSize={windowMaxSize}
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
