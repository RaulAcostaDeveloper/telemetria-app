"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

import {
  LocalGasStation as LocalGasStationIcon,
  ManageAccounts as ManageAccountsIcon,
} from "@mui/icons-material";

import styles from "./headerVehicleFilter.module.css";
// Tipado
import { LanguageInterface } from "@/modules/global/language/constants/language.model";
import { RootState } from "@/globalConfig/redux/store";
import { Vehicles } from "@/globalConfig/redux/slices/vehiclesSlice";

type Action = { label: string; routePrefix: string; title: string };
const iconMapping: { [key: string]: JSX.Element } = {
  management: <ManageAccountsIcon />,
  telemetry: (
    <Image src={"/png/car-gps.png"} width={22} height={22} alt="car services" />
  ),
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

  /** Filtra todos los resultados que coincidan por "plate" */
  const filteredByPlate = vehiclesData?.value.vehicles?.filter((vehicle) =>
    vehicle.plate.toLowerCase().includes(query.toLowerCase())
  );
  /** Filtra todos los resultados que coincidan por el primer "imeIs" en el array.
   *   Ejemplo imei con proposito de saber que teclear en input: 868689060250000 */
  const filteredByImei = vehiclesData?.value.vehicles?.filter((vehicle) =>
    vehicle.imeIs.toLowerCase().includes(query.toLowerCase())
  );

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    setShowDropdown(val.trim() !== "");
  };

  function answerScenarios() {
    const hasPlate = !!(filteredByPlate && filteredByPlate.length > 0);
    const hasIMEI = !!(filteredByImei && filteredByImei.length > 0);

    /** Se hace una busqueda, y existe informacion de IMEI o de placas */
    if (showDropdown && query && (hasIMEI || hasPlate)) {
      let filteredByPivot: Vehicles[] = [];

      if (hasIMEI) {
        filteredByPivot = filteredByImei as Vehicles[];
      } else if (hasPlate) {
        filteredByPivot = filteredByPlate as Vehicles[];
      }

      return (
        <ul className={styles.dropdown}>
          {filteredByPivot.map((vehicle, index) => (
            <li key={index} className={styles.dropdownItem}>
              <div className={styles.vehicleDetails}>
                <strong>{vehicle.plate}</strong> - <span>{vehicle.brand}</span>
              </div>
              <div className={styles.buttonsContainer}>
                {(
                  [
                    {
                      label: "fuel",
                      routePrefix: "fuel",
                      title: LANGUAGE.header.vehicleFilter.actionFuelTitle,
                    },
                    {
                      label: "telemetry",
                      routePrefix: "telemetry",
                      title: LANGUAGE.header.vehicleFilter.actionTelemetryTitle,
                    },
                  ] as Action[]
                ).map((action, idx) => (
                  <>
                    {vehicle.imeIs.length > 10 && (
                      <Link
                        key={idx}
                        href={`/${action.routePrefix}/vehicle/${vehicle.imeIs}`}
                        onClick={() => setShowDropdown(false)}
                        className={styles.linkIcon}
                      >
                        <button
                          className={styles.iconButton}
                          title={action.title}
                        >
                          {iconMapping[action.label]}
                        </button>
                      </Link>
                    )}
                  </>
                ))}
              </div>
            </li>
          ))}
        </ul>
      );
    } else if (showDropdown && query && !hasIMEI && !hasPlate) {
      /** Cuando la consulta a vehículo no coincide con la lista de IMEIs ni de placas. */
      return (
        <ul className={styles.dropdown}>
          <li key={0} className={styles.dropdownItem}>
            <div className={styles.vehicleDetails}>
              <strong>{LANGUAGE.header.vehicleFilter.inputNoMatch}</strong>
            </div>
          </li>
        </ul>
      );
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
