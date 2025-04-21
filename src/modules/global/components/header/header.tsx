"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { ArrowBack, ArrowForward, CalendarToday } from "@mui/icons-material";

import Calendar from "@/modules/global/components/calendar/Calendar";
import HeaderVehicleFilter from "../headerVehicleFilter/headerVehicleFilter";
import styles from "./header.module.css";
import { HeaderBackButton } from "../headerBackButton/headerBackButton";
import { formatDateTime } from "@/modules/global/utils/utils";
import { LanguageSelector } from "../../language/utils/languageSelector";

interface CalendarState {
  endDate: string | null;
  startDate: string | null;
}

interface RootState {
  calendar: CalendarState;
}

const LANGUAGE = LanguageSelector();

export const Header = () => {
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
    <header className={styles.header}>
      {mounted && (
        <>
          <nav className={styles.navBar}>
            <HeaderBackButton />
            {/* Renderizar el VehicleFilter (input de búsqueda con dropdown) */}
            <div className={styles.inputAndDatesContainer}>
              <HeaderVehicleFilter />
              <button
                onClick={toggleContainer}
                id="date"
                type="button"
                data-state={showCalendar ? "open" : "closed"}
                className={styles.dateButton}
                title={LANGUAGE.header.calendar.buttonHover}
              >
                <CalendarToday className={styles.calendarIcon} />
                <div className={styles.dateContainer}>
                  <span className={styles.startDate}>
                    <ArrowForward />
                    {start}
                  </span>
                  <span className={styles.endDate}>
                    <ArrowBack />

                    {end}
                  </span>
                </div>
              </button>
            </div>
          </nav>
          {showCalendar && <Calendar toggleContainer={toggleContainer} />}
        </>
      )}
    </header>
  );
};

export default Header;
