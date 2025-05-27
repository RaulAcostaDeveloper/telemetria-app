import { LanguageInterface } from "./language.model";

export const SPANISH: LanguageInterface = {
  header: {
    backButton: {
      hover: "Regresar",
    },
    vehicleFilter: {
      actionFuelTitle: "Ir al reporte de combustible",
      actionManagementTitle: "Ir a la gestión del vehículo",
      actionTelemetryTitle: "Ir al reporte de telemetría",
      inputPlaceholder: "Buscar vehiculo...",
    },
    calendar: {
      buttonHover: "Abrir opciones de calendario",
      datePicker: {
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
      reportingPeriod: "Período de reportes",
      fromLabel: "Desde:",
      toLabel: "Hasta:",
      acceptButtonLabel: "Aceptar",
      cancelButtonLabel: "Cancelar",
      errorMessage3: `No se encontró una fecha "Desde" o "Hasta".`,
      errorMessage1: `La fecha "Hasta" no puede ser anterior a la fecha "Desde" `,
      errorMessage2: `La hora seleccionada en la fecha "Hasta" no puede ser mayor que la hora actual.`,
      errorMessage: " Por favor selecciona una hora válida.",
      daysOfWeek: ["Do", "Lu", "Ma", "Mi", "Jue", "Vie", "Sa"],
      daysOfWeekTitle: "Seleccionar",
      monthNames: [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ],
    },
  },
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
      downloadFiltredCSV: "Descargar CSV (filtrado)",
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
      any: "Sin filtro",
      search: "Buscar",
      searchTitle: "Buscar por la primer columna de la tabla",
      sortItems: "Ordenar elementos por",
      viewDetail: "Ver detalles",
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
      nameOrPasswordError: "Usuario o contraseña invalido",
      loginButton: "Iniciar sesión",
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
    summaryReports: {
      labels: {
        inventory: "Inventario total",
        performance: "Rendimiento de la flota",
        fuelCharged: "Combustible cargado",
        fuelDischarged: "Combustible descargado",
      },
    },
  },
  management: {
    tabs: {
      vehicles: "Vehículos",
      devices: "Dispositivos",
      clients: "Clientes",
      users: "Usuarios",
      groups: "Grupos",
      accounts: "Cuentas",
      drivers: "Conductores",
    },
  },
};
