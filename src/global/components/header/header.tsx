"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";

import Calendar from "@/global/components/calendar/Calendar";
import HeaderVehicleFilter from "./headerVehicleFilter/headerVehicleFilter";
import SouthIcon from "@mui/icons-material/South";
import styles from "./header.module.css";
import { CalendarToday } from "@mui/icons-material";
import { HeaderBackButton } from "./headerBackButton/headerBackButton";
import { HeaderTextContent } from "./headerTextContent/headerTextContent";
import { LanguageInterface } from "../../language/constants/language.model";
import { formatDateTime } from "@/global/utils/dateUtils";
import { LanguageButton } from "./languageButton/languageButton";

interface CalendarState {
  endDate: string | null;
  startDate: string | null;
}

interface RootState {
  calendar: CalendarState;
}

interface Props {
  isMenuOpen: boolean | null;
  LANGUAGE: LanguageInterface;
}

export const Header = ({ isMenuOpen, LANGUAGE }: Props) => {
  const [mounted, setMounted] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const pathname = usePathname();

  const { startDate: reduxStartDate, endDate: reduxEndDate } = useSelector(
    (state: RootState) => state.calendar
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleContainer = (): void => {
    setShowCalendar((prev) => !prev);
  };

  const defaultISO = new Date().toISOString();
  const start = formatDateTime(reduxStartDate ?? defaultISO);
  const end = formatDateTime(reduxEndDate ?? defaultISO);

  return (
    <>
      <header
        className={styles.header}
        style={{
          width:
            isMenuOpen !== true ? "calc(100% - 80px)" : "calc(100% - 250px)",
          transition: isMenuOpen !== true ? "0.9s" : "1.1s",
        }}
      >
        {mounted && (
          <>
            <nav className={styles.navBar}>
              <div className={styles.subContainer}>
                {" "}
                <HeaderBackButton LANGUAGE={LANGUAGE} />
                <HeaderTextContent LANGUAGE={LANGUAGE} currentUrl={pathname} />
              </div>

              <div className={styles.inputAndDatesContainer}>
                <HeaderVehicleFilter LANGUAGE={LANGUAGE} />
                <button
                  onClick={toggleContainer}
                  id="date"
                  type="button"
                  data-state={showCalendar ? "open" : "closed"}
                  className={styles.dateButton}
                  title={LANGUAGE.header.calendar.buttonHover}
                >
                  <CalendarToday className={styles.calendarIcon} />
                  <SouthIcon className={styles.arrowIcon} />
                  <div className={styles.dateContainer}>
                    <span className={styles.startDate}>{start}</span>
                    <span className={styles.endDate}>{end}</span>
                  </div>
                </button>
                <LanguageButton LANGUAGE={LANGUAGE} />
              </div>
            </nav>
            {showCalendar && (
              <Calendar LANGUAGE={LANGUAGE} toggleContainer={toggleContainer} />
            )}
          </>
        )}
      </header>
      <div className={styles.shadowHeader}>{/* Shadow Header */}.</div>
    </>
  );
};

export default Header;
