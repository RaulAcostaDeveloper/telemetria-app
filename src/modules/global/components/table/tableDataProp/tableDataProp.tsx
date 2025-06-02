"use client";

import styles from "./tableDataProp.module.css";
import { LanguageInterface } from "@/modules/global/language/constants/language.model";
import { PrimitiveValue } from "../table.model";

interface Props {
  defaultSpace: { width: string };
  value: PrimitiveValue;
  LANGUAGE: LanguageInterface;
}

// Dato en el registro, copiar el dato en clipboard
// Tiene el mismo espacio que se le asignó a la columna
export const TableDataProp = ({ defaultSpace, value, LANGUAGE }: Props) => {
  const copyToClipboard = async (text: PrimitiveValue): Promise<void> => {
    try {
      await navigator.clipboard.writeText(String(text));
    } catch (err) {
      console.error(LANGUAGE.table.actions.copyError, " ", err);
    }
  };

  return (
    <button
      className={styles.dataProp}
      onClick={() => copyToClipboard(value)}
      style={defaultSpace}
      title={`${LANGUAGE.table.actions.copy} \"${value}\"`}
    >
      {value === "" ? <span>&nbsp;</span> : value}
    </button>
  );
};
//
