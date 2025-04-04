"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setDateRange } from "@/slices/calendarSlice";
import FixedDateSection from "./FixedDateSection";
import styles from "./Calendar.module.css";

// Helper: formatea un objeto Date a una cadena ISO 8601 usando la hora local y el desplazamiento
const toLocalISOString = (date: Date): string => {
  const tzOffset = -date.getTimezoneOffset();
  const diffSign = tzOffset >= 0 ? "+" : "-";
  const pad = (n: number) => n.toString().padStart(2, "0");
  return (
    date.getFullYear() +
    "-" +
    pad(date.getMonth() + 1) +
    "-" +
    pad(date.getDate()) +
    "T" +
    pad(date.getHours()) +
    ":" +
    pad(date.getMinutes()) +
    ":" +
    pad(date.getSeconds()) +
    diffSign +
    pad(Math.floor(Math.abs(tzOffset) / 60)) +
    ":" +
    pad(Math.abs(tzOffset) % 60)
  );
};

interface CalendarProps {
  toggleContainer: () => void;
}

const Calendar: React.FC<CalendarProps> = ({ toggleContainer }) => {
  /*** ESTADOS DEL COMPONENTE ***/
  // Estado para la fecha actual mostrada en el calendario
  const [currentDate, setCurrentDate] = useState(new Date());
  // Estados para mostrar u ocultar el calendario de fecha de inicio y fin
  const [showStartDateCalendar, setShowStartDateCalendar] = useState(false);
  const [showEndDateCalendar, setShowEndDateCalendar] = useState(false);
  // Estado para la fecha resaltada (seleccionada)
  const [highlightDate, setHighlightDate] = useState<Date | null>(null);
  // Estado para una opción seleccionada (si se utiliza un dropdown adicional)
  const [selectedOption, setSelectedOption] = useState("");
  // Estados para la fecha de inicio y fin seleccionadas
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  // Estados para el tiempo de la fecha de inicio
  const [startHour, setStartHour] = useState("12");
  const [startMinute, setStartMinute] = useState("00");
  const [startSecond, setStartSecond] = useState("00");
  const [startMeridiem, setStartMeridiem] = useState("AM");

  // Estados para el tiempo de la fecha de fin
  const [endHour, setEndHour] = useState("12");
  const [endMinute, setEndMinute] = useState("00");
  const [endSecond, setEndSecond] = useState("00");
  const [endMeridiem, setEndMeridiem] = useState("PM");

  const dispatch = useDispatch();

  // Fecha de hoy y cálculo de la fecha límite de hace 90 días
  const today = new Date();
  const past90Days = new Date(today);
  past90Days.setDate(today.getDate() - 90);

  /*** MANEJADORES DE TECLADO PARA INPUTS DE TIEMPO ***/
  // Permite incrementar o decrementar la hora de forma cíclica (1-12), mostrando siempre dos dígitos.
  const handleHourKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    currentValue: string,
    setter: (value: string) => void
  ) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      let value = parseInt(currentValue, 10);
      value = value === 12 ? 1 : value + 1;
      setter(value.toString().padStart(2, "0"));
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      let value = parseInt(currentValue, 10);
      value = value === 1 ? 12 : value - 1;
      setter(value.toString().padStart(2, "0"));
    }
  };

  // Permite incrementar o decrementar los minutos o segundos de forma cíclica (0-59) y los muestra con dos dígitos.
  const handleMinuteSecondKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    currentValue: string,
    setter: (value: string) => void
  ) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      let value = parseInt(currentValue, 10);
      value = value === 59 ? 0 : value + 1;
      setter(value.toString().padStart(2, "0"));
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      let value = parseInt(currentValue, 10);
      value = value === 0 ? 59 : value - 1;
      setter(value.toString().padStart(2, "0"));
    }
  };

  /*** MANEJADORES DE EVENTOS ***/
  // Alterna la visibilidad del calendario para la fecha de inicio
  const toggleStartDateCalendar = () => {
    setShowStartDateCalendar(!showStartDateCalendar);
    setShowEndDateCalendar(false);
  };

  // Alterna la visibilidad del calendario para la fecha de fin
  const toggleEndDateCalendar = () => {
    setShowEndDateCalendar(!showEndDateCalendar);
    setShowStartDateCalendar(false);
  };

  // Actualiza la fecha seleccionada y oculta ambos calendarios
  const handleDateChange = (
    date: Date | null,
    setter: React.Dispatch<React.SetStateAction<Date | null>>
  ) => {
    setHighlightDate(date);
    setter(date);
    setShowStartDateCalendar(false);
    setShowEndDateCalendar(false);
  };

  // Cambia el mes mostrado en el calendario
  const changeMonth = (amount: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + amount);
    setCurrentDate(newDate);
  };

  // Al hacer clic en "Today", se reinician la fecha y los inputs de tiempo.
  const handleGoToToday = () => {
    setCurrentDate(today);
    setHighlightDate(today);
    if (showStartDateCalendar) {
      setStartDate(today);
      // Reinicia el tiempo de inicio a "12:00:00 AM"
      setStartHour("12");
      setStartMinute("00");
      setStartSecond("00");
      setStartMeridiem("AM");
      setTimeout(() => setShowStartDateCalendar(false), 250);
    } else if (showEndDateCalendar) {
      setEndDate(today);
      // Reinicia el tiempo de fin a "12:00:00 PM"
      setEndHour("12");
      setEndMinute("00");
      setEndSecond("00");
      setEndMeridiem("PM");
      setTimeout(() => setShowEndDateCalendar(false), 250);
    }
  };

  // Actualiza la opción seleccionada en un dropdown adicional (si se utiliza)
  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  // Guarda el rango de fechas en formato ISO 8601 usando la hora local.
  // Convierte la hora ingresada (en formato 12h) a 24h según el valor del dropdown.
  const saveDate = () => {
    if (startDate && endDate) {
      // Ajuste de la fecha de inicio
      const adjustedStart = new Date(startDate);
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

      // Ajuste de la fecha de fin
      const adjustedEnd = new Date(endDate);
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

      // Se asegura de que finalStart es la fecha anterior
      const finalStart =
        adjustedStart <= adjustedEnd ? adjustedStart : adjustedEnd;
      const finalEnd =
        adjustedStart > adjustedEnd ? adjustedStart : adjustedEnd;

      console.log("startMinute:", startMinute, "startSecond:", startSecond);
      console.log("endMinute:", endMinute, "endSecond:", endSecond);

      // Convertir a cadena ISO local usando la función helper
      const isoStart = toLocalISOString(finalStart);
      const isoEnd = toLocalISOString(finalEnd);

      console.log("Fecha de inicio (local ISO):", isoStart);
      console.log("Fecha de fin (local ISO):", isoEnd);
      dispatch(setDateRange({ startDate: isoStart, endDate: isoEnd }));
    } else {
      console.log("Por favor, selecciona ambas fechas: inicio y fin.");
    }
  };

  /*** FUNCIONES UTILITARIAS ***/
  // Comprueba si una fecha es anterior a la fecha límite de hace 90 días
  const isPast90Days = (date: Date) => date < past90Days;

  // Comprueba si una fecha es la misma que la fecha resaltada
  const isSelectedDate = (date: Date) =>
    highlightDate && date.toDateString() === highlightDate.toDateString();

  // Comprueba si la fecha es hoy
  const isToday = (date: Date) => date.toDateString() === today.toDateString();

  // Formatea una fecha en el formato "dd/mm/yyyy"
  const formatDate = (date: Date) =>
    `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

  // Arreglo con los días de la semana para el encabezado del calendario
  const daysOfWeek = ["Do", "Lu", "Ma", "Mi", "Jue", "Vie", "Sa"];

  // Obtiene el estado del calendario del store (si es necesario)
  const date = useSelector((state: RootState) => state.calendar);

  /*** RENDERIZADO ***/
  return (
    <div className={styles.calendarContainer}>
      {/* Sección de fechas fijas */}
      <FixedDateSection />

      {/* Sección para el rango de fechas personalizado */}
      <div className={styles.personalizedDate}>
        <p className={styles.reportPeriod}>Periodo de reportes</p>

        {/* Sección para la fecha de inicio */}
        <div className={styles.isCustomCalendarContainer}>
          <label className={styles.containerLabel}>Desde:</label>
          <input
            type="text"
            value={startDate ? startDate.toLocaleDateString() : ""}
            onClick={toggleStartDateCalendar}
            readOnly
            className={styles.containerInput}
            placeholder="dd/mm/aaaa"
          />
          {/* Sección para ingresar el tiempo (horas, minutos, segundos, AM/PM) */}
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
              onChange={(e) => setStartHour(e.target.value.padStart(2, "0"))}
              onKeyDown={(e) => handleHourKeyDown(e, startHour, setStartHour)}
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
              onChange={(e) => setStartMinute(e.target.value.padStart(2, "0"))}
              onKeyDown={(e) =>
                handleMinuteSecondKeyDown(e, startMinute, setStartMinute)
              }
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
              onChange={(e) => setStartSecond(e.target.value.padStart(2, "0"))}
              onKeyDown={(e) =>
                handleMinuteSecondKeyDown(e, startSecond, setStartSecond)
              }
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
            <div className={styles.dateContainer}>
              <div className={styles.dateSubContainer}>
                <div className={styles.dateDayMonthYear}>
                  <button
                    onClick={() => changeMonth(-1)}
                    className={styles.previousMonth}
                  >
                    ‹
                  </button>
                  <span className={styles.dateSpan}>
                    {highlightDate
                      ? formatDate(highlightDate)
                      : formatDate(currentDate)}
                  </span>
                  <button
                    onClick={() => changeMonth(1)}
                    className={styles.nextMonth}
                  >
                    ›
                  </button>
                </div>
                <div className={styles.daysOfTheWeekContainer}>
                  {daysOfWeek.map((day, index) => (
                    <div
                      key={index}
                      className={styles.daysOfTheWeekSubContainer}
                    >
                      {day}
                    </div>
                  ))}
                </div>
                <div className={styles.calendarDayButtonContainer}>
                  {Array.from({ length: 42 }, (_, i) => {
                    const date = new Date(
                      currentDate.getFullYear(),
                      currentDate.getMonth(),
                      i - currentDate.getDay() + 1
                    );
                    return (
                      <button
                        key={i}
                        onClick={() => handleDateChange(date, setStartDate)}
                        disabled={isPast90Days(date)}
                        className={styles.calendarDayButtonFrom}
                      >
                        {date.getDate()}
                      </button>
                    );
                  })}
                </div>
                <div className={styles.todayButtonContainer}>
                  <button
                    onClick={handleGoToToday}
                    className={styles.todayButton}
                  >
                    Today
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sección para la fecha de fin */}
        <div className={styles.isCustomCalendarContainer}>
          <label className={styles.containerLabel}>Hasta:</label>
          <input
            type="text"
            value={endDate ? endDate.toLocaleDateString() : ""}
            onClick={toggleEndDateCalendar}
            readOnly
            className={styles.containerInput}
            placeholder="dd/mm/aaaa"
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
              onChange={(e) => setEndHour(e.target.value.padStart(2, "0"))}
              onKeyDown={(e) => handleHourKeyDown(e, endHour, setEndHour)}
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
              onChange={(e) => setEndMinute(e.target.value.padStart(2, "0"))}
              onKeyDown={(e) =>
                handleMinuteSecondKeyDown(e, endMinute, setEndMinute)
              }
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
              onChange={(e) => setEndSecond(e.target.value.padStart(2, "0"))}
              onKeyDown={(e) =>
                handleMinuteSecondKeyDown(e, endSecond, setEndSecond)
              }
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
            <div className={styles.dateContainer}>
              <div className={styles.dateSubContainer}>
                <div className={styles.dateDayMonthYear}>
                  <button
                    onClick={() => changeMonth(-1)}
                    className={styles.previousMonth}
                  >
                    ‹
                  </button>
                  <span className={styles.dateSpan}>
                    {highlightDate
                      ? formatDate(highlightDate)
                      : formatDate(currentDate)}
                  </span>
                  <button
                    onClick={() => changeMonth(1)}
                    className={styles.nextMonth}
                  >
                    ›
                  </button>
                </div>
                <div className={styles.daysOfTheWeekContainer}>
                  {daysOfWeek.map((day, index) => (
                    <div
                      key={index}
                      className={styles.daysOfTheWeekSubContainer}
                    >
                      {day}
                    </div>
                  ))}
                </div>
                <div className={styles.calendarDayButtonContainer}>
                  {Array.from({ length: 42 }, (_, i) => {
                    const date = new Date(
                      currentDate.getFullYear(),
                      currentDate.getMonth(),
                      i - currentDate.getDay() + 1
                    );
                    return (
                      <button
                        key={i}
                        onClick={() => handleDateChange(date, setEndDate)}
                        disabled={isPast90Days(date)}
                        className={styles.calendarDayButtonTill}
                      >
                        {date.getDate()}
                      </button>
                    );
                  })}
                </div>
                <div className={styles.todayButtonContainer}>
                  <button
                    onClick={handleGoToToday}
                    className={styles.todayButton}
                  >
                    Today
                  </button>
                </div>
              </div>
            </div>
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
