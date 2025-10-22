import styles from "./moduleSeparator.module.css";

interface Props {
  title: string;
}

export const ModuleSeparator = ({ title }: Props) => {
  return (
    <div className={styles.title}>
      <hr />
      <h2>{title}</h2>
      <hr />
    </div>
  );
};
