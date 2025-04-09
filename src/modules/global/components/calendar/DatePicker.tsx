"use client";
import React from "react";
import styles from "./Calendar.module.css";
import { LanguageSelector } from "@/modules/global/language/utils/languageSelector";

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
  formatDate: (date: Date) => string;
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
  formatDate,
}) => {
  const LANGUAGE = LanguageSelector();
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
            {highlightDate
              ? formatDate(highlightDate)
              : formatDate(currentDate)}
          </span>
          <button onClick={() => changeMonth(1)} className={styles.nextMonth}>
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
            return (
              <button
                key={i}
                onClick={() => handleDateChange(date)}
                disabled={isPast90Days(date)}
                className={buttonClassName}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
        <div className={styles.todayButtonContainer}>
          <button onClick={handleGoToToday} className={styles.todayButton}>
            {LANGUAGE.DatePicker.buttons.today}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
