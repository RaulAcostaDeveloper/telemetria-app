"use client";
import React from "react";
import { ButtonTypes } from "../generalButton/generalButton.model";
import { GeneralButton } from "../generalButton/generalButton";
import styles from "./Calendar.module.css";
import { LanguageInterface } from "../../language/constants/language.model";

interface DatePickerProps {
  currentDate: Date;
  highlightDate: Date | null;
  changeMonth: (amount: number) => void;
  daysOfWeek: string[];
  handleDateChange: (date: Date) => void;
  isPast90Days: (date: Date) => boolean;
  today: Date;
  handleGoToToday: () => void;
  buttonClassName: string;
  errorMessage?: string;
  LANGUAGE: LanguageInterface;
}

const DatePicker: React.FC<DatePickerProps> = ({
  currentDate,
  highlightDate,
  changeMonth,
  daysOfWeek,
  handleDateChange,
  isPast90Days,
  today,
  handleGoToToday,
  buttonClassName,
  errorMessage,
  LANGUAGE,
}) => {
  // Año y mes de la vista actual
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Día de la semana del primer día del mes (0=domingo…6=sábado)
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  // ¿Estamos en el mes de "hoy"?
  const isCurrentMonth =
    year === today.getFullYear() && month === today.getMonth();

  /**
   * Formatea una fecha en "Mes | Año" usando un array de nombres de meses
   *
   * @param date - La fecha que se quiere formatear
   * @param monthNames - Array de 12 strings con los nombres de mes localizados
   * @returns Cadena con formato "Mes | Año", p.ej. "Mayo | 2025"
   *
   */
  const formatMonthYear = (date: Date, monthNames: string[]): string => {
    const monthIndex = date.getMonth();
    const month = monthNames[monthIndex];
    const year = date.getFullYear();
    return `${month} | ${year}`;
  };

  return (
    <div className={styles.dateContainer}>
      <div className={styles.dateSubContainer}>
        {/* Cabecera: flechas y mes/año */}
        <div className={styles.dateDayMonthYear}>
          <button
            onClick={() => changeMonth(-1)}
            className={styles.monthArrowButton}
          >
            ‹
          </button>
          <span className={styles.dateSpan}>
            {formatMonthYear(currentDate, LANGUAGE.header.calendar.monthNames)}
          </span>
          <button
            onClick={() => changeMonth(1)}
            className={
              isCurrentMonth
                ? `${styles.monthArrowButton}  ${styles.currentMonth}`
                : styles.monthArrowButton
            }
            disabled={isCurrentMonth}
          >
            ›
          </button>
        </div>

        {/* Días de la semana */}
        <div className={styles.daysOfTheWeekContainer}>
          {daysOfWeek.map((day, idx) => (
            <div key={idx} className={styles.daysOfTheWeekSubContainer}>
              {day}
            </div>
          ))}
        </div>

        {/* Botones de días */}
        <div className={styles.calendarDayButtonContainer}>
          {Array.from({ length: 42 }, (_, i) => {
            // 1) Construye fecha usando el offset del primer día
            const date = new Date(year, month, i - firstDayOfMonth + 1);

            // 2) Oculta días futuros
            if (date > today) return null;

            // 3) Detecta fuera de mes
            const isOutsideMonth = date.getMonth() !== month;

            // 4) Deshabilita o grishea
            const isDisabled = isPast90Days(date) || isOutsideMonth;

            // 5) Seleccionado solo dentro de mes actual
            const isSelected =
              !isOutsideMonth &&
              highlightDate != null &&
              date.toDateString() === highlightDate.toDateString();

            return (
              <button
                key={i}
                onClick={() => !isOutsideMonth && handleDateChange(date)}
                disabled={isDisabled}
                title={LANGUAGE.header.calendar.daysOfWeekTitle}
                className={[
                  buttonClassName,
                  isSelected && styles.calendarDayButtonSelected,
                  isOutsideMonth && styles.calendarDayButtonOutside,
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>

        {/* Error */}
        {errorMessage && (
          <div className={styles.errorMessage}>{errorMessage}</div>
        )}

        {/* Botón Hoy */}
        <div className={styles.todayButtonContainer}>
          <GeneralButton
            callback={handleGoToToday}
            title={LANGUAGE.header.calendar.datePicker.buttons.today}
            type={ButtonTypes.CONFIRM}
          />
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
