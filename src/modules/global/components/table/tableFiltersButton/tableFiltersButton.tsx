import FilterAltIcon from "@mui/icons-material/FilterAlt";

import styles from "./tableFiltersButton.module.css";
import { ButtonTypes } from "../../generalButton/generalButton.model";
import { GeneralButton } from "../../generalButton/generalButton";
import { LanguageInterface } from "@/modules/global/language/constants/language.model";

interface Props {
  LANGUAGE: LanguageInterface;
}

export const TableFiltersButton = ({ LANGUAGE }: Props) => {
  return (
    <div>
      <GeneralButton
        type={ButtonTypes.CONFIRM}
        callback={() => {}}
        buttonStyle={styles.button}
        placeholder={LANGUAGE.table.buttons.filtersButton}
        Icon={<FilterAltIcon />}
      />
      {/* Agregar "no hay filtros disponibles para esta tabla" */}
    </div>
  );
};
