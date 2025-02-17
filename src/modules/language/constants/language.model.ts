// Asegura que haya concordancia entre idiomas

export interface LanguageInterface {
  auth: {
    principalTitle: string;
    authForm: {
      title: string;
      name: string;
      password: string;
    };
    linkToRegister: string;
    linkToHome: string;
  };
}
