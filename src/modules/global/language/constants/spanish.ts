import { LanguageInterface } from "./language.model";

export const SPANISH: LanguageInterface = {
  auth: {
    principalTitle: "Página de autenticación",
    authForm: {
      title: "Autenticación",
      name: "Nombre",
      password: "Contraseña",
    },
    linkToRegister: "Ir a registro",
    linkToHome: "Ir al home",
  },
  menu: {
    titles: {
      fuel: "Combustible",
      management: "Recursos",
      open: "Abrir menú",
      close: "Cerrar menú",
    },
    buttons: {
      logOut: "Salir",
    },
  },
};
