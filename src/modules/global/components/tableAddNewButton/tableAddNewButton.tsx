"use client";
import { GeneralButton } from "../generalButton/generalButton";
import styles from "./tableAddNewButton.module.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export const TableAddNewButton = () => {
  return (
    <GeneralButton
      Icon={<AddCircleOutlineIcon />}
      buttonStyle={styles.tableAddNewButton}
      callback={() => {}}
      title="Create"
      type={1}
    />
  );
};
