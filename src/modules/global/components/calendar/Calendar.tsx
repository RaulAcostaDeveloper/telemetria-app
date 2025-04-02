"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
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

  //Sirve solo para aplicar estilos dependiendo si el dia ha sido selecionado, para fines esteticos
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

  const date = useSelector(
    (state: RootState) => state.calendar.dateRangeSelected
  );

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.fixedDatesContainer}>
        {" "}
        <div className={styles.selectPeriodContainer}>
          <ul className={styles.fixedDateOptions}>
            <li>Últimos 7 días</li>
            <li>Últimos 15 días</li>
            <li>Últimos 30 días</li>
            <li>Últimos 90 días</li>
            <li>Este mes</li>
            <li>El mes pasado</li>
          </ul>
        </div>
      </div>
      <div className={styles.personalizedDate}>
        <p className={styles.reportPeriod}>Periodo de reportes</p>
        {isCustomPeriod ? (
          <>
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
              <div className={styles.timeInputGroup}>
                <input
                  className={styles.timeInputField}
                  id="12hours"
                  inputMode="decimal"
                  aria-label="Hours"
                  type="tel"
                  value="12"
                  name="12hours"
                />
                <input
                  className={styles.timeInputField}
                  id="minutes12"
                  inputMode="decimal"
                  aria-label="Minutes"
                  type="tel"
                  value="00"
                  name="minutes"
                />
                <input
                  className={styles.timeInputField}
                  id="seconds12"
                  inputMode="decimal"
                  aria-label="Seconds"
                  type="tel"
                  value="00"
                  name="seconds"
                />
                <div className={styles.amPmWrapper}>
                  <button
                    type="button"
                    role="combobox"
                    aria-controls="radix-:r18:"
                    aria-expanded="false"
                    aria-autocomplete="none"
                    dir="ltr"
                    data-state="closed"
                    data-slot="select-trigger"
                    className={styles.amPmButton}
                  >
                    <span className={styles.amPmText}>AM</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.28rem"
                      height="1.28rem"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={styles.amPmIcon}
                      aria-hidden="true"
                    >
                      <path d="m6 9 6 6 6-6"></path>
                    </svg>
                  </button>
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
                  id="12hours"
                  inputMode="decimal"
                  aria-label="Hours"
                  type="tel"
                  value="12"
                  name="12hours"
                />
                <input
                  className={styles.timeInputField}
                  id="minutes12"
                  inputMode="decimal"
                  aria-label="Minutes"
                  type="tel"
                  value="00"
                  name="minutes"
                />
                <input
                  className={styles.timeInputField}
                  id="seconds12"
                  inputMode="decimal"
                  aria-label="Seconds"
                  type="tel"
                  value="00"
                  name="seconds"
                />
                <div className={styles.amPmWrapper}>
                  <button
                    type="button"
                    role="combobox"
                    aria-controls="radix-:r18:"
                    aria-expanded="false"
                    aria-autocomplete="none"
                    dir="ltr"
                    data-state="closed"
                    data-slot="select-trigger"
                    className={styles.amPmButton}
                  >
                    <span className={styles.amPmText}>PM</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.28rem"
                      height="1.28rem"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={styles.amPmIcon}
                      aria-hidden="true"
                    >
                      <path d="m6 9 6 6 6-6"></path>
                    </svg>
                  </button>
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
