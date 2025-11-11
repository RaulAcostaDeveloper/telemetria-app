"use client";
import { useState } from "react";

import { ButtonTypes, GeneralButton, Modal } from "@/global/components";
import { LanguageInterface } from "@/global/language/constants/language.model";
import styles from "./zoneEditProfileModalForm.module.css";
import { PrimitiveValue } from "@/global/components/table/table.model";

interface Props {
  LANGUAGE: LanguageInterface;
  closeModal: () => void;
  idObject: PrimitiveValue;
}

export const ZoneEditProfileModalForm = ({
  LANGUAGE,
  closeModal,
  idObject,
}: Props) => {
  const [category, setCategory] = useState("");
  const categoryOptions = ["una opción"];
  const onConfirm = () => {
    console.log("id object", idObject);
  };
  return (
    <Modal
      LANGUAGE={LANGUAGE}
      closeModal={closeModal}
      title={LANGUAGE.table.actions.addProfileToZone}
    >
      <div className={styles.form}>
        <div className={styles.row}>
          <div className={`${styles.inputNormal} ${styles.left}`}>
            <label htmlFor="nameProfile">Nombre de la zona</label>
            <input type="text" name="nameProfile" id="nameProfile" />
          </div>
          <div className={styles.inputNormal}>
            <label htmlFor="nameProfile">Categoría de la zona</label>
            <Select
              value={category}
              set={setCategory}
              options={categoryOptions}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={`${styles.inputNormal} ${styles.left}`}>
            <label htmlFor="nameProfile">Nombre de la zona</label>
            <Select
              value={category}
              set={setCategory}
              options={categoryOptions}
            />
          </div>
          <div className={styles.inputNormal}>
            <label htmlFor="nameProfile">Categoría de la zona</label>
            <Select
              value={category}
              set={setCategory}
              options={categoryOptions}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={`${styles.inputNormal} ${styles.left}`}>
            <label htmlFor="nameProfile">Nombre de la zona</label>
            <Select
              value={category}
              set={setCategory}
              options={categoryOptions}
            />
          </div>
          <div className={styles.inputNormal}>
            <label htmlFor="color">Categoría de la zona</label>
            <input type="color" name="color" id="color" />
          </div>
        </div>

        <div className={styles.row}>
          <div className={`${styles.inputNormal} ${styles.left}`}>
            <label htmlFor="nameProfile">Nombre de la zona</label>
            <Select
              value={category}
              set={setCategory}
              options={categoryOptions}
            />
          </div>
        </div>

        <div className={styles.bottom}>
          <GeneralButton
            callback={closeModal}
            title={LANGUAGE.table.buttons.cancel}
            type={ButtonTypes.NEUTRAL}
          />
          <GeneralButton
            callback={onConfirm}
            title={LANGUAGE.table.buttons.saveEdit}
            type={ButtonTypes.CONFIRM}
          />
        </div>
      </div>
    </Modal>
  );
};

interface SelectProps {
  value: string;
  set: (value: string) => void;
  options: string[];
}

const Select = ({ value, set, options }: SelectProps) => {
  return (
    <select
      value={value}
      onChange={(e) => set(e.target.value)}
      className={`${styles.selectInput} ${
        value !== "" ? styles.withValue : ""
      }`}
    >
      <option value="">Seleccionar una opción</option>
      {options.map((opt, index) => (
        <option key={index} value={opt?.toString() ?? ""}>
          {opt}
        </option>
      ))}
    </select>
  );
};
