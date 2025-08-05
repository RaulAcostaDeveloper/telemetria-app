import styles from "./tableMinMaxFilter.module.css";
export const TableMinMaxFilter = () => {
  return (
    <div className={styles.tableMinMaxFilter}>
      <div className={styles.title}>
        <span>Min</span>
        <span>Max</span>
      </div>
      <div className={styles.inputs}>
        <input type="number" />
        <span className={styles.title}>-</span>
        <input type="number" />
      </div>
    </div>
  );
};
