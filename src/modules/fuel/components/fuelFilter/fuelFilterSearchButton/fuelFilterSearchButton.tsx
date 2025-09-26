import SearchIcon from "@mui/icons-material/Search";

import styles from "./fuelFilterSearchButton.module.css";
import { ButtonTypes, GeneralButton } from "@/global/components";
import { LanguageInterface } from "@/global/language/constants/language.model";

interface Props {
  LANGUAGE: LanguageInterface;
  account: string | null;
  callFetchFuelSummary: () => void;
}

export const FuelFilterSearchButton = ({
  LANGUAGE,
  account,
  callFetchFuelSummary,
}: Props) => {
  return (
    <div className={styles.container}>
      <GeneralButton
        Icon={<SearchIcon />}
        callback={() => callFetchFuelSummary()}
        disabled={account ? account.length < 1 : true}
        title={LANGUAGE.fuel.filter.search}
        type={ButtonTypes.CONFIRM}
      />
    </div>
  );
};
