"use client";
import { useState } from "react";

import styles from "./fuelFilter.module.css";
import { FuelFilterContent } from "./fuelFilterContent/fuelFilterContent";
import { FuelFilterHeader } from "./fuelFilterHeader/fuelFilterHeader";
import { LanguageInterface } from "@/modules/global/language/constants/language.model";

interface Props {
  LANGUAGE: LanguageInterface;
  callFetchFuelSummary: () => void;
}

export const FuelFilter = ({ LANGUAGE, callFetchFuelSummary }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className={styles.fuelFilter}>
      <FuelFilterHeader
        LANGUAGE={LANGUAGE}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      {isOpen && (
        <FuelFilterContent
          LANGUAGE={LANGUAGE}
          callFetchFuelSummary={callFetchFuelSummary}
        />
      )}
    </div>
  );
};
