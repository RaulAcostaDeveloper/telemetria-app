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
          <InputText
            name="nameProfile"
            title="Nombre del perfíl"
            value={category}
            set={setCategory}
            isLeft
          />
          <Select
            title="Categoría"
            name="category"
            value={category}
            set={setCategory}
            options={categoryOptions}
          />
        </div>

        <div className={styles.row}>
          <Select
            title="Cargas"
            name="loadedAuth"
            value={category}
            set={setCategory}
            options={categoryOptions}
            isLeft
          />
          <Select
            title="Descargas"
            name="unloadedAuth"
            value={category}
            set={setCategory}
            options={categoryOptions}
          />
        </div>
        <div className={styles.row}>
          <Select
            title="Ralentí"
            name="ralenti"
            value={category}
            set={setCategory}
            options={categoryOptions}
            isLeft
          />
          <InputText
            title="Color"
            name="color"
            value={category}
            set={setCategory}
            isColor
          />
        </div>

        <div className={styles.row}>
          <Select
            title="Proveedor"
            name="provider"
            value={category}
            set={setCategory}
            options={categoryOptions}
            isLeft
          />
        </div>

        <div className={styles.row}>
          <InputText
            title="Descripción"
            name="description"
            value={category}
            set={setCategory}
            isLarge
          />
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
  title: string;
  name: string;
  value: string;
  set: (value: string) => void;
  options: string[];
  isLeft?: boolean;
}

const Select = ({ title, name, value, set, options, isLeft }: SelectProps) => {
  return (
    <div className={`${styles.inputNormal} ${isLeft ? styles.left : ""}`}>
      <label htmlFor={name}>{title}</label>
      <select
        name={name}
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
    </div>
  );
};

interface InputProps {
  title: string;
  name: string;
  value: string;
  set: (value: string) => void;
  isColor?: boolean;
  isLarge?: boolean;
  isLeft?: boolean;
}

const InputText = ({
  title,
  name,
  value,
  set,
  isColor,
  isLarge,
  isLeft,
}: InputProps) => {
  return (
    <div
      className={`${styles.inputNormal} ${isLeft ? styles.left : ""} ${
        isLarge ? styles.inputLarge : ""
      }`}
    >
      <label htmlFor={name}>{title}</label>
      {isLarge ? (
        <textarea
          name={name}
          id={name}
          value={value}
          onChange={(e) => set(e.target.value)}
        />
      ) : (
        <input
          type={`${isColor ? "color" : "text"}`}
          name={name}
          id={name}
          value={value}
          onChange={(e) => set(e.target.value)}
        />
      )}
    </div>
  );
};
