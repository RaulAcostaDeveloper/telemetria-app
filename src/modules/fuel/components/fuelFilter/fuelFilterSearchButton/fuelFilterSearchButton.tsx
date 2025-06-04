import { ButtonTypes, GeneralButton } from "@/modules/global/components";
import { LanguageInterface } from "@/modules/global/language/constants/language.model";
import styles from "./fuelFilterSearchButton.module.css";

interface Props {
  LANGUAGE: LanguageInterface;
}

export const FuelFilterSearchButton = ({ LANGUAGE }: Props) => {
  return (
    <div className={styles.container}>
      <GeneralButton
        title={LANGUAGE.fuel.filter.search}
        callback={() => {}}
        type={ButtonTypes.CONFIRM}
      />
    </div>
  );
};
