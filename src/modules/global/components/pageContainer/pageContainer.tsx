import styles from "./pageContainer.module.css";

interface Props {
  children: React.ReactNode;
}

export const PageContainer = ({ children }: Props) => (
  <div className={`${styles.pageContainer}`}>{children}</div>
);
