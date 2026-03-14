import Link from "next/link";

import styles from "./mainFooter.module.css";
export const MainFooter = () => {
  return (
    <footer className={styles.footer}>
      <div>
        <Link href={"https://www.raulacostadeveloper.com/"} target="_blank">
          - By Raúl Acosta Developer -
        </Link>
      </div>
    </footer>
  );
};
