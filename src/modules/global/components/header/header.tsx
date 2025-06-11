"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import { ArrowDownward, CalendarToday } from "@mui/icons-material";
import Calendar from "@/modules/global/components/calendar/Calendar";
import HeaderVehicleFilter from "./headerVehicleFilter/headerVehicleFilter";
import styles from "./header.module.css";
import { formatDateTime } from "@/modules/global/utils/utils";
import { isSingleFuelPage } from "./utils";
import { LanguageInterface } from "../../language/constants/language.model";
import { HeaderBackButton } from "./headerBackButton/headerBackButton";

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
  const areWeinSingleFuelPage = isSingleFuelPage(pathname);

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
                {areWeinSingleFuelPage && (
                  <div className={styles.platesAndName}>
                    <span>VA4784A</span>
                    <span>HILUX</span>
                  </div>
                )}
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
                  <ArrowDownward className={styles.arrowIcon} />
                  <div className={styles.dateContainer}>
                    <span className={styles.startDate}>{start}</span>
                    <span className={styles.endDate}>{end}</span>
                  </div>
                </button>
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
