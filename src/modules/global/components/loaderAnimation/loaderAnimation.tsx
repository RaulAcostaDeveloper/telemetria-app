import styles from "./loaderAnimation.module.css";

interface Props {
  cellSize?: number;
}

export default function LoaderAnimation({ cellSize = 26 }: Props) {
  const cells = 3;
  const totalSize = cells * (cellSize + 2);
  const calcFlex = `0 0 ${cellSize}`;

  return (
    <div
      className={styles.loader}
      style={{ width: `${totalSize}px`, height: `${totalSize}px` }}
    >
      <div
        className={`${styles.cell} ${styles["d-0"]}`}
        style={{ flex: `${calcFlex}px` }}
      ></div>
      <div
        className={`${styles.cell} ${styles["d-1"]}`}
        style={{ flex: `${calcFlex}px` }}
      ></div>
      <div
        className={`${styles.cell} ${styles["d-2"]}`}
        style={{ flex: `${calcFlex}px` }}
      ></div>

      <div
        className={`${styles.cell} ${styles["d-1"]}`}
        style={{ flex: `${calcFlex}px` }}
      ></div>
      <div
        className={`${styles.cell} ${styles["d-2"]}`}
        style={{ flex: `${calcFlex}px` }}
      ></div>

      <div
        className={`${styles.cell} ${styles["d-2"]}`}
        style={{ flex: `${calcFlex}px` }}
      ></div>
      <div
        className={`${styles.cell} ${styles["d-3"]}`}
        style={{ flex: `${calcFlex}px` }}
      ></div>

      <div
        className={`${styles.cell} ${styles["d-3"]}`}
        style={{ flex: `${calcFlex}px` }}
      ></div>
      <div
        className={`${styles.cell} ${styles["d-4"]}`}
        style={{ flex: `${calcFlex}px` }}
      ></div>
    </div>
  );
}
