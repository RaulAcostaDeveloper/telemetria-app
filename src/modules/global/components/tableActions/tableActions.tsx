import styles from "./tableActions.module.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  showActions?: boolean;
  showDelete?: boolean;
  showEdit?: boolean;
  showView?: boolean;
}

export const TableActions = ({ showDelete, showEdit, showView }: Props) => {
  return (
    <div className={`${styles.tableActions}`}>
      {showView && (
        <button className={`${styles.button}`} title="View more info">
          <VisibilityIcon />
        </button>
      )}
      {showEdit && (
        <button className={`${styles.button}`} title="Edit element">
          <ModeEditIcon />
        </button>
      )}
      {showDelete && (
        <button className={`${styles.button}`} title="Delete element">
          <DeleteIcon />
        </button>
      )}
    </div>
  );
};
