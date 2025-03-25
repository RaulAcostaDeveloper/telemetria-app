import styles from "./tableAddNewButton.module.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
export const TableAddNewButton = () => {
  return (
    <button className={`${styles.tableAddNewButton}`}>
      <span className={`${styles.title}`}>Create</span>
      <AddCircleOutlineIcon />
    </button>
  );
};
