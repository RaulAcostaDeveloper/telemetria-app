"use client";
import { useEffect, useMemo, useRef, useState } from "react";

import styles from "./tableDataContent.module.css";
import { LanguageInterface } from "../../../language/constants/language.model";
import { TableActions } from "../tableActions/tableActions";
import { TableDataProp } from "../tableDataProp/tableDataProp";
import { MODAL_OPTION, columnsTable, dataTable } from "../table.model";

interface Props {
  LANGUAGE: LanguageInterface;
  columns: columnsTable;
  deleteFunction?: (idElement: string | number) => void;
  filteredData: dataTable;
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
  windowMaxSize?: number;
}

export const TableDataContent = ({
  LANGUAGE,
  columns,
  deleteFunction,
  filteredData,
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
  windowMaxSize = 15,
}: Props) => {
  const [reducedData, setReducedData] = useState<dataTable>([]);

  const insideDataTable = useRef<HTMLDivElement>(null);

  // Inicializar lo renderizado
  useEffect(() => {
    setReducedData(filteredData.slice(0, windowMaxSize)); // por defecto 15
  }, [filteredData, windowMaxSize]);

  // Comportamiento de re asignación de elementos de la tabla (visuales) con el scroll del usuario
  useEffect(() => {
    const dataTableInside = insideDataTable.current;
    if (!dataTableInside) return;

    const handleMouseWheel = (event: WheelEvent) => {
      // Scroll hacia abajo
      // Quitar el primer elemento de reducedData y añadir el siguiente elemento correspondiente
      if (event.deltaY > 0) {
        setReducedData((prev) => {
          if (prev.length === 0) return prev;

          const lastItem = prev[prev.length - 1];
          const lastIndex = filteredData.indexOf(lastItem);

          if (lastIndex === -1) return prev;

          if (lastIndex >= filteredData.length - 1) return prev;

          const nextItem = filteredData[lastIndex + 1];

          return [...prev.slice(1), nextItem];
        });
      }
      // Scroll hacia arriba
      // Quitar el último elemento de reducedData y añadir el elemento correspondiente de filteredData al principio del arreglo
      else if (event.deltaY < 0) {
        setReducedData((prev) => {
          if (prev.length === 0) return prev;

          const firstItem = prev[0];
          const firstIndex = filteredData.indexOf(firstItem); // por referencia

          if (firstIndex === -1) return prev; // referencias no coinciden
          if (firstIndex <= 0) return prev; // ya estamos al inicio (filteredData[0])

          const prevItem = filteredData[firstIndex - 1];
          return [prevItem, ...prev.slice(0, -1)];
        });
      }
    };

    dataTableInside.addEventListener("wheel", handleMouseWheel);

    return () => {
      dataTableInside.removeEventListener("wheel", handleMouseWheel);
    };
  }, [filteredData]);

  // Saber si hay elementos hacia abajo
  const canScrollDown = useMemo(() => {
    if (reducedData.length === 0 || filteredData.length === 0) return false;
    const last = reducedData[reducedData.length - 1];
    const lastIndex = filteredData.indexOf(last); // por referencia
    if (lastIndex === -1) return false; // data rehidratada con nuevas refs
    return lastIndex < filteredData.length - 1; // hay siguiente
  }, [filteredData, reducedData]);

  // Saber si hay elementos hacia arriba
  const canScrollUp = useMemo(() => {
    if (reducedData.length === 0 || filteredData.length === 0) return false;
    const first = reducedData[0];
    const firstIndex = filteredData.indexOf(first); // por referencia
    if (firstIndex === -1) return false;
    return firstIndex > 0; // hay anterior
  }, [filteredData, reducedData]);

  return (
    <>
      {canScrollUp && <div className={styles.scrollDown}>...</div>}

      <div className={styles.dataContent} ref={insideDataTable}>
        {reducedData.map((dataObject, dataIndex) => (
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
                viewPath={viewPath}
              />
            )}
          </div>
        ))}
      </div>

      {canScrollDown && <div className={styles.scrollDown}>...</div>}
    </>
  );
};
