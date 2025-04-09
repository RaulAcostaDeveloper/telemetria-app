"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import Calendar from "@/modules/global/components/calendar/Calendar";
import styles from "./header.module.css";

interface CalendarState {
  startDate: string | null;
  endDate: string | null;
}

interface RootState {
  calendar: CalendarState;
}

// Función auxiliar para formatear una cadena de fecha ISO a "MM/DD/YYYY, hh:mm:ss a. m."

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const ampm = hours >= 12 ? "p.\u00a0m." : "a.\u00a0m.";
  hours = hours % 12;
  if (hours === 0) hours = 12;
  const hourStr = String(hours).padStart(2, "0");
  return `${month}/${day}/${year}, ${hourStr}:${minutes}:${seconds} ${ampm}`;
};

export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  // FLAG DE MONTAJE: Siempre se llaman los hooks, pero se usará mounted para condicionar el renderizado dinámico.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Leer fechas del estado global
  const { startDate: reduxStartDate, endDate: reduxEndDate } = useSelector(
    (state: RootState) => state.calendar
  );

  const [showCalendar, setShowCalendar] = useState(false);
  const toggleContainer = (): void => {
    setShowCalendar((prev) => !prev);
  };

  const goBack = (): void => {
    if (pathname !== "/") {
      router.back();
    }
  };

  // Usar la fecha actual por defecto si los valores del estado son null
  const defaultISO: string = new Date().toISOString();
  const start: string = reduxStartDate
    ? formatDate(reduxStartDate)
    : formatDate(defaultISO);
  const end: string = reduxEndDate
    ? formatDate(reduxEndDate)
    : formatDate(defaultISO);

  return (
    <header className={styles.header}>
      {/* Aquí se renderiza el contenido dinámico solo si está montado */}
      {mounted && (
        <>
          <nav className={styles.navBar}>
            <button onClick={goBack} className={styles.returnButton}>
              <ArrowBackIcon />
            </button>

            <button
              onClick={toggleContainer}
              id="date"
              type="button"
              data-state="closed"
              className={styles.dateButton}
            >
              <CalendarTodayIcon className={styles.calendarIcon} />
              <div className={styles.dateContainer}>
                <span className={styles.startDate}>{start}</span>
                <span className={styles.endDate}>{end}</span>
              </div>
            </button>
          </nav>
          {showCalendar && <Calendar toggleContainer={toggleContainer} />}
        </>
      )}
    </header>
  );
};

export default Header;
