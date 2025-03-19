// Asegura que haya concordancia entre idiomas

export interface LanguageInterface {
  auth: {
    principalTitle: string;
    authForm: {
      name: string;
      password: string;
      title: string;
    };
    linkToHome: string;
    linkToRegister: string;
  };
  menu: {
    titles: {
      fuel: string;
      management: string;
      open: string;
      close: string;
    };
    buttons: {
      logOut: string;
    };
  };
}
