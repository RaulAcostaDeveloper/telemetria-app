import { useEffect, useState } from "react";

import styles from "./fuelFilterContent.module.css";
import {
  localStorageGetItem,
  localStorageSetItem,
} from "@/modules/global/localStorage/utils/storageService";
import { FuelFilterCustomSearch } from "../fuelFilterCustomSearch/fuelFilterCustomSearch";
import { FuelFilterSearchButton } from "../fuelFilterSearchButton/fuelFilterSearchButton";
import { LanguageInterface } from "@/modules/global/language/constants/language.model";
import { STORAGE_KEYS } from "@/modules/global/localStorage/constants/storageKeys";
import { accountsDataMock } from "@/modules/global/dataMock/accounts/accounts";
import { groupsDataMock } from "@/modules/global/dataMock/groups/groups";
import { vehidlesDataMock } from "@/modules/global/dataMock/vehicles/vehicles";

interface Props {
  LANGUAGE: LanguageInterface;
  callFetchFuelSummary: () => void;
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

export const FuelFilterContent = ({
  LANGUAGE,
  callFetchFuelSummary,
}: Props) => {
  const [account, setAccount] = useState<string | null>(null);
  const [group, setGroup] = useState<string | null>(null);
  const [brand, setBrand] = useState<string | null>(null);
  const [model, setModel] = useState<string | null>(null);

  useEffect(() => {
    // Primer render
    const accountStoredValue: string | null = localStorageGetItem(
      STORAGE_KEYS.FUEL_FILTER_ACCOUNT
    );
    setAccount(
      accountStoredValue !== null && accountStoredValue.length > 0
        ? accountStoredValue
        : accountOptions[0]
    );

    const groupStoredValue: string | null = localStorageGetItem(
      STORAGE_KEYS.FUEL_FILTER_GROUP
    );
    setGroup(groupStoredValue !== null ? groupStoredValue : "");

    const brandStoredValue: string | null = localStorageGetItem(
      STORAGE_KEYS.FUEL_FILTER_BRAND
    );
    setBrand(brandStoredValue !== null ? brandStoredValue : "");

    const modelStoredValue: string | null = localStorageGetItem(
      STORAGE_KEYS.FUEL_FILTER_MODEL
    );
    setModel(modelStoredValue !== null ? modelStoredValue : "");
  }, []);

  useEffect(() => {
    // Actualiza LocalStorage
    const mappings: [string, unknown][] = [
      [STORAGE_KEYS.FUEL_FILTER_ACCOUNT, account],
      [STORAGE_KEYS.FUEL_FILTER_GROUP, group],
      [STORAGE_KEYS.FUEL_FILTER_BRAND, brand],
      [STORAGE_KEYS.FUEL_FILTER_MODEL, model],
    ];

    mappings.forEach(([key, value]) => {
      if (value !== null) {
        localStorageSetItem(key, value);
      }
    });
  }, [account, group, brand, model]);

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
      <FuelFilterSearchButton
        LANGUAGE={LANGUAGE}
        account={account}
        callFetchFuelSummary={callFetchFuelSummary}
      />
    </div>
  );
};
