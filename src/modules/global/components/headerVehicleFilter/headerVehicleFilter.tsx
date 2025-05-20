"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LocalGasStation as LocalGasStationIcon,
  ManageAccounts as ManageAccountsIcon,
  Speed as SpeedIcon,
} from "@mui/icons-material";

import styles from "./headerVehicleFilter.module.css";
import { LanguageInterface } from "../../language/constants/language.model";

type Vehicle = { name: string; plates: string };
const vehicles: Vehicle[] = [
  ...Array(20).fill({ name: "Apollo", plates: "JK-958473" }),
  { name: "Zeus", plates: "FR-434349" },
  { name: "Titan", plates: "GD-082721" },
];

type Action = { label: string; routePrefix: string; title: string };
const iconMapping: { [key: string]: JSX.Element } = {
  management: <ManageAccountsIcon />,
  telemetry: <SpeedIcon />,
  fuel: <LocalGasStationIcon />,
};

interface Props {
  LANGUAGE: LanguageInterface;
}

const HeaderVehicleFilter: React.FC<Props> = ({ LANGUAGE }) => {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // click fuera → cerrar dropdown + limpiar input
  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  // al cambiar ruta → limpiar input + cerrar dropdown
  useEffect(() => {
    setQuery("");
    setShowDropdown(false);
  }, [pathname]);

  // filtrar todos los resultados que coincidan
  const filtered = vehicles.filter((v) =>
    v.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    setShowDropdown(val.trim() !== "");
  };

  return (
    <div ref={containerRef} className={styles.container}>
      <input
        className={styles.input}
        type="text"
        placeholder={LANGUAGE.header.vehicleFilter.inputPlaceholder}
        value={query}
        onChange={handleInput}
        title={LANGUAGE.header.vehicleFilter.inputPlaceholder}
      />

      {showDropdown && query && filtered.length > 0 && (
        <ul className={styles.dropdown}>
          {filtered.map((v, i) => (
            <li key={i} className={styles.dropdownItem}>
              <div className={styles.vehicleDetails}>
                <strong>{v.name}</strong> - <span>{v.plates}</span>
              </div>
              <div className={styles.buttonsContainer}>
                {(
                  [
                    {
                      label: "management",
                      routePrefix: "management",
                      title:
                        LANGUAGE.header.vehicleFilter.actionManagementTitle,
                    },
                    {
                      label: "telemetry",
                      routePrefix: "telemetry",
                      title: LANGUAGE.header.vehicleFilter.actionTelemetryTitle,
                    },
                    {
                      label: "fuel",
                      routePrefix: "fuel",
                      title: LANGUAGE.header.vehicleFilter.actionFuelTitle,
                    },
                  ] as Action[]
                ).map((action, idx) => (
                  <Link
                    key={idx}
                    href={`/${action.routePrefix}/vehicle/${v.name}`}
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
