"use client";
import { useState } from "react";

import styles from "./zoneEditProfileModalForm.module.css";
import { ButtonTypes, GeneralButton, Modal } from "@/global/components";
import { LanguageInterface } from "@/global/language/constants/language.model";
import { PrimitiveValue } from "@/global/components/table/table.model";

interface Props {
  LANGUAGE: LanguageInterface;
  closeModal: () => void;
  id: PrimitiveValue;
}

export const ZoneEditProfileModalForm = ({
  LANGUAGE,
  closeModal,
  id,
}: Props) => {
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState("");
  const [authCharges, setAuthCharges] = useState("");
  const [authDisharges, setAuthDisharges] = useState("");
  const [authRalenti, setAuthRalenti] = useState("");
  // rgb hexadecimal
  const [color, setColor] = useState<string>("#000000");
  const [provider, setProvider] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const authOptions = [
    LANGUAGE.zones.zoneProfileForm.authorized,
    LANGUAGE.zones.zoneProfileForm.noAuthorized,
  ];

  const onConfirm = () => {
    // Pendiente implementar
    console.log("id ", id);
    // console.log("name", name);
    // console.log("category", category);
    // console.log("authCharges", authCharges);
    // console.log("authDisharges", authDisharges);
    // console.log("authRalenti", authRalenti);
    // console.log("color", color);
    // console.log("provider", provider);
    // console.log("description", description);
  };

  return (
    <Modal
      LANGUAGE={LANGUAGE}
      closeModal={closeModal}
      title={LANGUAGE.table.actions.addProfileToZone}
    >
      <div className={styles.form}>
        <div className={styles.row}>
          <Input
            name="nameProfile"
            title="Nombre del perfíl"
            value={name}
            set={setName}
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
            value={authCharges}
            set={setAuthCharges}
            options={authOptions}
            isLeft
          />
          <Select
            title="Descargas"
            name="unloadedAuth"
            value={authDisharges}
            set={setAuthDisharges}
            options={authOptions}
          />
        </div>
        <div className={styles.row}>
          <Select
            title="Ralentí"
            name="ralenti"
            value={authRalenti}
            set={setAuthRalenti}
            options={authOptions}
            isLeft
          />
          <Input
            title="Color"
            name="color"
            value={color}
            set={setColor}
            isColor
          />
        </div>

        <div className={styles.row}>
          <Select
            title="Proveedor"
            name="provider"
            value={provider}
            set={setProvider}
            options={providerOptions}
            isLeft
          />
        </div>

        <div className={styles.row}>
          <Input
            title="Descripción"
            name="description"
            value={description}
            set={setDescription}
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
            disabled={
              !(
                name &&
                category &&
                authCharges &&
                authDisharges &&
                authRalenti &&
                color &&
                provider
              )
            }
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
        className={` ${styles.input} ${styles.selectInput} ${
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

const Input = ({
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
          className={` ${styles.input} ${styles.textarea} ${
            value !== "" ? styles.withValue : ""
          }`}
        />
      ) : (
        <input
          type={`${isColor ? "color" : "text"}`}
          name={name}
          id={name}
          value={value}
          onChange={(e) => set(e.target.value)}
          className={` ${styles.input} ${value !== "" ? styles.withValue : ""}`}
        />
      )}
    </div>
  );
};

// Esto nos lo van a proporcionar en un futuro
const categoryOptions = ["una categoría", "otra categoría"];
const providerOptions = ["un proveedor", "otro proveedor"];
