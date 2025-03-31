import { LanguageInterface } from "./language.model";

export const ENGLISH: LanguageInterface = {
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
  table: {
    buttons: {
      create: "Create",
      downloadCSV: "Download CSV",
      cancel: "Cancel",
      saveNew: "Save item",
      saveEdit: "Save changes",
      delete: "Delete item",
    },
    actions: {
      search: "Search",
      searchTitle: "Search by the first column of the table",
      filterBy: "Filter by column",
      sortItems: "Sort items by",
      copy: "Copy text",
      copySuccess: "Text copied to clipboard",
      copyError: "Error on copyng text",
      viewDetail: "Ver detalles",
      editElement: "Edit item",
      deleteElement: "Delete item",
      close: "Close",
    },
    elements: {
      columns: "Columns",
      actions: "Actions",
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
      zones: "Zones",
      unitys: "Unitys",
    },
  },
};
