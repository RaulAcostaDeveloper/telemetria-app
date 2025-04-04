"use client";
import React from "react";
import styles from "./Calendar.module.css";

const FixedDateSection: React.FC = () => {
  return (
    <div className={styles.fixedDatesContainer}>
      <div className={styles.selectPeriodContainer}>
        <ul className={styles.fixedDateOptions}>
          <li>Últimos 7 días</li>
          <li>Últimos 15 días</li>
          <li>Últimos 30 días</li>
          <li>Últimos 90 días</li>
          <li>Este mes</li>
          <li>El mes pasado</li>
        </ul>
      </div>
    </div>
  );
};

export default FixedDateSection;
