"use client";
import styles from "./tableDataProp.module.css";

interface Props {
  key: string;
  defaultSpace: {
    width: string;
  };
  value: string;
}

export const TableDataProp = ({ key, defaultSpace, value }: Props) => {
  const copyToClipboard = async (text: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text);
      console.log("Texto copiado al portapapeles");
    } catch (err) {
      console.error("Error al copiar:", err);
    }
  };
  return (
    <button
      key={key}
      style={defaultSpace}
      className={styles.dataProp}
      title="Copy"
      onClick={() => copyToClipboard(value)}
    >
      {value}
    </button>
  );
};
