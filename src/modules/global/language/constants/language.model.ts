// Asegura que haya concordancia entre idiomas

export interface LanguageInterface {
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
  table: {
    buttons: {
      create: string;
      downloadCSV: string;
      cancel: string;
      saveNew: string;
      saveEdit: string;
      delete: string;
    };
    actions: {
      search: string;
      searchTitle: string;
      filterBy: string;
      sortItems: string;
      copy: string;
      copySuccess: string;
      copyError: string;
      viewDetail: string;
      editElement: string;
      deleteElement: string;
      close: string;
    };
    elements: {
      columns: string;
      actions: string;
      total: string;
    };
    formTitles: {
      createElement: string;
      deleteElement: string;
      deleteSubString: string;
    };
  };
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
  fuel: {
    tabs: {
      groups: string;
      zones: string;
      unitys: string;
    };
  };
}
