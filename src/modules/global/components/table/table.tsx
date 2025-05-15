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

  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.inside}`}>
        <TableServerContent
          LANGUAGE={LANGUAGE}
          columns={columns}
          createFormContent={createFormContent}
          data={data}
          editFormContent={editFormContent}
          filteredData={filteredData}
          idKey={idKey}
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
