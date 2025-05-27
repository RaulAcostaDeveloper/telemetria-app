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
    calendar: {
      buttonHover: string;
      datePicker: {
        buttons: {
          today: string;
        };
      };
      acceptButtonLabel: string;
      cancelButtonLabel: string;
      errorMessage3: string;
      errorMessage1: string;
      errorMessage2: string;
      errorMessage: string;
      fixedDateFilterOptions: string[];
      fromLabel: string;
      reportingPeriod: string;
      toLabel: string;
      daysOfWeek: string[];
      daysOfWeekTitle: string;
      monthNames: string[];
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
      downloadFiltredCSV: string;
      filtered: string;
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
      any: string;
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
      nameError: string;
      passwordError: string;
      loginButton: string;
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
    vehiclesTableColumns: {
      imei: string;
      lastFuelLevel: string;
      lastReportDate: string;
      name: string;
      plate: string;
      fuelLoadCount: string;
      fuelUnloadCount: string;
      performanceOdometer: string;
      performanceHorometer: string;
      fuelLoaded: string;
      fuelUnloaded: string;
    };
  };
  management: {
    tabs: {
      vehicles: string;
      devices: string;
      clients: string;
      users: string;
      groups: string;
      accounts: string;
      drivers: string;
    };
  };
}
