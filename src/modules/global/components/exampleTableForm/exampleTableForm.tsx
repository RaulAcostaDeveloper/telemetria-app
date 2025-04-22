"use client";
import { useEffect, useState } from "react";

// Componente de ejemplo para formularios de EDITAR y CREAR en el componente Tabla
interface Props {
  dataObject?: { [key: string]: string | number };
  setIsDisabled: (val: boolean) => void;
  setSaveFunction: (cb: () => void) => void;
}

export const ExampleTableForm = ({ setIsDisabled, setSaveFunction }: Props) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    setSaveFunction(() => () => {
      onSave();
    });
  }, []);

  // Definir cuándo se activa el botón
  useEffect(() => {
    // Ejemplo: Al pasar validaciones
    if (value.length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [value]);

  const onSave = () => {
    // Definir lo que ocurre al presionar el botón
    console.log("Guardando...");
  };

  // Ejemplo de formulario
  return (
    <div className="claseMiclase">
      <label htmlFor="vehicleName">Nombre del vehículo</label>
      <br />
      <input
        id="vehicleName"
        type="text"
        placeholder="Escribir aquí"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};
