import { useState } from "react";

import styles from "./fuelFilterContent.module.css";
import { FuelFilterCustomSearch } from "../fuelFilterCustomSearch/fuelFilterCustomSearch";
import { LanguageInterface } from "@/modules/global/language/constants/language.model";
import { FuelFilterSearchButton } from "../fuelFilterSearchButton/fuelFilterSearchButton";

interface Props {
  LANGUAGE: LanguageInterface;
}

const options = [
  "Chrome",
  "Firefox",
  "Safari",
  "Edge",
  "Chrome",
  "Firefox",
  "Safari",
  "Edge",
  "Chrome",
  "Firefox",
  "Safari",
  "Edge",
];

export const FuelFilterContent = ({ LANGUAGE }: Props) => {
  const [account, setAccount] = useState("");
  const [group, setGroup] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");

  return (
    <div className={styles.fuelFilterContent}>
      <div className={styles.selectors}>
        <FuelFilterCustomSearch
          LANGUAGE={LANGUAGE}
          options={options}
          setValue={setAccount}
          title={LANGUAGE.fuel.filter.account}
          valueSelected={account}
        />
        <FuelFilterCustomSearch
          LANGUAGE={LANGUAGE}
          options={options}
          setValue={setGroup}
          title={LANGUAGE.fuel.filter.group}
          valueSelected={group}
        />
        <FuelFilterCustomSearch
          LANGUAGE={LANGUAGE}
          options={options}
          setValue={setBrand}
          title={LANGUAGE.fuel.filter.brand}
          valueSelected={brand}
        />
        <FuelFilterCustomSearch
          LANGUAGE={LANGUAGE}
          options={options}
          setValue={setModel}
          title={LANGUAGE.fuel.filter.model}
          valueSelected={model}
        />
      </div>
      <FuelFilterSearchButton LANGUAGE={LANGUAGE} />
    </div>
  );
};
