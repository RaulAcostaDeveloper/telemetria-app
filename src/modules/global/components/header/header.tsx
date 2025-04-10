"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import Calendar from "@/modules/global/components/calendar/Calendar";
import styles from "./header.module.css";
import { formatDateTime } from "@/modules/global/utils/utils";
import VehicleFilter from "@/modules/global/components/vehicleFilter/VehicleFilter";

interface CalendarState {
  startDate: string | null;
  endDate: string | null;
}

interface RootState {
  calendar: CalendarState;
}

export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Determinar si el componente está montado.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Obtener las fechas desde Redux.
  const { startDate: reduxStartDate, endDate: reduxEndDate } = useSelector(
    (state: RootState) => state.calendar
  );

  // Alternar la visualización del calendario.
  const [showCalendar, setShowCalendar] = useState(false);
  const toggleContainer = (): void => {
    setShowCalendar((prev) => !prev);
  };

  // Retroceder a la página anterior.
  const goBack = (): void => {
    if (pathname !== "/") {
      router.back();
    }
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
            <button onClick={goBack} className={styles.returnButton}>
              <ArrowBackIcon />
            </button>
            {/* Renderizar el VehicleFilter (input de búsqueda con dropdown) */}
            <div className={styles.inputAndDatesContainer}>
              <VehicleFilter />
              <button
                onClick={toggleContainer}
                id="date"
                type="button"
                data-state={showCalendar ? "open" : "closed"}
                className={styles.dateButton}
              >
                <CalendarTodayIcon className={styles.calendarIcon} />
                <div className={styles.dateContainer}>
                  <span className={styles.startDate}>{start}</span>
                  <span className={styles.endDate}>{end}</span>
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
