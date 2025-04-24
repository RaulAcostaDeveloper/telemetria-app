"use client";
import styles from "./tableDataProp.module.css";
import { LanguageSelector } from "../../language/utils/languageSelector";

interface Props {
  defaultSpace: { width: string };
  value: string;
}

// Dato en el registro, copiar el dato en clipboard
// Tiene el mismo espacio que se le asignó a la columna
export const TableDataProp = ({ defaultSpace, value }: Props) => {
  const LANGUAGE = LanguageSelector();

  const copyToClipboard = async (text: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text);
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
      {value}
    </button>
  );
};
//
