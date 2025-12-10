"use client";
import { useEffect, useState } from "react";
import InfoIcon from "@mui/icons-material/Info";

import styles from "./tableDataSummatory.module.css";
import { LanguageInterface } from "@/global/language/constants/language.model";
import { dataTable, PrimitiveValue } from "../table.model";
import { formatNumberWithCommas } from "@/global/utils/stringUtils";

interface Props {
  LANGUAGE: LanguageInterface;
  validDataLength: number;
  filteredData: dataTable;
  index: number;
}

export const SummatoryButtons = ({
  LANGUAGE,
  validDataLength,
  filteredData,
  index,
}: Props) => {
  const [sum, setSum] = useState<number>();
  const [average, setAverage] = useState<number>();

  useEffect(() => {
    const sumCalc = calcSumm(index, filteredData);
    setSum(sumCalc);
    setAverage(calcAverage(sumCalc, validDataLength));
  }, [filteredData, index, validDataLength]);

  const copyToClipboard = async (text: PrimitiveValue): Promise<void> => {
    try {
      await navigator.clipboard.writeText(String(text));
    } catch (err) {
      console.warn(LANGUAGE.table.actions.copyError, " ", err);
    }
  };

  // Calcula la suma de todos los valores de ese parámetro
  const calcSumm = (index: number, filteredData: dataTable): number => {
    let total = 0;

    for (const item of filteredData) {
      const key = Object.keys(item)[index];

      if (key) {
        const rawValue = item[key];
        const value = Number(rawValue);

        if (!isNaN(value)) {
          total += value;
        }
      }
    }

    // Máximo 3 decimales
    return Math.round(total * 1000) / 1000;
  };

  const calcAverage = (sum: number, validDataLength: number): number => {
    if (0 !== sum && 0 !== validDataLength) {
      return Math.round((sum / validDataLength) * 1000) / 1000;
    } else {
      return 0;
    }
  };

  return (
    <>
      {sum && (
        <button
          className={`${styles.summatory} ${styles.button}`}
          title={`${LANGUAGE.table.actions.copy} \"${sum}\"`}
          onClick={() => copyToClipboard(sum)}
        >
          <p>
            {LANGUAGE.table.elements.total}
            <InfoIcon
              fontSize="large"
              titleAccess={
                LANGUAGE.table.elements.validDataLength + " " + validDataLength
              }
            />
          </p>
          <span>{formatNumberWithCommas(sum)}</span>
        </button>
      )}

      {average && (
        <button
          className={`${styles.average} ${styles.button}`}
          title={`${LANGUAGE.table.actions.copy} \"${average}\"`}
          onClick={() => copyToClipboard(average)}
        >
          <p>
            {LANGUAGE.table.elements.average}
            <InfoIcon
              fontSize="large"
              titleAccess={
                LANGUAGE.table.elements.validDataLength + " " + validDataLength
              }
            />
          </p>
          <span>{formatNumberWithCommas(average)}</span>
        </button>
      )}
    </>
  );
};
