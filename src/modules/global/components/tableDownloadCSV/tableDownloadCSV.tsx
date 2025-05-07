"use client";
import DownloadIcon from "@mui/icons-material/Download";

import styles from "./tableDownloadCSV.module.css";
import { ButtonTypes } from "../generalButton/generalButton.model";
import { GeneralButton } from "../generalButton/generalButton";
import { LanguageInterface } from "../../language/constants/language.model";

interface Props {
  LANGUAGE: LanguageInterface;
}

export const TableDownloadCSV = ({ LANGUAGE }: Props) => {
  return (
    <GeneralButton
      Icon={<DownloadIcon />}
      buttonStyle={styles.tableDownloadCSV}
      callback={() => {}}
      title={LANGUAGE.table.buttons.downloadCSV}
      type={ButtonTypes.SUCCESS}
    />
  );
};
