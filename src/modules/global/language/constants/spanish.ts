import { LanguageInterface } from "./language.model";

export const SPANISH: LanguageInterface = {
  menu: {
    titles: {
      close: "Cerrar menú",
      fuel: "Combustible",
      logo: "Logo de la compañía",
      management: "Recursos",
      open: "Abrir menú",
    },
    buttons: {
      logOut: "Salir",
    },
  },
  table: {
    buttons: {
      cancel: "Cancelar",
      create: "Crear",
      delete: "Eliminar elemento",
      downloadCSV: "Descargar CSV",
      saveEdit: "Guardar edición",
      saveNew: "Guardar elemento",
    },
    actions: {
      close: "Cerrar",
      copy: "Copiar el texto",
      copyError: "Error al copiar",
      deleteElement: "Eliminar elemento",
      editElement: "Editar elemento",
      filterBy: "Filtrar por la columna",
      search: "Buscar",
      searchTitle: "Buscar por la primer columna de la tabla",
      sortItems: "Ordenar elementos por",
      viewDetail: "View details",
    },
    elements: {
      actions: "Acciones",
      columns: "Columnas",
      total: "Total",
    },
    formTitles: {
      createElement: "Crear elemento",
      deleteElement: "¿Seguro que quieres eliminar este elemento?",
      deleteSubString: "Esta acción es permanente y no se puede deshacer.",
    },
  },
  auth: {
    principalTitle: "Página de autenticación",
    authForm: {
      name: "Nombre",
      password: "Contraseña",
      title: "Autenticación",
    },
    linkToHome: "Ir al home",
    linkToRegister: "Ir a registro",
  },
  fuel: {
    tabs: {
      groups: "Grupos",
      unitys: "Unidades",
      zones: "Zonas",
    },
  },
  DatePicker: {
    buttons: {
      today: "Hoy",
    },
  },
  fixedDateFilterOptions: [
    "Últimos 7 días",
    "Últimos 15 días",
    "Últimos 30 días",
    "Últimos 90 días",
    "Este mes",
    "El mes pasado",
  ],
};
