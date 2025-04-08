"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { setDateRange } from "@/slices/calendarSlice";
import styles from "./Calendar.module.css";

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

interface FixedDateSectionProps {
  selectedOption: string;
  setSelectedOption: (option: string) => void;
}

const FixedDateSection: React.FC<FixedDateSectionProps> = ({
  selectedOption,
  setSelectedOption,
}) => {
  const dispatch = useDispatch();
  const today = new Date();

  const handlePredefinedDate = (option: string) => {
    setSelectedOption(option);
    let startDate: Date, endDate: Date;
    switch (option) {
      case "Últimos 7 días":
        startDate = new Date(today);
        startDate.setDate(today.getDate() - 7);
        endDate = today;
        break;
      case "Últimos 15 días":
        startDate = new Date(today);
        startDate.setDate(today.getDate() - 15);
        endDate = today;
        break;
      case "Últimos 30 días":
        startDate = new Date(today);
        startDate.setDate(today.getDate() - 30);
        endDate = today;
        break;
      case "Últimos 90 días":
        startDate = new Date(today);
        startDate.setDate(today.getDate() - 90);
        endDate = today;
        break;
      case "Este mes":
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        endDate = today;
        break;
      case "El mes pasado":
        const firstDayCurrentMonth = new Date(
          today.getFullYear(),
          today.getMonth(),
          1
        );
        endDate = new Date(firstDayCurrentMonth);
        endDate.setDate(0);
        startDate = new Date(endDate.getFullYear(), endDate.getMonth(), 1);
        break;
      default:
        startDate = today;
        endDate = today;
    }
    dispatch(
      setDateRange({
        startDate: toLocalISOString(startDate),
        endDate: toLocalISOString(endDate),
      })
    );
  };

  const options = [
    "Últimos 7 días",
    "Últimos 15 días",
    "Últimos 30 días",
    "Últimos 90 días",
    "Este mes",
    "El mes pasado",
  ];

  return (
    <div className={styles.fixedDatesContainer}>
      <div className={styles.selectPeriodContainer}>
        <ul className={styles.fixedDateOptions}>
          {options.map((option) => (
            <li
              key={option}
              className={selectedOption === option ? styles.selectedFilter : ""}
            >
              <button
                className={styles.invisibleButton}
                onClick={() => handlePredefinedDate(option)}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FixedDateSection;
