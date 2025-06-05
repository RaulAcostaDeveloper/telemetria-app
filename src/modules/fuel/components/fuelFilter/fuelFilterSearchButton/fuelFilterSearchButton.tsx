import SearchIcon from "@mui/icons-material/Search";

import styles from "./fuelFilterSearchButton.module.css";
import { ButtonTypes, GeneralButton } from "@/modules/global/components";
import { LanguageInterface } from "@/modules/global/language/constants/language.model";

interface Props {
  LANGUAGE: LanguageInterface;
  account: string;
}

export const FuelFilterSearchButton = ({ LANGUAGE, account }: Props) => {
  return (
    <div className={styles.container}>
      <GeneralButton
        Icon={<SearchIcon />}
        callback={() => {}}
        title={LANGUAGE.fuel.filter.search}
        type={ButtonTypes.CONFIRM}
        disabled={account.length < 1}
      />
    </div>
  );
};
