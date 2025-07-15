// Asegura que haya concordancia entre idiomas

export interface LanguageInterface {
  localeLanguage: string;
  header: {
    backButton: {
      hover: string;
    };
    vehicleFilter: {
      actionFuelTitle: string;
      actionManagementTitle: string;
      actionTelemetryTitle: string;
      inputPlaceholder: string;
      inputNoMatch: string;
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
      home: string;
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
      filtersButton: string;
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
      goFuelReport: string;
      goObtReport: string;
      cleanFilters: string;
      noFilters: string;
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
      nameOrPasswordError: string;
      loginButton: string;
    };
    linkToHome: string;
    linkToRegister: string;
  };
  fuel: {
    filter: {
      header: string;
      showFilters: string;
      hideFilters: string;
      account: string;
      group: string;
      brand: string;
      model: string;
      selectAnOption: string;
      search: string;
    };
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
    summaryReports: {
      labels: {
        inventory: string;
        performance: string;
        fuelCharged: string;
        fuelDischarged: string;
        unitsAnalyzed: string;
        totalDistanceTraveled: string;
      };
    };
    donutGrpahic: {
      title: string;
      waitingMessage: string;
      noDataMessage: string;
      metric: string;
      segments: string;
      inventory: string;
      charged: string;
      discharged: string;
    };
  };
  fuelVehicle: {
    tabs: {
      behavior: string;
      reports: string;
      fuelNow: string;
      charges: string;
      discharges: string;
    };
    vehicleReports: {
      distanceEfficiency: string;
      distanceTravelled: string;
      fuelConsumed: string;
      fuelEnd: string;
      fuelLoaded: string;
      fuelStart: string;
      operatingHours: string;
      timeEfficiency: string;
    };
    fuelNow: {
      lastDateReport: string;
      fuelNow: string;
      capacity: string;
      velocity: string;
      performance: string;
      ignition: string;
      on: string;
      off: string;
      tank: string;
      showLocation: string;
      hideLocation: string;
    };
    fuelGraphicSeries: {
      charges: string;
      disCharges: string;
      fuelVariaiton: string;
      performancesBetweenCharges: string;
      dailyPerformance: string;
    };
    fuelChargesLabels: {
      date: string;
      eventId: string;
      address: string;
      lat: string;
      lon: string;
      odometer: string;
      speed: string;
      ignition: string;
      deviceBattery: string;
      mainPower: string;
      totalCharges: string;
      totalDischarges: string;
      initialFuel: string;
      finalFuel: string;
      startDate: string;
      endDate: string;
      origin: string;
      averagePerformance: string;
      tanks: string;
      fuelConsumed: string;
      initialLevel: string;
      finalLevel: string;
      initialOdometer: string;
      finalOdometer: string;
      distanceTravelled: string;
    };
    fuelNowLabels: {
      AccountId: string;
      DeviceId: string;
      DeviceName: string;
      EventId: string;
      DateGps: string;
      lat: string;
      lon: string;
      Address: string;
      Speed: string;
    };
    geoModalTitles: {
      fuelChargeTitle: string;
      fuelDischargeTitle: string;
      levelMessageTitle: string;
      fuelNowTitle: string;
      roadmap: string;
      satellite: string;
    };
    fuelLoadsChart: {
      rangeSelectorShowAll: string;
      fuelVariation: string;
      time: string;
      performance: string;
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
    tableColumns: {
      id: string;
      plates: string;
      brand: string;
      alias: string;
      model: string;
      version: string;
      status: string;
      date: string;
      serialNumber: string;
      sim: string;
      firmware: string;
      hardware: string;
      imei: string;
      lastDataDate: string;
      username: string;
      names: string;
      lastnames: string;
      email: string;
      celphone: string;
      createdAt: string;
    };
  };
}
