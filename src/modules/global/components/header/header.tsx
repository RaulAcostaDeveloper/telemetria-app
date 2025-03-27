"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Calendar from "@/modules/global/components/calendar/Calendar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import styles from "./header.module.css";

export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [showCalendar, setShowCalendar] = useState(false);
  const toggleContainer = () => {
    setShowCalendar(!showCalendar);
  };

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
        <button onClick={toggleContainer} className={styles.btn}>
          Este mes
        </button>
      </nav>
      {showCalendar && <Calendar toggleContainer={toggleContainer} />}
    </header>
  );
};
