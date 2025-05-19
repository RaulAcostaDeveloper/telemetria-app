"use client";
import { useState } from "react";

import styles from "./table.module.css";
import { LanguageInterface } from "../../language/constants/language.model";
import { TableServerContent } from "../tableServerContent/tableServerContent";
import { columnsTable, dataTable } from "./table.model";

interface Props {
  LANGUAGE: LanguageInterface;
  columns: columnsTable;
  data: dataTable;
  deleteFunction?: (idElement: string | number) => void;
  idKey?: string;
  showCreateButton?: boolean;
  showDelete?: boolean;
  showEdit?: boolean;
  showView?: boolean;
  title?: string;
  viewPath?: string;
  createFormContent?: React.FC<{
    dataObject?: { [key: string]: string | number };
    setIsDisabled: (val: boolean) => void;
    setSaveFunction: (cb: () => void) => void;
  }>;
  editFormContent?: React.FC<{
    dataObject: { [key: string]: string | number };
    setIsDisabled: (val: boolean) => void;
    setSaveFunction: (cb: () => void) => void;
  }>;
}

export const Table = ({
  LANGUAGE,
  columns,
  createFormContent,
  data,
  deleteFunction,
  editFormContent,
  idKey,
  showCreateButton,
  showDelete,
  showEdit,
  showView,
  title,
  viewPath,
}: Props) => {
  const [filteredData, setFilteredData] = useState<dataTable>(data);

  const newSelectorFilter = (propIndex: number, value: string) => {
    console.log("newSelectorFilter: ", propIndex, " ", value);
  };

  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.inside}`}>
        <TableServerContent
          LANGUAGE={LANGUAGE}
          columns={columns}
          createFormContent={createFormContent}
          data={data}
          deleteFunction={deleteFunction}
          editFormContent={editFormContent}
          filteredData={filteredData}
          idKey={idKey}
          newSelectorFilter={newSelectorFilter}
          showCreateButton={showCreateButton}
          showDelete={showDelete}
          showEdit={showEdit}
          showView={showView}
          title={title}
          viewPath={viewPath}
        />
      </div>
    </div>
  );
};
