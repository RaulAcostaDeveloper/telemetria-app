// Asegura que haya concordancia entre idiomas

export interface LanguageInterface {
  localeLanguage: string;
  sectionName: {
    home: string;
    management: string;
    fuel: string;
    telemetryobd: string;
  };
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
      logo: string;
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
      goObdReport: string;
      noImei: string;
      cleanFilters: string;
      noFilters: string;
      goPage: string;
    };
    elements: {
      actions: string;
      columns: string;
      total: string;
    };
    formTitles: {
      filters: string;
      createElement: string;
      deleteElement: string;
      deleteSubString: string;
    };
  };
  highCharts: {
    options: {
      rangeSelectorShowAll: string;
    };
    axisTitles: {
      time: string;
      fuelVariation: string;
      performance: string;
      distance: string;
      timeTraveled: string;
    };
    titles: {
      charges: string;
      disCharges: string;
      fuelVariation: string;
      performancesBetweenCharges: string;
      dailyPerformance: string;
      engineOff: string;
      engineOnIdle: string;
      engineOnMoving: string;
    };
    tooltips: {
      date: string;
      lat: string;
      lon: string;
      fuel: {
        initialFuel: string;
        finalFuel: string;
        totalCharges: string;
        odometer: string;
        speed: string;
        ignition: string;
        on: string;
        off: string;
        deviceBattery: string;
        mainPower: string;
        address: string;
        totalDischarges: string;
        averagePerformance: string;
        fuelConsumed: string;
        initialLevel: string;
        finalLevel: string;
        initialOdometer: string;
        finalOdometer: string;
        distanceTravelled: string;
        tanks: string;
      };
      rpm: {
        rpm: string;
      };
      distance: {
        distance: string;
        distanceTraveled: string;
      };
      timeTraveled: {
        timeTraveled: string;
      };
      telemetryOBD: {
        xAxisDistance: string;
        xAxisDriven: string;
        yAxis: string;
      };
    };
  };
  geoModalTitles: {
    rpmTitle: string;
    totalDistanceTitle: string;
    fuelChargeTitle: string;
    fuelDischargeTitle: string;
    levelMessageTitle: string;
    fuelNowTitle: string;
    roadmap: string;
    satellite: string;
    timeTraveledTitle: string;
  };
  auth: {
    principalTitle: string;
    authForm: {
      name: string;
      password: string;
      title: string;
      loginButton: string;
    };
    authFormNote: {
      nameOrPasswordError: string;
      networkError: string;
      unexpectedError: string;
    };
    linkToHome: string;
    linkToRegister: string;
    checklogin: {
      maintitle: string;
    };
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
      topCharges: string;
      unitys: string;
      topDischarges: string;
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
    fuelChargesLabels: {
      eventId: string;
      startDate: string;
      endDate: string;
      origin: string;
    };
  };
  onBoardDiagnosticsVehicle: {
    tabs: {
      averageRpm: string;
      analysis: string;
      totalDistance: string;
      totalTimeWorked: string;
    };
    analysisTab: {
      plate: string;
      vehicle: string;
      km: string;
      workingShift: string;
      fuelType: string;
      fuelConsumed: string;
      averageConsumption: string;
      litersPerHour: string;
      totalDistance: string;
      totalEngineHours: string;
      totalFuelConsumed: string;
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
      groupVehicles: string;
      vehicleInformation: string;
      address: string;
      alias: string;
      brand: string;
      celphone: string;
      createdAt: string;
      date: string;
      driver: string;
      email: string;
      entryDate: string;
      firmware: string;
      groupName: string;
      hardware: string;
      id: string;
      imei: string;
      lastDataDate: string;
      lastnames: string;
      license: string;
      model: string;
      name: string;
      names: string;
      plates: string;
      phoneNumber: string;
      registrationDate: string;
      serialNumber: string;
      sim: string;
      status: string;
      type: string;
      username: string;
      vehicleType: string;
      version: string;
      year: string;
    };
  };
  teleOBD: {
    resumes: {
      distance: string;
      timeDriven: string;
      timeIdle: string;
    };
    tableColumns: {
      title: string;
      plate: string;
      name: string;
      kilometerMarker: string;
      fuelType: string;
      litersPerHour: string;
      totalDistance: string;
      totalEngineHours: string;
      totalConsumed: string;
      totalIdleHours: string;
    };
    tableTitle: {
      registerTeleOBD: string;
    };
    charts: {
      titleDistance: string;
      titleDriven: string;
      titleIdle: string;
      subtitleDistance: string;
      subtitleDriven: string;
      subtitleIdle: string;
      xAxisDistance: string;
      xAxisDriven: string;
      xAxisIdle: string;
      yAxis: string;
    };
  };
}
