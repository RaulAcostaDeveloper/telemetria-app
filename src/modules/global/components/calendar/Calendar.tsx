"use client";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import DatePicker from "./DatePicker";
import FixedDateSection from "./FixedDateSection";
import styles from "./Calendar.module.css";
import {
  formatDateTime,
  handleHourKeyDown,
  handleMinuteSecondKeyDown,
  isPast90Days,
  toLocalISOString,
} from "@/modules/global/utils/utils";
import { ButtonTypes } from "../generalButton/generalButton.model";
import { GeneralButton } from "../generalButton/generalButton";
import { RootState } from "@/globalConfig/redux/store";
import {
  setDateRange,
  setFixedFilter,
} from "@/globalConfig/redux/slices/calendarSlice";
import { LanguageInterface } from "../../language/constants/language.model";

interface CalendarProps {
  // Función para mostrar u ocultar el calendario.
  toggleContainer: () => void;
  LANGUAGE: LanguageInterface;
}

const Calendar: React.FC<CalendarProps> = ({ toggleContainer, LANGUAGE }) => {
  const startHourRef = useRef<HTMLInputElement>(null);
  const startMinuteRef = useRef<HTMLInputElement>(null);
  const startSecondRef = useRef<HTMLInputElement>(null);
  const endHourRef = useRef<HTMLInputElement>(null);
  const endMinuteRef = useRef<HTMLInputElement>(null);
  const endSecondRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();
  const today = new Date();
  const calendarRef = useRef<HTMLDivElement>(null);

  // Para saber si el componente ya está cargado
  const [mounted, setMounted] = useState(false);

  // Estados para manejar fechas y la visibilidad de los calendarios
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showStartDateCalendar, setShowStartDateCalendar] = useState(false);
  const [showEndDateCalendar, setShowEndDateCalendar] = useState(false);
  const [highlightDate, setHighlightDate] = useState<Date | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  // Estados para la hora, minutos y segundos (formato 12 horas)
  const [startHour, setStartHour] = useState("12");
  const [startMinute, setStartMinute] = useState("00");
  const [startSecond, setStartSecond] = useState("00");
  const [startMeridiem, setStartMeridiem] = useState("AM");

  const [endHour, setEndHour] = useState("12");
  const [endMinute, setEndMinute] = useState("00");
  const [endSecond, setEndSecond] = useState("00");
  const [endMeridiem, setEndMeridiem] = useState("PM");

  // Estado para mensajes de error del DatePicker
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Obtenemos el estado global del calendario desde Redux
  const calendarState = useSelector((state: RootState) => state.calendar);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sincroniza la hora de inicio con la fecha global de Redux
  useEffect(() => {
    //Checar si se puede convertir en una función y mover a utils
    if (calendarState.startDate) {
      const globalStart = new Date(calendarState.startDate);
      const hour = (globalStart.getHours() % 12 || 12)
        .toString()
        .padStart(2, "0");
      const minute = globalStart.getMinutes().toString().padStart(2, "0");
      const second = globalStart.getSeconds().toString().padStart(2, "0");
      setStartHour(hour);
      setStartMinute(minute);
      setStartSecond(second);
      setStartMeridiem(globalStart.getHours() >= 12 ? "PM" : "AM");
    }
  }, [calendarState.startDate]);

  // Sincroniza la hora de fin con la fecha global de Redux
  useEffect(() => {
    //Checar si se puede convertir en una función y mover a utils
    if (calendarState.endDate) {
      const globalEnd = new Date(calendarState.endDate);
      const hour = (globalEnd.getHours() % 12 || 12)
        .toString()
        .padStart(2, "0");
      const minute = globalEnd.getMinutes().toString().padStart(2, "0");
      const second = globalEnd.getSeconds().toString().padStart(2, "0");
      setEndHour(hour);
      setEndMinute(minute);
      setEndSecond(second);
      setEndMeridiem(globalEnd.getHours() >= 12 ? "PM" : "AM");
    }
  }, [calendarState.endDate]);

  // Si se abre el calendario de inicio y no hay fecha global, se usa la hora de hoy
  useEffect(() => {
    if (showStartDateCalendar && !calendarState.startDate) {
      const hour = (today.getHours() % 12 || 12).toString().padStart(2, "0");
      const minute = today.getMinutes().toString().padStart(2, "0");
      const second = today.getSeconds().toString().padStart(2, "0");
      setStartHour(hour);
      setStartMinute(minute);
      setStartSecond(second);
      setStartMeridiem(today.getHours() >= 12 ? "PM" : "AM");
    }
  }, [showStartDateCalendar, calendarState.startDate, today]);

  // Si se abre el calendario de fin y no hay fecha global, se usa la hora de hoy
  useEffect(() => {
    if (showEndDateCalendar && !calendarState.endDate) {
      const hour = (today.getHours() % 12 || 12).toString().padStart(2, "0");
      const minute = today.getMinutes().toString().padStart(2, "0");
      const second = today.getSeconds().toString().padStart(2, "0");
      setEndHour(hour);
      setEndMinute(minute);
      setEndSecond(second);
      setEndMeridiem(today.getHours() >= 12 ? "PM" : "AM");
    }
  }, [showEndDateCalendar, calendarState.endDate, today]);

  // Detecta clics fuera del calendario (excepto en el botón con id "date") para cerrarlo.
  useEffect(() => {
    //Checar si se puede convertir en una función y mover a utils
    if (typeof window !== "undefined") {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          calendarRef.current &&
          !calendarRef.current.contains(event.target as Node) &&
          !(event.target as HTMLElement).closest("#date")
        ) {
          toggleContainer();
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [toggleContainer]);

  // Función para usar isPast90Days con la fecha de hoy
  const checkPast90Days = (date: Date) => isPast90Days(date, today);

  // Alterna el calendario de inicio y limpia el error
  const toggleStartDateCalendar = () => {
    const willOpen = !showStartDateCalendar;
    setShowStartDateCalendar(willOpen);
    setShowEndDateCalendar(false);
    setErrorMessage("");

    if (willOpen) {
      const initialDate: Date = startDate
        ? startDate
        : calendarState.startDate
        ? new Date(calendarState.startDate)
        : today;

      setHighlightDate(initialDate);
      setCurrentDate(initialDate);
    }
  };
  // Alterna el calendario de fin y limpia el error
  const toggleEndDateCalendar = () => {
    const willOpen = !showEndDateCalendar;
    setShowEndDateCalendar(willOpen);
    setShowStartDateCalendar(false);
    setErrorMessage("");

    if (willOpen) {
      const initialDate: Date = endDate
        ? endDate
        : calendarState.endDate
        ? new Date(calendarState.endDate)
        : today;

      setHighlightDate(initialDate);
      setCurrentDate(initialDate);
    }
  };
  // Al seleccionar una fecha, la actualiza y borra errores
  const handleDateChange = (
    date: Date | null,
    setter: React.Dispatch<React.SetStateAction<Date | null>>
  ) => {
    setHighlightDate(date);
    setter(date);
    setShowStartDateCalendar(false);
    setShowEndDateCalendar(false);
    setErrorMessage("");
  };

  // Cambia el mes que se muestra en el DatePicker
  const changeMonth = (amount: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + amount);
    setCurrentDate(newDate);
  };

  // Pone la fecha de hoy en el DatePicker, resalta hoy y limpia el error
  const handleGoToToday = () => {
    setCurrentDate(today);
    setHighlightDate(today);
    if (showStartDateCalendar) {
      setStartDate(today);
      setStartHour("12");
      setStartMinute("00");
      setStartSecond("00");
      setStartMeridiem("AM");
      setTimeout(() => setShowStartDateCalendar(false), 250);
    } else if (showEndDateCalendar) {
      setEndDate(today);
      setEndHour("12");
      setEndMinute("00");
      setEndSecond("00");
      setEndMeridiem("PM");
      setTimeout(() => setShowEndDateCalendar(false), 250);
    }
    setErrorMessage("");
  };

  /**
   * Guarda el rango de fechas.
   * Si no hay fechas locales, usa las del estado global.
   * Si faltan fechas, muestra un error en el DatePicker.
   * Después, guarda el rango en Redux en formato ISO y limpia el filtro.
   */
  const saveDate = (): boolean => {
    let start = startDate;
    let end = endDate;

    if (!start) {
      if (calendarState.startDate) {
        start = new Date(calendarState.startDate);
      }
    }

    if (!end) {
      if (calendarState.endDate) {
        end = new Date(calendarState.endDate);
      }
    }

    if (!start || !end) {
      setErrorMessage(LANGUAGE.header.calendar.errorMessage3);
      return false;
    }

    const adjustedStart = new Date(start);
    let hourStart = parseInt(startHour, 10);
    if (startMeridiem === "PM" && hourStart < 12) {
      hourStart += 12;
    } else if (startMeridiem === "AM" && hourStart === 12) {
      hourStart = 0;
    }
    adjustedStart.setHours(
      hourStart,
      parseInt(startMinute, 10),
      parseInt(startSecond, 10)
    );

    const adjustedEnd = new Date(end);
    let hourEnd = parseInt(endHour, 10);
    if (endMeridiem === "PM" && hourEnd < 12) {
      hourEnd += 12;
    } else if (endMeridiem === "AM" && hourEnd === 12) {
      hourEnd = 0;
    }
    adjustedEnd.setHours(
      hourEnd,
      parseInt(endMinute, 10),
      parseInt(endSecond, 10)
    );

    // Valida que la fecha de inicio no sea posterior a la de fin
    if (adjustedStart > adjustedEnd) {
      setErrorMessage(LANGUAGE.header.calendar.errorMessage1);
      console.log("rango de fechas invalida");
      return false; // ← Se retorna false al fallar la validación
    }

    const finalStart = adjustedStart;
    const finalEnd = adjustedEnd;

    const isoStart = toLocalISOString(finalStart);
    const isoEnd = toLocalISOString(finalEnd);

    if (adjustedEnd.getTime() > today.getTime()) {
      setErrorMessage(LANGUAGE.header.calendar.errorMessage2);
      return false;
    }

    dispatch(setDateRange({ startDate: isoStart, endDate: isoEnd }));
    dispatch(setFixedFilter(""));

    setErrorMessage("");
    return true;
  };

  if (!mounted) {
    return null;
  }

  const fmt = new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  function formatEither(d: Date | string | null) {
    if (!d) return "";
    return fmt.format(d instanceof Date ? d : new Date(d));
  }
  // Placeholder: si el calendario está abierto, se usa currentDate, sino se usa la fecha global guardada (si existe) o currentDate.
  const startDatePlaceholder = showStartDateCalendar
    ? formatEither(currentDate)
    : calendarState.startDate
    ? formatEither(calendarState.startDate)
    : formatEither(currentDate);

  const endDatePlaceholder = showEndDateCalendar
    ? formatEither(currentDate)
    : calendarState.endDate
    ? formatEither(calendarState.endDate)
    : formatEither(currentDate);

  const startHourPlaceholder = (
    new Date(calendarState.startDate || currentDate).getHours() % 12 || 12
  )
    .toString()
    .padStart(2, "0");
  const startMinutePlaceholder = new Date(
    calendarState.startDate || currentDate
  )
    .getMinutes()
    .toString()
    .padStart(2, "0");
  const startSecondPlaceholder = new Date(
    calendarState.startDate || currentDate
  )
    .getSeconds()
    .toString()
    .padStart(2, "0");
  const endHourPlaceholder = (
    new Date(calendarState.endDate || currentDate).getHours() % 12 || 12
  )
    .toString()
    .padStart(2, "0");
  const endMinutePlaceholder = new Date(calendarState.endDate || currentDate)
    .getMinutes()
    .toString()
    .padStart(2, "0");
  const endSecondPlaceholder = new Date(calendarState.endDate || currentDate)
    .getSeconds()
    .toString()
    .padStart(2, "0");

  return (
    <div className={styles.calendarContainer} ref={calendarRef}>
      <FixedDateSection
        LANGUAGE={LANGUAGE}
        selectedOption={calendarState.fixedFilter}
        setSelectedOption={(option: string) => dispatch(setFixedFilter(option))}
      />
      <div className={styles.personalizedDate}>
        <p className={styles.reportPeriod}>
          {LANGUAGE.header.calendar.reportingPeriod}
        </p>
        <div className={styles.isCustomCalendarContainer}>
          <label className={styles.containerLabel}>
            {LANGUAGE.header.calendar.fromLabel}
          </label>
          <input
            type="text"
            value={startDate ? fmt.format(startDate) : ""}
            onClick={toggleStartDateCalendar}
            readOnly
            className={styles.containerInput}
            placeholder={startDatePlaceholder || "dd/mm/aaaa"}
          />
          <div className={styles.timeInputGroup}>
            <input
              id="start-hours"
              ref={startHourRef}
              type="text"
              inputMode="numeric"
              maxLength={2}
              className={styles.timeInputField}
              value={startHour}
              placeholder={startHourPlaceholder}
              onFocus={(e) => (e.currentTarget as HTMLInputElement).select()}
              onChange={(e) => {
                const v = e.target.value.replace(/\D/g, "").slice(0, 2);
                setStartHour(v);
                if (v.length === 2) startMinuteRef.current?.focus();
              }}
            />

            <input
              id="start-minutes"
              ref={startMinuteRef}
              type="text"
              inputMode="numeric"
              maxLength={2}
              className={styles.timeInputField}
              value={startMinute}
              placeholder={startMinutePlaceholder}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const v = e.target.value.replace(/\D/g, "").slice(0, 2);
                setStartMinute(v);
                if (v.length === 2) {
                  startSecondRef.current?.focus();
                }
              }}
              onFocus={(e) => (e.currentTarget as HTMLInputElement).select()}
            />
            <input
              id="start-seconds"
              ref={startSecondRef}
              type="text"
              inputMode="numeric"
              maxLength={2}
              className={styles.timeInputField}
              value={startSecond}
              placeholder={startSecondPlaceholder}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const v = e.target.value.replace(/\D/g, "").slice(0, 2);
                setStartSecond(v);
              }}
              onFocus={(e) => (e.currentTarget as HTMLInputElement).select()}
            />

            <div className={styles.amPmWrapper}>
              <select
                className={styles.amPmSelect}
                value={startMeridiem}
                onChange={(e) => setStartMeridiem(e.target.value)}
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>
          {showStartDateCalendar && (
            <DatePicker
              currentDate={currentDate}
              highlightDate={highlightDate}
              changeMonth={changeMonth}
              daysOfWeek={LANGUAGE.header.calendar.daysOfWeek}
              handleDateChange={(date) => handleDateChange(date, setStartDate)}
              isPast90Days={checkPast90Days}
              today={today}
              handleGoToToday={handleGoToToday}
              buttonClassName={styles.calendarDayButtonFrom}
              errorMessage={errorMessage}
              LANGUAGE={LANGUAGE}
            />
          )}
        </div>
        <div className={styles.isCustomCalendarContainer}>
          <label className={styles.containerLabel}>
            {LANGUAGE.header.calendar.toLabel}
          </label>
          <input
            type="text"
            value={endDate ? fmt.format(endDate) : ""}
            onClick={toggleEndDateCalendar}
            readOnly
            className={styles.containerInput}
            placeholder={endDatePlaceholder || "dd/mm/aaaa"}
          />
          <div className={styles.timeInputGroup}>
            <input
              id="end-hours"
              ref={endHourRef}
              type="text"
              inputMode="numeric"
              maxLength={2}
              className={styles.timeInputField}
              value={endHour}
              placeholder={endHourPlaceholder}
              onFocus={(e) => (e.currentTarget as HTMLInputElement).select()}
              onChange={(e) => {
                const v = e.target.value.replace(/\D/g, "").slice(0, 2);
                setEndHour(v);
                if (v.length === 2) endMinuteRef.current?.focus();
              }}
            />

            <input
              id="end-minutes"
              ref={endMinuteRef}
              type="text"
              inputMode="numeric"
              maxLength={2}
              className={styles.timeInputField}
              value={endMinute}
              placeholder={endMinutePlaceholder}
              onFocus={(e) => (e.currentTarget as HTMLInputElement).select()}
              onChange={(e) => {
                const v = e.target.value.replace(/\D/g, "").slice(0, 2);
                setEndMinute(v);
                if (v.length === 2) endSecondRef.current?.focus();
              }}
            />

            <input
              id="end-seconds"
              ref={endSecondRef}
              type="text"
              inputMode="numeric"
              maxLength={2}
              className={styles.timeInputField}
              value={endSecond}
              placeholder={endSecondPlaceholder}
              onFocus={(e) => (e.currentTarget as HTMLInputElement).select()}
              onChange={(e) => {
                const v = e.target.value.replace(/\D/g, "").slice(0, 2);
                setEndSecond(v);
              }}
            />

            <div className={styles.amPmWrapper}>
              <select
                className={styles.amPmSelect}
                value={endMeridiem}
                onChange={(e) => setEndMeridiem(e.target.value)}
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>
          {showEndDateCalendar && (
            <DatePicker
              currentDate={currentDate}
              highlightDate={highlightDate}
              changeMonth={changeMonth}
              daysOfWeek={LANGUAGE.header.calendar.daysOfWeek}
              handleDateChange={(date) => handleDateChange(date, setEndDate)}
              isPast90Days={checkPast90Days}
              today={today}
              handleGoToToday={handleGoToToday}
              buttonClassName={styles.calendarDayButtonTill}
              errorMessage={errorMessage}
              LANGUAGE={LANGUAGE}
            />
          )}
        </div>
        {errorMessage && (
          <div className={styles.errorMessage}>
            <p>
              {errorMessage}
              {LANGUAGE.header.calendar.errorMessage}
            </p>
          </div>
        )}
        <div className={styles.selectPeriodButtonsContainer}>
          <GeneralButton
            callback={() => {
              if (saveDate()) {
                toggleContainer(); // sólo cierra cuando saveDate() devuelve true, haciendo que se muestre el mensaje de error.
              }
            }}
            title={LANGUAGE.header.calendar.acceptButtonLabel}
            type={ButtonTypes.CONFIRM}
          />
          <GeneralButton
            callback={toggleContainer}
            title={LANGUAGE.header.calendar.cancelButtonLabel}
            type={ButtonTypes.DANGER}
          />
        </div>
      </div>
    </div>
  );
};

export default Calendar;
