"use client";
import styles from "./fuelFilter.module.css";
import { FuelFilterContent } from "./fuelFilterContent/fuelFilterContent";
import { FuelFilterHeader } from "./fuelFilterHeader/fuelFilterHeader";
import { LanguageInterface } from "@/modules/global/language/constants/language.model";
import { useState } from "react";

interface Props {
  LANGUAGE: LanguageInterface;
}

export const FuelFilter = ({ LANGUAGE }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className={styles.fuelFilter}>
      <FuelFilterHeader
        LANGUAGE={LANGUAGE}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      {isOpen && <FuelFilterContent LANGUAGE={LANGUAGE} />}
    </div>
  );
};
