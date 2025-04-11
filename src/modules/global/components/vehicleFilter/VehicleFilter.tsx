"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  LocalGasStation as LocalGasStationIcon,
  ManageAccounts as ManageAccountsIcon,
  Speed as SpeedIcon,
} from "@mui/icons-material";
import { LanguageSelector } from "@/modules/global/language/utils/languageSelector";
import styles from "./VehicleFilter.module.css";

type Vehicle = {
  name: string;
  plates: string;
};

const vehicles: Vehicle[] = [
  { name: "Apollo", plates: "JK-958473" },
  { name: "Zeus", plates: "FR-434349" },
  { name: "Zeus", plates: "FR-434349" },
  { name: "Titan", plates: "GD-082721" },
];

type Action = {
  label: string;
  routePrefix: string;
};

const actions: Action[] = [
  { label: "management", routePrefix: "management" },
  { label: "telemetry", routePrefix: "telemetry" },
  { label: "fuel", routePrefix: "fuel" },
];

const iconMapping: { [key: string]: JSX.Element } = {
  management: <ManageAccountsIcon />,
  telemetry: <SpeedIcon />,
  fuel: <LocalGasStationIcon />,
};

const VehicleFilter = () => {
  const [query, setQuery] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setQuery(value);
    setShowDropdown(value.trim() !== "");
  };

  const filteredVehicles = vehicles.filter((vehicle) =>
    vehicle.name.toLowerCase().includes(query.toLowerCase())
  );
  const LANGUAGE = LanguageSelector();

  return (
    <div className={styles.container}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder={LANGUAGE.VehicleFilter.inputPlaceholder}
        className={styles.input}
      />
      {showDropdown && query && filteredVehicles.length > 0 && (
        <ul className={styles.dropdown}>
          {filteredVehicles.map((vehicle, index) => (
            <li key={index} className={styles.dropdownItem}>
              <div className={styles.vehicleDetails}>
                <strong>{vehicle.name}</strong> - <span>{vehicle.plates}</span>
              </div>
              <div className={styles.buttonsContainer}>
                {actions.map((action, idx) => (
                  <Link
                    key={idx}
                    href={`/${action.routePrefix}/vehicle/${vehicle.name}`}
                    onClick={() => setShowDropdown(false)}
                  >
                    <button className={styles.iconButton}>
                      {iconMapping[action.label]}
                    </button>
                  </Link>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default VehicleFilter;
