import { LanguageInterface } from "./language.model";

export const ENGLISH: LanguageInterface = {
  auth: {
    principalTitle: "Authentication page",
    authForm: {
      name: "Name",
      password: "Password",
      title: "Authentication",
    },
    linkToHome: "Go to home",
    linkToRegister: "Go to Register",
  },
  menu: {
    titles: {
      fuel: "Fuel",
      management: "Management",
      open: "Open menu",
      close: "Close menu",
    },
    buttons: {
      logOut: "Log out",
    },
  },
};
