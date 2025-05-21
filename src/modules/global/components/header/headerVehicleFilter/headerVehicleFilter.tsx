"use client";
import React, { useState } from "react";
import Link from "next/link";

import {
  LocalGasStation as LocalGasStationIcon,
  ManageAccounts as ManageAccountsIcon,
  Speed as SpeedIcon,
} from "@mui/icons-material";

import styles from "./headerVehicleFilter.module.css";
import { LanguageInterface } from "@/modules/global/language/constants/language.model";

type Vehicle = {
  name: string;
  plates: string;
};

const vehicles: Vehicle[] = [
  { name: "Apollo", plates: "JK-958473" },
  { name: "Apollo", plates: "JK-958473" },
  { name: "Apollo", plates: "JK-958473" },
  { name: "Apollo", plates: "JK-958473" },
  { name: "Apollo", plates: "JK-958473" },
  { name: "Apollo", plates: "JK-958473" },
  { name: "Apollo", plates: "JK-958473" },
  { name: "Apollo", plates: "JK-958473" },
  { name: "Apollo", plates: "JK-958473" },
  { name: "Zeus", plates: "FR-434349" },
  { name: "Zeus", plates: "FR-434349" },
  { name: "Titan", plates: "GD-082721" },
];

type Action = {
  label: string;
  routePrefix: string;
  title: string;
};

const iconMapping: { [key: string]: JSX.Element } = {
  management: <ManageAccountsIcon />,
  telemetry: <SpeedIcon />,
  fuel: <LocalGasStationIcon />,
};

interface Props {
  LANGUAGE: LanguageInterface;
}

const HeaderVehicleFilter = ({ LANGUAGE }: Props) => {
  const [query, setQuery] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const actions: Action[] = [
    {
      label: "management",
      routePrefix: "management",
      title: `${LANGUAGE.header.vehicleFilter.actionManagementTitle}`,
    },
    {
      label: "telemetry",
      routePrefix: "telemetry",
      title: `${LANGUAGE.header.vehicleFilter.actionTelemetryTitle}`,
    },
    {
      label: "fuel",
      routePrefix: "fuel",
      title: `${LANGUAGE.header.vehicleFilter.actionFuelTitle}`,
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setQuery(value);
    setShowDropdown(value.trim() !== "");
  };

  const filteredVehicles = vehicles.filter((vehicle) =>
    vehicle.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder={LANGUAGE.header.vehicleFilter.inputPlaceholder}
        className={styles.input}
        title={LANGUAGE.header.vehicleFilter.inputPlaceholder}
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
                    className={styles.linkIcon}
                  >
                    <button className={styles.iconButton} title={action.title}>
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

export default HeaderVehicleFilter;
