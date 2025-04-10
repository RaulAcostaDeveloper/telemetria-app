"use client";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setDateRange, setFixedFilter } from "@/slices/calendarSlice";
import FixedDateSection from "./FixedDateSection";
import DatePicker from "./DatePicker";
import styles from "./Calendar.module.css";
import {
  toLocalISOString,
  handleHourKeyDown,
  handleMinuteSecondKeyDown,
  formatDate,
  isPast90Days,
} from "@/modules/global/utils/utils";

interface CalendarProps {
  // Función para mostrar u ocultar el calendario.
  toggleContainer: () => void;
}

const Calendar: React.FC<CalendarProps> = ({ toggleContainer }) => {
  const dispatch = useDispatch();
  const today = new Date();

  // Para saber si el componente ya está cargado
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

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

  // **************** VALIDAR INPUTS DE TIEMPO ****************
  /**
   * Valida y ajusta lo que el usuario ingresa en los inputs de tiempo.
   * Se queda solo con números, limita a 2 dígitos y fuerza que el valor esté en el rango.
   * Si el usuario escribe "00", se deja ese valor.
   *
   * @param e Evento del input.
   * @param setter Función para actualizar el estado.
   * @param min Valor mínimo (ej., 1 para horas o 0 para minutos/segundos).
   * @param max Valor máximo (ej., 12 para horas o 59 para minutos/segundos).
   */
  const handleTimeInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (value: string) => void,
    min: number,
    max: number
  ) => {
    let rawValue = e.target.value.replace(/\D/g, ""); // Quita cualquier carácter no numérico
    if (rawValue.length > 2) {
      rawValue = rawValue.slice(0, 2); // Limita a 2 dígitos
    }
    // Si se escribió exactamente "00", lo deja así.
    if (rawValue === "00") {
      setter("00");
      return;
    }
    let num = parseInt(rawValue, 10);
    if (isNaN(num)) {
      setter("00");
    } else {
      if (num < min) num = min;
      if (num > max) num = max;
      setter(num.toString().padStart(2, "0"));
    }
  };
  // **********************************************************

  // Sincroniza la hora de inicio con la fecha global de Redux
  useEffect(() => {
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

  // Función para usar isPast90Days con la fecha de hoy
  const checkPast90Days = (date: Date) => isPast90Days(date, today);

  // Alterna el calendario de inicio y limpia el error
  const toggleStartDateCalendar = () => {
    setShowStartDateCalendar(!showStartDateCalendar);
    setShowEndDateCalendar(false);
    setErrorMessage("");
  };

  // Alterna el calendario de fin y limpia el error
  const toggleEndDateCalendar = () => {
    setShowEndDateCalendar(!showEndDateCalendar);
    setShowStartDateCalendar(false);
    setErrorMessage("");
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
  const saveDate = () => {
    let start = startDate;
    let end = endDate;

    if (!start || !end) {
      if (calendarState.startDate && calendarState.endDate) {
        start = new Date(calendarState.startDate);
        end = new Date(calendarState.endDate);
      } else {
        setErrorMessage("Por favor, selecciona ambas fechas: inicio y fin.");
        return;
      }
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

    const finalStart =
      adjustedStart <= adjustedEnd ? adjustedStart : adjustedEnd;
    const finalEnd = adjustedStart > adjustedEnd ? adjustedStart : adjustedEnd;

    const isoStart = toLocalISOString(finalStart);
    const isoEnd = toLocalISOString(finalEnd);
    dispatch(setDateRange({ startDate: isoStart, endDate: isoEnd }));
    dispatch(setFixedFilter(""));
    setErrorMessage("");
  };

  // Detecta clics fuera del calendario (excepto en el botón con id "date") para cerrarlo.
  const calendarRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
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
  }, [toggleContainer]);

  if (!mounted) {
    return null;
  }

  // Placeholder: si el calendario está abierto, se usa currentDate, sino se usa la fecha global guardada (si existe) o currentDate.
  const startDatePlaceholder = showStartDateCalendar
    ? currentDate.toLocaleDateString()
    : calendarState.startDate
    ? new Date(calendarState.startDate).toLocaleDateString()
    : currentDate.toLocaleDateString();
  const endDatePlaceholder = showEndDateCalendar
    ? currentDate.toLocaleDateString()
    : calendarState.endDate
    ? new Date(calendarState.endDate).toLocaleDateString()
    : currentDate.toLocaleDateString();

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
        selectedOption={calendarState.fixedFilter}
        setSelectedOption={(option: string) => dispatch(setFixedFilter(option))}
      />
      <div className={styles.personalizedDate}>
        <p className={styles.reportPeriod}>Periodo de reportes</p>
        <div className={styles.isCustomCalendarContainer}>
          <label className={styles.containerLabel}>Desde:</label>
          <input
            type="text"
            value={startDate ? startDate.toLocaleDateString() : ""}
            onClick={toggleStartDateCalendar}
            readOnly
            className={styles.containerInput}
            placeholder={startDatePlaceholder || "dd/mm/aaaa"}
          />
          <div className={styles.timeInputGroup}>
            <input
              className={styles.timeInputField}
              id="start-hours"
              type="number"
              min="1"
              max="12"
              step="1"
              value={startHour}
              name="start-hours"
              onChange={(e) => handleTimeInputChange(e, setStartHour, 1, 12)}
              onKeyDown={(e) => handleHourKeyDown(e, startHour, setStartHour)}
              placeholder={startHourPlaceholder}
            />
            <input
              className={styles.timeInputField}
              id="start-minutes"
              type="number"
              min="0"
              max="59"
              step="1"
              value={startMinute}
              name="start-minutes"
              onChange={(e) => handleTimeInputChange(e, setStartMinute, 0, 59)}
              onKeyDown={(e) =>
                handleMinuteSecondKeyDown(e, startMinute, setStartMinute)
              }
              placeholder={startMinutePlaceholder}
            />
            <input
              className={styles.timeInputField}
              id="start-seconds"
              type="number"
              min="0"
              max="59"
              step="1"
              value={startSecond}
              name="start-seconds"
              onChange={(e) => handleTimeInputChange(e, setStartSecond, 0, 59)}
              onKeyDown={(e) =>
                handleMinuteSecondKeyDown(e, startSecond, setStartSecond)
              }
              placeholder={startSecondPlaceholder}
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
              daysOfWeek={["Do", "Lu", "Ma", "Mi", "Jue", "Vie", "Sa"]}
              handleDateChange={(date) => handleDateChange(date, setStartDate)}
              isPast90Days={checkPast90Days}
              today={today}
              handleGoToToday={handleGoToToday}
              buttonClassName={styles.calendarDayButtonFrom}
              formatDate={formatDate}
              errorMessage={errorMessage}
            />
          )}
        </div>
        <div className={styles.isCustomCalendarContainer}>
          <label className={styles.containerLabel}>Hasta:</label>
          <input
            type="text"
            value={endDate ? endDate.toLocaleDateString() : ""}
            onClick={toggleEndDateCalendar}
            readOnly
            className={styles.containerInput}
            placeholder={endDatePlaceholder || "dd/mm/aaaa"}
          />
          <div className={styles.timeInputGroup}>
            <input
              className={styles.timeInputField}
              id="end-hours"
              type="number"
              min="1"
              max="12"
              step="1"
              value={endHour}
              name="end-hours"
              onChange={(e) => handleTimeInputChange(e, setEndHour, 1, 12)}
              onKeyDown={(e) => handleHourKeyDown(e, endHour, setEndHour)}
              placeholder={endHourPlaceholder}
            />
            <input
              className={styles.timeInputField}
              id="end-minutes"
              type="number"
              min="0"
              max="59"
              step="1"
              value={endMinute}
              name="end-minutes"
              onChange={(e) => handleTimeInputChange(e, setEndMinute, 0, 59)}
              onKeyDown={(e) =>
                handleMinuteSecondKeyDown(e, endMinute, setEndMinute)
              }
              placeholder={endMinutePlaceholder}
            />
            <input
              className={styles.timeInputField}
              id="end-seconds"
              type="number"
              min="0"
              max="59"
              step="1"
              value={endSecond}
              name="end-seconds"
              onChange={(e) => handleTimeInputChange(e, setEndSecond, 0, 59)}
              onKeyDown={(e) =>
                handleMinuteSecondKeyDown(e, endSecond, setEndSecond)
              }
              placeholder={endSecondPlaceholder}
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
              daysOfWeek={["Do", "Lu", "Ma", "Mi", "Jue", "Vie", "Sa"]}
              handleDateChange={(date) => handleDateChange(date, setEndDate)}
              isPast90Days={checkPast90Days}
              today={today}
              handleGoToToday={handleGoToToday}
              buttonClassName={styles.calendarDayButtonTill}
              formatDate={formatDate}
              errorMessage={errorMessage}
            />
          )}
        </div>
        <div className={styles.selectPeriodButtonsContainer}>
          <button
            onClick={() => {
              saveDate();
              toggleContainer();
            }}
            data-testid="save-button"
            className={styles.selectPeriodSaveButton}
          >
            Aceptar
          </button>
          <button
            onClick={toggleContainer}
            className={styles.selectPeriodCancelButton}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
