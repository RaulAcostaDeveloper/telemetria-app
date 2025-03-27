"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setDateRangeSelected } from "@/slices/calendarSlice";
import styles from "./Calendar.module.css";

interface CalendarProps {
  toggleContainer: () => void;
}

const Calendar: React.FC<CalendarProps> = ({ toggleContainer }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showStartDateCalendar, setShowStartDateCalendar] = useState(false);
  const [showEndDateCalendar, setShowEndDateCalendar] = useState(false);
  const [highlightDate, setHighlightDate] = useState<Date | null>(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const dispatch = useDispatch();

  const today = new Date();
  const past90Days = new Date(today);
  past90Days.setDate(today.getDate() - 90);

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
      setTimeout(() => {
        setShowStartDateCalendar(false);
      }, 250);
    } else if (showEndDateCalendar) {
      setEndDate(today);
      setTimeout(() => {
        setShowEndDateCalendar(false);
      }, 250);
    }
  };

  const isPast90Days = (date: Date) => date < past90Days;

  const isSelectedDate = (date: Date) => {
    return (
      highlightDate && date.toDateString() === highlightDate.toDateString()
    );
  };

  const isToday = (date: Date) => {
    return date.toDateString() === today.toDateString();
  };

  const daysOfWeek = ["Do", "Lu", "Ma", "Mi", "Jue", "Vie", "Sa"];

  const formatDate = (date: Date) =>
    `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

  const [isCustomPeriod, setIsCustomPeriod] = useState(true);

  const handleToggle = () => {
    setIsCustomPeriod(!isCustomPeriod);
    console.log(`custom period set to: ${isCustomPeriod}`);
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const saveDate = () => {
    if (startDate && endDate) {
      const start = startDate <= endDate ? startDate : endDate;
      const end = startDate > endDate ? startDate : endDate;
      const formattedRange = `From ${start.toLocaleDateString()} to ${end.toLocaleDateString()}`;
      console.log("Selected range:", formattedRange);
      //here it is where the date is store
      dispatch(setDateRangeSelected(formattedRange));
    } else {
      console.log("Please select both start and end dates.");
    }
  };

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.subContainer}>
        <button
          onClick={handleToggle}
          className={`${styles.toggleButton} ${
            isCustomPeriod ? styles.active : ""
          }`}
        >
          <div
            className={`${styles.toggleCircle} ${
              isCustomPeriod ? styles.shifted : ""
            }`}
          />
        </button>

        <label className={styles.label}>Periodo personalizado</label>
      </div>

      <p className={styles.reportPeriod}>Periodo de reportes</p>

      {isCustomPeriod ? (
        <>
          <div className={styles.isCustomCalendarContainer}>
            <label className={styles.containerLabel}>Desde:</label>
            <input
              type="text"
              value={startDate ? startDate.toLocaleDateString() : ""} //check why value isnt changing
              onClick={toggleStartDateCalendar}
              readOnly
              className={styles.containerInput}
              placeholder="dd/mm/aaaa"
            />
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
                          onClick={() => handleDateChange(date, setEndDate)}
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
        </>
      ) : (
        <div className={styles.selectPeriodContainer}>
          <label>Periodo:</label>
          <select value={selectedOption} onChange={handleOptionChange}>
            <option value="">Seleccionar un periodo</option>
            <option value="last7Days">Últimos 7 días</option>
            <option value="last14Days">Últimos 14 días</option>
            <option value="last30Days">Últimos 30 días</option>
            <option value="last90Days">Últimos 90 días</option>
          </select>
        </div>
      )}

      <div className={styles.selectPeriodButtonsContainer}>
        <button
          onClick={() => {
            saveDate();
            toggleContainer();
          }}
          data-testid="save-button"
          className={styles.selectPeriodSaveButton}
        >
          Guardar
        </button>
        <button
          onClick={toggleContainer}
          className={styles.selectPeriodCancelButton}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default Calendar;
