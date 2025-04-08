"use client";
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setDateRange, setFixedFilter } from "@/slices/calendarSlice";
import FixedDateSection from "./FixedDateSection";
import DatePicker from "./DatePicker";
import styles from "./Calendar.module.css";

// Importa las funciones utilitarias previamente definidas.
import {
  toLocalISOString,
  handleHourKeyDown,
  handleMinuteSecondKeyDown,
  formatDate,
  isPast90Days,
} from "./utils";

interface CalendarProps {
  // Función que permite ocultar o mostrar el componente calendario.
  toggleContainer: () => void;
}

const Calendar: React.FC<CalendarProps> = ({ toggleContainer }) => {
  const dispatch = useDispatch();
  const today = new Date();

  // Estado local para determinar si el componente ya se montó.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Estados locales para controlar la fecha actual, fechas seleccionadas y visibilidad de los calendarios.
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showStartDateCalendar, setShowStartDateCalendar] = useState(false);
  const [showEndDateCalendar, setShowEndDateCalendar] = useState(false);
  const [highlightDate, setHighlightDate] = useState<Date | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  // Estados para el control de la hora, minutos y segundos en formato de 12 horas (AM/PM)
  const [startHour, setStartHour] = useState("12");
  const [startMinute, setStartMinute] = useState("00");
  const [startSecond, setStartSecond] = useState("00");
  const [startMeridiem, setStartMeridiem] = useState("AM");

  const [endHour, setEndHour] = useState("12");
  const [endMinute, setEndMinute] = useState("00");
  const [endSecond, setEndSecond] = useState("00");
  const [endMeridiem, setEndMeridiem] = useState("PM");

  // Obtiene el estado del calendario desde Redux.
  const calendarState = useSelector((state: RootState) => state.calendar);

  /**
   * Cuando se actualiza el estado global (Redux) con startDate, se extrae la hora y se actualizan
   * los estados locales correspondientes.
   */
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

  /**
   * Cuando se actualiza el estado global (Redux) con endDate, se extrae la hora y se actualizan
   * los estados locales correspondientes.
   */
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

  /**
   * Inicializa los estados de la hora de inicio con la hora actual si no se ha definido en el estado global
   * y si el calendario de inicio está abierto.
   */
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

  /**
   * Inicializa los estados de la hora de fin con la hora actual si no se ha definido en el estado global
   * y si el calendario de fin está abierto.
   */
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

  /**
   * Envoltura local para la función isPast90Days, utilizando la fecha actual (today).
   * Se utiliza para verificar si una fecha está fuera del rango de los últimos 90 días.
   *
   * Ejemplo de uso: checkPast90Days(date)
   */
  const checkPast90Days = (date: Date) => isPast90Days(date, today);

  /**
   * Alterna la visibilidad del calendario de la fecha de inicio.
   * Asegura que el calendario de fecha de fin quede oculto si está abierto.
   *
   * Ejemplo de uso: onClick={toggleStartDateCalendar}
   */
  const toggleStartDateCalendar = () => {
    setShowStartDateCalendar(!showStartDateCalendar);
    setShowEndDateCalendar(false);
  };

  /**
   * Alterna la visibilidad del calendario de la fecha de fin.
   * Asegura que el calendario de fecha de inicio quede oculto si está abierto.
   *
   * Ejemplo de uso: onClick={toggleEndDateCalendar}
   */
  const toggleEndDateCalendar = () => {
    setShowEndDateCalendar(!showEndDateCalendar);
    setShowStartDateCalendar(false);
  };

  /**
   * Maneja el cambio de fecha cuando el usuario selecciona una fecha desde el DatePicker.
   * Actualiza la fecha resaltada y oculta ambos calendarios.
   *
   * @param date - Fecha seleccionada o null.
   * @param setter - Función para actualizar el estado de la fecha (startDate o endDate).
   *
   * Ejemplo de uso: handleDateChange(date, setStartDate)
   */
  const handleDateChange = (
    date: Date | null,
    setter: React.Dispatch<React.SetStateAction<Date | null>>
  ) => {
    setHighlightDate(date);
    setter(date);
    setShowStartDateCalendar(false);
    setShowEndDateCalendar(false);
  };

  /**
   * Cambia el mes actual mostrado en el DatePicker.
   *
   * @param amount - Número de meses a desplazar (positivo para avanzar, negativo para retroceder).
   *
   * Ejemplo de uso: changeMonth(1) para avanzar un mes.
   */
  const changeMonth = (amount: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + amount);
    setCurrentDate(newDate);
  };

  /**
   * Establece el día de hoy como fecha actual y resalta el día actual.
   * También actualiza la fecha de inicio o fin (dependiendo de cuál calendario esté abierto)
   * y luego oculta el calendario correspondiente después de 250 ms.
   *
   * Ejemplo de uso: onClick={handleGoToToday}
   */
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

  /**
   * Guarda el rango de fechas seleccionado ajustando las horas según el formato AM/PM.
   * Se asegura que la fecha de inicio sea la menor o igual a la fecha de fin.
   * Luego, convierte las fechas a formato ISO local y las guarda en el estado global (Redux).
   * También limpia cualquier filtro predefinido seleccionado.
   *
   * Ejemplo de uso: onClick={saveDate}
   */
  const saveDate = () => {
    if (startDate && endDate) {
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

      // Define cuál es la fecha de inicio y cuál la de fin basado en el ajuste.
      const finalStart =
        adjustedStart <= adjustedEnd ? adjustedStart : adjustedEnd;
      const finalEnd =
        adjustedStart > adjustedEnd ? adjustedStart : adjustedEnd;

      const isoStart = toLocalISOString(finalStart);
      const isoEnd = toLocalISOString(finalEnd);
      // Guarda el rango de fechas en el estado global mediante Redux.
      dispatch(setDateRange({ startDate: isoStart, endDate: isoEnd }));
      // Limpia cualquier filtro predefinido al guardar fechas personalizadas.
      dispatch(setFixedFilter(""));
    } else {
      console.log("Por favor, selecciona ambas fechas: inicio y fin.");
    }
  };

  /**
   * Referencia al contenedor del calendario.
   * Se utiliza para detectar clics fuera del componente y, de esa forma, ocultarlo.
   */
  const calendarRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        toggleContainer();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleContainer]);

  // Si el componente aún no se ha montado, no se renderiza nada.
  if (!mounted) {
    return null;
  }

  // Se obtienen las fechas globales del estado para usarlas como placeholder en los inputs de fecha.
  const globalStartDate = calendarState.startDate
    ? new Date(calendarState.startDate)
    : today;
  const globalEndDate = calendarState.endDate
    ? new Date(calendarState.endDate)
    : today;
  const startDatePlaceholder = globalStartDate.toLocaleDateString();
  const endDatePlaceholder = globalEndDate.toLocaleDateString();
  const startHourPlaceholder = (globalStartDate.getHours() % 12 || 12)
    .toString()
    .padStart(2, "0");
  const startMinutePlaceholder = globalStartDate
    .getMinutes()
    .toString()
    .padStart(2, "0");
  const startSecondPlaceholder = globalStartDate
    .getSeconds()
    .toString()
    .padStart(2, "0");
  const endHourPlaceholder = (globalEndDate.getHours() % 12 || 12)
    .toString()
    .padStart(2, "0");
  const endMinutePlaceholder = globalEndDate
    .getMinutes()
    .toString()
    .padStart(2, "0");
  const endSecondPlaceholder = globalEndDate
    .getSeconds()
    .toString()
    .padStart(2, "0");

  return (
    <div className={styles.calendarContainer} ref={calendarRef}>
      {/* Componente para seleccionar filtros de fechas predefinidos */}
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
              onChange={(e) => setStartHour(e.target.value.padStart(2, "0"))}
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
              onChange={(e) => setStartMinute(e.target.value.padStart(2, "0"))}
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
              onChange={(e) => setStartSecond(e.target.value.padStart(2, "0"))}
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
              onChange={(e) => setEndHour(e.target.value.padStart(2, "0"))}
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
              onChange={(e) => setEndMinute(e.target.value.padStart(2, "0"))}
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
              onChange={(e) => setEndSecond(e.target.value.padStart(2, "0"))}
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
