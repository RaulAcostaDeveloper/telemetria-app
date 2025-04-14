import { LanguageInterface } from "./language.model";

export const ENGLISH: LanguageInterface = {
  header: {
    backButton: {
      hover: "Go back",
    },
  },
  menu: {
    titles: {
      close: "Close menu",
      fuel: "Fuel",
      logo: "Logo company",
      management: "Management",
      open: "Open menu",
    },
    buttons: {
      logOut: "Log out",
    },
  },
  table: {
    buttons: {
      cancel: "Cancel",
      create: "Create",
      delete: "Delete item",
      downloadCSV: "Download CSV",
      saveEdit: "Save changes",
      saveNew: "Save item",
    },
    actions: {
      close: "Close",
      copy: "Copy text",
      copyError: "Error on copyng text",
      deleteElement: "Delete item",
      editElement: "Edit item",
      filterBy: "Filter by column",
      search: "Search",
      searchTitle: "Search by the first column of the table",
      sortItems: "Sort items by",
      viewDetail: "Ver detalles",
    },
    elements: {
      actions: "Actions",
      columns: "Columns",
      total: "Total",
    },
    formTitles: {
      createElement: "Create item",
      deleteElement: "Are you sure you want to delete this item?",
      deleteSubString: "This action is permanent and cannot be undone.",
    },
  },
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
  fuel: {
    tabs: {
      groups: "Groups",
      unitys: "Unitys",
      zones: "Zones",
    },
  },
  DatePicker: {
    buttons: {
      today: "Today",
    },
  },
  fixedDateFilterOptions: [
    "Last 7 days",
    "Last 15 days",
    "Last 30 days",
    "Last 90 days",
    "This month",
    "Last month",
  ],
  VehicleFilter: {
    inputPlaceholder: "Search Vehicle",
    actionManagementTitle: "Go to management page",
    actionFuelTitle: "Go to fuel report page",
    actionTelemetryTitle: "Go to telemetry page",
  },
};
