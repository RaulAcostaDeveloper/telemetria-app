"use client";

import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import styles from "./header.module.css";

export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  const goBack = () => {
    if (pathname !== "/") {
      router.back();
    }
  };

  return (
    <header className={`${styles.header}`}>
      <nav className={styles.navBar}>
        <button onClick={goBack} className={styles.returnButton}>
          <ArrowBackIcon />
        </button>
      </nav>
    </header>
  );
};
