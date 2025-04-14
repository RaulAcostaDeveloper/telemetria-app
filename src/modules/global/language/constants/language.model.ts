// Asegura que haya concordancia entre idiomas

export interface LanguageInterface {
  header: {
    backButton: {
      hover: string;
    };
    vehicleFilter: {
      actionFuelTitle: string;
      actionManagementTitle: string;
      actionTelemetryTitle: string;
      inputPlaceholder: string;
    };
  };
  menu: {
    titles: {
      close: string;
      fuel: string;
      logo: string;
      management: string;
      open: string;
    };
    buttons: {
      logOut: string;
    };
  };
  table: {
    buttons: {
      cancel: string;
      create: string;
      delete: string;
      downloadCSV: string;
      saveEdit: string;
      saveNew: string;
    };
    actions: {
      close: string;
      copy: string;
      copyError: string;
      deleteElement: string;
      editElement: string;
      filterBy: string;
      search: string;
      searchTitle: string;
      sortItems: string;
      viewDetail: string;
    };
    elements: {
      actions: string;
      columns: string;
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
      unitys: string;
      zones: string;
    };
  };
  DatePicker: {
    buttons: {
      today: string;
    };
  };
  fixedDateFilterOptions: string[];
}
