import React from "react";
import { useDispatch } from "react-redux";
import { LanguageSelector } from "@/modules/global/language/utils/languageSelector";
import {
  calculatePredefinedDateRange,
  toLocalISOString,
} from "@/modules/global/utils/utils";
import { setDateRange } from "@/slices/calendarSlice";
import styles from "./Calendar.module.css";

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

  const LANGUAGE = LanguageSelector();

  const options = LANGUAGE.fixedDateFilterOptions;

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
  const handlePredefinedDate = (option: string) => {
    if (selectedOption === option) {
      // Si el filtro ya está activo, límpialo.
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
