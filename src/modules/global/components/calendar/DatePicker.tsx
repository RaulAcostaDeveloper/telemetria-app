"use client";
import React from "react";
import { LanguageSelector } from "@/modules/global/language/utils/languageSelector";
import { formatMonthYear } from "@/modules/global/utils/utils";
import { ButtonTypes } from "../generalButton/generalButton.model";
import { GeneralButton } from "../generalButton/generalButton";
import styles from "./Calendar.module.css";

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
  formatDate: (date: Date) => string; // Ya no se usa para el título principal
  errorMessage?: string;
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
  // formatDate ya no se utiliza para el span de mes/año
  errorMessage,
}) => {
  const LANGUAGE = LanguageSelector();

  const isCurrentMonth =
    currentDate.getFullYear() === today.getFullYear() &&
    currentDate.getMonth() === today.getMonth();

  return (
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
            {formatMonthYear(currentDate, LANGUAGE.header.calendar.monthNames)}
          </span>
          <button
            onClick={() => changeMonth(1)}
            className={styles.nextMonth}
            disabled={isCurrentMonth}
          >
            ›
          </button>
        </div>

        <div className={styles.daysOfTheWeekContainer}>
          {daysOfWeek.map((day, index) => (
            <div key={index} className={styles.daysOfTheWeekSubContainer}>
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
            if (date > today) return null;

            // Comprobamos que highlightDate no sea null antes de usarlo
            const isSelected =
              highlightDate != null &&
              date.toDateString() === highlightDate.toDateString();

            return (
              <button
                key={i}
                onClick={() => handleDateChange(date)}
                disabled={isPast90Days(date)}
                title={LANGUAGE.header.calendar.daysOfWeekTitle}
                className={
                  isSelected
                    ? `${buttonClassName} ${styles.calendarDayButtonSelected}`
                    : buttonClassName
                }
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>

        {errorMessage && (
          <div className={styles.errorMessage}>{errorMessage}</div>
        )}

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
