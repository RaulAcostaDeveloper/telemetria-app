"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setDateRange } from "@/slices/calendarSlice";
import FixedDateSection from "./FixedDateSection";
import DatePicker from "./DatePicker";
import styles from "./Calendar.module.css";

// Helper: formatea un objeto Date a una cadena ISO 8601 usando la hora local
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
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showStartDateCalendar, setShowStartDateCalendar] = useState(false);
  const [showEndDateCalendar, setShowEndDateCalendar] = useState(false);
  const [highlightDate, setHighlightDate] = useState<Date | null>(null);
  const [selectedOption, setSelectedOption] = useState("");
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

  const today = new Date();
  const past90Days = new Date(today);
  past90Days.setDate(today.getDate() - 90);

  /*** MANEJADORES DE TECLADO PARA INPUTS DE TIEMPO ***/
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
  const toggleStartDateCalendar = () => {
    setShowStartDateCalendar(!showStartDateCalendar);
    setShowEndDateCalendar(false);
  };

  const toggleEndDateCalendar = () => {
    setShowEndDateCalendar(!showEndDateCalendar);
    setShowStartDateCalendar(false);
  };

  const handleDateChange = (
    date: Date | null,
    setter: React.Dispatch<React.SetStateAction<Date | null>>
  ) => {
    setHighlightDate(date);
    setter(date);
    setShowStartDateCalendar(false);
    setShowEndDateCalendar(false);
  };

  const changeMonth = (amount: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + amount);
    setCurrentDate(newDate);
  };

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
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

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

      const finalStart =
        adjustedStart <= adjustedEnd ? adjustedStart : adjustedEnd;
      const finalEnd =
        adjustedStart > adjustedEnd ? adjustedStart : adjustedEnd;

      console.log("startMinute:", startMinute, "startSecond:", startSecond);
      console.log("endMinute:", endMinute, "endSecond:", endSecond);

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
  const isPast90Days = (date: Date) => date < past90Days;
  const isSelectedDate = (date: Date) =>
    highlightDate && date.toDateString() === highlightDate.toDateString();
  const isToday = (date: Date) => date.toDateString() === today.toDateString();
  const formatDate = (date: Date) =>
    `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  const daysOfWeek = ["Do", "Lu", "Ma", "Mi", "Jue", "Vie", "Sa"];

  // Lee el estado del calendario
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
            <DatePicker
              currentDate={currentDate}
              highlightDate={highlightDate}
              changeMonth={changeMonth}
              daysOfWeek={daysOfWeek}
              handleDateChange={(date) => handleDateChange(date, setStartDate)}
              isPast90Days={isPast90Days}
              today={today}
              handleGoToToday={handleGoToToday}
              buttonClassName={styles.calendarDayButtonFrom}
              formatDate={formatDate}
            />
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
            <DatePicker
              currentDate={currentDate}
              highlightDate={highlightDate}
              changeMonth={changeMonth}
              daysOfWeek={daysOfWeek}
              handleDateChange={(date) => handleDateChange(date, setEndDate)}
              isPast90Days={isPast90Days}
              today={today}
              handleGoToToday={handleGoToToday}
              buttonClassName={styles.calendarDayButtonTill}
              formatDate={formatDate}
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
