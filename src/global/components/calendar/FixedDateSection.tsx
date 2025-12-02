import React from "react";
import { useDispatch } from "react-redux";
import {
  calculatePredefinedDateRange,
  toLocalISOString,
} from "@/global/utils/dateUtils";
import { setDateRange } from "@/global/redux/slices/calendarSlice";
import styles from "./Calendar.module.css";
import { LanguageInterface } from "../../language/constants/language.model";

interface FixedDateSectionProps {
  selectedOption: string;
  setSelectedOption: (option: string) => void;
  LANGUAGE: LanguageInterface;
}

const FixedDateSection: React.FC<FixedDateSectionProps> = ({
  selectedOption,
  setSelectedOption,
  LANGUAGE,
}) => {
  const dispatch = useDispatch();
  const today = new Date();
  const options = LANGUAGE.header.calendar.fixedDateFilterOptions;

  /**
   * Función para manejar la selección de una opción de rango predefinido.
   *
   * - Si la opción ya está activa, se limpia (des-selecciona).
   * - En caso contrario, se calcula el rango de fechas correspondiente con
   *   calculatePredefinedDateRange y se guarda el rango en el estado global (Redux)
   *   utilizando toLocalISOString para formatear las fechas.
   *
   * @param option - Opción predefinida seleccionada.
   */
  const handlePredefinedDate = (option: string, indexOption: number) => {
    if (selectedOption === option) {
      // Si el filtro ya está activo, límpialo.
      setSelectedOption("");
      return;
    }

    setSelectedOption(option);
    const { startDate, endDate } = calculatePredefinedDateRange(
      indexOption,
      today
    );
    dispatch(
      setDateRange({
        startDate: toLocalISOString(startDate),
        endDate: toLocalISOString(endDate),
      })
    );
  };

  return (
    <div className={styles.fixedDatesContainer}>
      <div className={styles.selectPeriodContainer}>
        <ul className={styles.fixedDateOptions}>
          {options.map((option, index) => (
            <li
              key={option}
              className={selectedOption === option ? styles.selectedFilter : ""}
            >
              <button
                className={styles.invisibleButton}
                onClick={() => handlePredefinedDate(option, index)}
                title={option}
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
