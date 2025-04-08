import React from "react";
import { useDispatch } from "react-redux";
import { setDateRange } from "@/slices/calendarSlice";
import styles from "./Calendar.module.css";
import { toLocalISOString, calculatePredefinedDateRange } from "./utils";

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
    // If the filter is already active, clear it.
    if (selectedOption === option) {
      setSelectedOption("");
      return;
    }

    setSelectedOption(option);
    const { startDate, endDate } = calculatePredefinedDateRange(option, today);

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
