import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import styles from "./fuelFilterHeader.module.css";
import { LanguageInterface } from "@/modules/global/language/constants/language.model";

interface Props {
  LANGUAGE: LanguageInterface;
  isOpen: boolean;
  setIsOpen: (toggle: boolean) => void;
}

export const FuelFilterHeader = ({ LANGUAGE, isOpen, setIsOpen }: Props) => {
  return (
    <button
      className={styles.fuelFilterHeader}
      onClick={() => setIsOpen(!isOpen)}
      title={
        isOpen
          ? LANGUAGE.fuel.filter.hideFilters
          : LANGUAGE.fuel.filter.showFilters
      }
    >
      <h2 className={styles.title}>{LANGUAGE.fuel.filter.header}</h2>
      <ArrowForwardIosIcon
        className={`${styles.icon} ${isOpen ? styles.iconOpen : ""}`}
      />
    </button>
  );
};
