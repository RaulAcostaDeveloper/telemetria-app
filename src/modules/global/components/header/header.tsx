"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ArrowDownward, CalendarToday } from "@mui/icons-material";
import Calendar from "@/modules/global/components/calendar/Calendar";
import HeaderVehicleFilter from "./headerVehicleFilter/headerVehicleFilter";
import styles from "./header.module.css";
import { formatDateTime } from "@/modules/global/utils/utils";
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
  // Determinar si el componente está montado.
  const [mounted, setMounted] = useState(false);
  // Alternar la visualización del calendario.
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Obtener las fechas desde Redux.
  const { startDate: reduxStartDate, endDate: reduxEndDate } = useSelector(
    (state: RootState) => state.calendar
  );

  const toggleContainer = (): void => {
    setShowCalendar((prev) => !prev);
  };

  // Usar la fecha actual por defecto si no hay fechas en Redux.
  const defaultISO: string = new Date().toISOString();
  const start: string = reduxStartDate
    ? formatDateTime(reduxStartDate)
    : formatDateTime(defaultISO);
  const end: string = reduxEndDate
    ? formatDateTime(reduxEndDate)
    : formatDateTime(defaultISO);

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
              <HeaderBackButton LANGUAGE={LANGUAGE} />
              {/* Renderizar el VehicleFilter (input de búsqueda con dropdown) */}
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
