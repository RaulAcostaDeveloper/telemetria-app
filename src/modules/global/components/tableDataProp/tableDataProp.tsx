"use client";
import { LanguageSelector } from "../../language/utils/languageSelector";
import styles from "./tableDataProp.module.css";

interface Props {
  key: string;
  defaultSpace: {
    width: string;
  };
  value: string;
}

export const TableDataProp = ({ key, defaultSpace, value }: Props) => {
  const LANGUAGE = LanguageSelector();

  const copyToClipboard = async (text: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text);
      console.log(LANGUAGE.table.actions.copySuccess);
    } catch (err) {
      console.error(LANGUAGE.table.actions.copyError, " ", err);
    }
  };

  return (
    <button
      key={key}
      style={defaultSpace}
      className={styles.dataProp}
      title={`${LANGUAGE.table.actions.copy} \"${value}\"`}
      onClick={() => copyToClipboard(value)}
    >
      {value}
    </button>
  );
};
//
