import React from "react";

export const toLocalISOString = (date: Date): string => {
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

export const calculatePredefinedDateRange = (
  option: string,
  today: Date
): { startDate: Date; endDate: Date } => {
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
  return { startDate, endDate };
};

export const handleHourKeyDown = (
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

export const handleMinuteSecondKeyDown = (
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

export const formatDate = (date: Date): string =>
  `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

export const isPast90Days = (date: Date, today: Date): boolean => {
  const past90Days = new Date(today);
  past90Days.setDate(today.getDate() - 90);
  return date < past90Days;
};
