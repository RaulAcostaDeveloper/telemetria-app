"use client";
import { useState, useRef, useEffect } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import styles from "./fuelFilterCustomSearch.module.css";
import { LanguageInterface } from "@/modules/global/language/constants/language.model";

interface Props {
  LANGUAGE: LanguageInterface;
  options: string[];
  setValue: (value: string) => void;
  title: string;
  valueSelected: string | null;
}

export const FuelFilterCustomSearch = ({
  LANGUAGE,
  options,
  setValue,
  title,
  valueSelected,
}: Props) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [filtered, setFiltered] = useState(options);
  const [showList, setShowList] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setShowList(false);
      }
    };
    if (typeof window !== "undefined") {
      document.addEventListener("click", handler);
      return () => document.removeEventListener("click", handler);
    }
  }, []);

  const handleInput = (value: string) => {
    setValue(value);
    setFiltered(
      options.filter((o) => o.toLowerCase().includes(value.toLowerCase()))
    );
    setShowList(true);
    setActiveIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showList) return;
    if (e.key === "ArrowDown") {
      setActiveIndex((i) => (i + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      setActiveIndex((i) => (i - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter") {
      if (activeIndex >= 0) {
        setValue(filtered[activeIndex]);
        setShowList(false);
      }
    }
  };

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <label htmlFor={"fuelFilterSelector" + title} className={styles.title}>
        {title}
      </label>
      <div className={styles.container}>
        <input
          type="text"
          id={"fuelFilterSelector" + title}
          placeholder={LANGUAGE.fuel.filter.selectAnOption}
          value={valueSelected ?? ""}
          onChange={(e) => handleInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowList(true)}
          className={styles.input}
          autoComplete="off"
        />
        <ArrowDropDownIcon className={styles.icon} />
        {showList && filtered.length > 0 && (
          <ul className={styles.list}>
            {filtered.map((option, i) => (
              <li
                key={option}
                className={`${styles.item} ${
                  i === activeIndex ? styles.active : ""
                }`}
                onClick={() => {
                  setValue(option);
                  setShowList(false);
                }}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
