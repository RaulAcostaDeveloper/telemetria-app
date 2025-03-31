import { LanguageInterface } from "./language.model";

export const SPANISH: LanguageInterface = {
  menu: {
    titles: {
      fuel: "Combustible",
      management: "Recursos",
      open: "Abrir menú",
      close: "Cerrar menú",
    },
    buttons: {
      logOut: "Salir",
    },
  },
  table: {
    buttons: {
      create: "Crear",
      downloadCSV: "Descargar CSV",
      cancel: "Cancelar",
      saveNew: "Guardar elemento",
      saveEdit: "Guardar edición",
      delete: "Eliminar elemento",
    },
    actions: {
      search: "Buscar",
      searchTitle: "Buscar por la primer columna de la tabla",
      filterBy: "Filtrar por la columna",
      sortItems: "Ordenar elementos por",
      copy: "Copiar el texto",
      copySuccess: "Texto copiado al portapapeles",
      copyError: "Error al copiar",
      viewDetail: "View details",
      editElement: "Editar elemento",
      deleteElement: "Eliminar elemento",
      close: "Cerrar",
    },
    elements: {
      columns: "Columnas",
      actions: "Acciones",
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
      title: "Autenticación",
      name: "Nombre",
      password: "Contraseña",
    },
    linkToRegister: "Ir a registro",
    linkToHome: "Ir al home",
  },
  fuel: {
    tabs: {
      groups: "Grupos",
      zones: "Zonas",
      unitys: "Unidades",
    },
  },
};
