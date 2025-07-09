"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

import {
  LocalGasStation as LocalGasStationIcon,
  ManageAccounts as ManageAccountsIcon,
  Speed as SpeedIcon,
} from "@mui/icons-material";

import styles from "./headerVehicleFilter.module.css";
import { LanguageInterface } from "@/modules/global/language/constants/language.model";
import { RootState } from "@/globalConfig/redux/store";

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
  const { vehiclesData } = useSelector((state: RootState) => state.vehicles);

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

    if (typeof window !== "undefined") {
      document.addEventListener("mousedown", onClickOutside);
      return () => document.removeEventListener("mousedown", onClickOutside);
    }
  }, []);

  // al cambiar ruta → limpiar input + cerrar dropdown
  useEffect(() => {
    setQuery("");
    setShowDropdown(false);
  }, [pathname]);

  // filtrar todos los resultados que coincidan por "carNumber"
  const filtered = vehiclesData?.value.vehicles?.filter((v) =>
    v.carNumber.toLowerCase().includes(query.toLowerCase())
  );
  // filtrar todos los resultados que coincidan por el primer "imeIs" en el array.
  // Ejemplo imei con proposito de saber que teclear en input: 868689060250000
  const filteredByImei = vehiclesData?.value.vehicles?.filter((v) =>
    v.imeIs[0].toLowerCase().includes(query.toLowerCase())
  )

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    setShowDropdown(val.trim() !== "");
  };

  function answerScenarios(){
    if(showDropdown && query && filteredByImei && filteredByImei.length > 0){
      // Cuando la consulta a vehículo SÍ tiene IMEIs
      return (
        <ul className={styles.dropdown}>
          {filteredByImei.map((v, i) => (
            <li key={i} className={styles.dropdownItem}>
              <div className={styles.vehicleDetails}>
                <strong>{v.carNumber}</strong> - <span>{v.carLabel}</span>
              </div>
              <div className={styles.buttonsContainer}>
                {(
                  [
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
                    href={`/${action.routePrefix}/vehicle/${v.imeIs[0]}`}
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
      )
    }else if(showDropdown && query && filteredByImei && 0 === filteredByImei.length){
      // Cuando la consulta a vehículo no coincide con la lista de IMEIs
      return(
        <ul className={styles.dropdown}>
          <li key={0} className={styles.dropdownItem}>
            <div className={styles.vehicleDetails}><strong>No hay coincidencias</strong></div>
          </li>
        </ul>
      )
    }
  }

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

      {answerScenarios()}
    </div>
  );
};

export default HeaderVehicleFilter;
