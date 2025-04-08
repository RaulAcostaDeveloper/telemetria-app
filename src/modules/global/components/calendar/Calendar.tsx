"use client";
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setDateRange, setFixedFilter } from "@/slices/calendarSlice";
import FixedDateSection from "./FixedDateSection";
import DatePicker from "./DatePicker";
import styles from "./Calendar.module.css";

// Import the utility functions
import {
  toLocalISOString,
  handleHourKeyDown,
  handleMinuteSecondKeyDown,
  formatDate,
  isPast90Days,
} from "./utils";

interface CalendarProps {
  toggleContainer: () => void;
}

const Calendar: React.FC<CalendarProps> = ({ toggleContainer }) => {
  const dispatch = useDispatch();
  const today = new Date();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Local state declarations
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showStartDateCalendar, setShowStartDateCalendar] = useState(false);
  const [showEndDateCalendar, setShowEndDateCalendar] = useState(false);
  const [highlightDate, setHighlightDate] = useState<Date | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [startHour, setStartHour] = useState("12");
  const [startMinute, setStartMinute] = useState("00");
  const [startSecond, setStartSecond] = useState("00");
  const [startMeridiem, setStartMeridiem] = useState("AM");

  const [endHour, setEndHour] = useState("12");
  const [endMinute, setEndMinute] = useState("00");
  const [endSecond, setEndSecond] = useState("00");
  const [endMeridiem, setEndMeridiem] = useState("PM");

  const calendarState = useSelector((state: RootState) => state.calendar);
  const fixedFilter = calendarState.fixedFilter;

  // Setup state for start and end times from calendar state
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

  // Create a local wrapper for isPast90Days using today's value.
  const checkPast90Days = (date: Date) => isPast90Days(date, today);

  // UI-specific functions remain in the component
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

      const finalStart =
        adjustedStart <= adjustedEnd ? adjustedStart : adjustedEnd;
      const finalEnd =
        adjustedStart > adjustedEnd ? adjustedStart : adjustedEnd;

      const isoStart = toLocalISOString(finalStart);
      const isoEnd = toLocalISOString(finalEnd);
      // Save the new date range...
      dispatch(setDateRange({ startDate: isoStart, endDate: isoEnd }));
      // Clear any fixed date filter when saving custom dates
      dispatch(setFixedFilter(""));
    } else {
      console.log("Por favor, selecciona ambas fechas: inicio y fin.");
    }
  };

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

  if (!mounted) {
    return null;
  }

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
