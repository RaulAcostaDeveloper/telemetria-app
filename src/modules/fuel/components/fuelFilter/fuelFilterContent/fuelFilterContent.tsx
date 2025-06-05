import { useState } from "react";

import styles from "./fuelFilterContent.module.css";
import { FuelFilterCustomSearch } from "../fuelFilterCustomSearch/fuelFilterCustomSearch";
import { LanguageInterface } from "@/modules/global/language/constants/language.model";
import { FuelFilterSearchButton } from "../fuelFilterSearchButton/fuelFilterSearchButton";
import { accountsDataMock } from "@/modules/global/dataMock/accounts/accounts";
import { groupsDataMock } from "@/modules/global/dataMock/groups/groups";
import { vehidlesDataMock } from "@/modules/global/dataMock/vehicles/vehicles";

interface Props {
  LANGUAGE: LanguageInterface;
}

const accountOptions = accountsDataMock.value.accounts.map(
  (account) => account.accountName
);

const groupsOptions = groupsDataMock.value.groups.map((group) => group.name);

const vehiclesOptions = vehidlesDataMock.value.vehicles.map(
  (vehicle) => vehicle.carLabel
);

const brandOptions = vehidlesDataMock.value.vehicles.map(
  (vehicle) => vehicle.carShortcut
);

export const FuelFilterContent = ({ LANGUAGE }: Props) => {
  const [account, setAccount] = useState(accountOptions[0]);
  const [group, setGroup] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");

  return (
    <div className={styles.fuelFilterContent}>
      <div className={styles.selectors}>
        <FuelFilterCustomSearch
          LANGUAGE={LANGUAGE}
          options={accountOptions}
          setValue={setAccount}
          title={LANGUAGE.fuel.filter.account}
          valueSelected={account}
        />
        <FuelFilterCustomSearch
          LANGUAGE={LANGUAGE}
          options={groupsOptions}
          setValue={setGroup}
          title={LANGUAGE.fuel.filter.group}
          valueSelected={group}
        />
        <FuelFilterCustomSearch
          LANGUAGE={LANGUAGE}
          options={vehiclesOptions}
          setValue={setBrand}
          title={LANGUAGE.fuel.filter.brand}
          valueSelected={brand}
        />
        <FuelFilterCustomSearch
          LANGUAGE={LANGUAGE}
          options={brandOptions}
          setValue={setModel}
          title={LANGUAGE.fuel.filter.model}
          valueSelected={model}
        />
      </div>
      <FuelFilterSearchButton LANGUAGE={LANGUAGE} account={account} />
    </div>
  );
};
