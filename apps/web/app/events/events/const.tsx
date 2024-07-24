import {ISearchBar} from "@repo/ui/searchBar";

export const TITLE_SECTION: string = "Administracion de Eventos";
export const DESCRIPTION_SECTION: string = "Agrege las ubicaciones donde se realizan los servicios de su negocio, estas ubicaciones corresponden a localizaciones reales ya sean tiendas, eventos, etc. La unica excepcion son las ubicaciones a domilicio y en linea que no tienen una localizacion especifica y vienen configuradas por defecto."

export const TITLE_EDIT_EVENT: string = "Edicion de Evento";
export const TITLE_EDIT_DATE: string = "Edicion de fecha";
export const TITLE_COURTESY_DATE: string = "Entradas de cortesia";
export const TITLE_CREATE_EVENT: string = "Creacion de Evento";
export const DESCRIPTION_CREATE_EVENT: string = "Crear Agrege las ubicaciones donde se realizan los servicios de su negocio, estas ubicaciones corresponden a localizaciones reales ya sean tiendas, eventos, etc."
export const DESCRIPTION_EDIT_EVENT: string = "Editar Agrege las ubicaciones donde se realizan los servicios de su negocio, estas ubicaciones corresponden a localizaciones reales ya sean tiendas, eventos, etc."
export const DESCRIPTION_EDIT_DATE: string = "Editar Agrege las ubicaciones donde se realizan los servicios de su negocio, estas ubicaciones corresponden a localizaciones reales ya sean tiendas, eventos, etc."
export const DESCRIPTION_COURTESY_DATE: string = "Editar Agrege las ubicaciones donde se realizan los servicios de su negocio, estas ubicaciones corresponden a localizaciones reales ya sean tiendas, eventos, etc."
export const PLACEHOLDER_SEARCHBAR: string = "Buscar evento";
export const LIST_HEADER_TABLE = {
    Name: "Nombre",
    Rating: "Rating",
    Dates: "Fechas",
    From: "Desde",
    To: "Hasta",
    Income: "Ingresos",
    Edit: "Editar"
};
export const LIST_HEADER_TABLE_DATES = {
    Enclosure: "Recinto",
    Location: "Direccion",
    From: "Desde",
    To: "Hasta",
    Income: "Ingresos",
    State: "Estado",
    Edit: "Editar",
    Options: "Opciones"
};
export const ARRAY_HEADER_TABLE = [
    LIST_HEADER_TABLE.Name,
    LIST_HEADER_TABLE.Rating,
    LIST_HEADER_TABLE.Dates,
    LIST_HEADER_TABLE.From,
    LIST_HEADER_TABLE.To,
    LIST_HEADER_TABLE.Income,
    LIST_HEADER_TABLE.Edit,
];
export const SELECT_TYPE_BLUEPRINT = {
    Simple: {
        Name: "Normal",
        Id: "idSimple",
        Icon: "/pngIcon.png"
    },
    Advanced: {
        Name: "Multiple",
        Id: "idAdvanced",
        Icon: "/svgIcon.png"
    }
};
export const TABS_EVENTS = {
    Main: {
        Id: "idMain",
        Position: 0,
        Name: "Principal"
    },
    Images: {
        Id: "idImages",
        Position: 1,
        Name: "Recursos"
    },
    Dates: {
        Id: "idDates",
        Position: 2,
        Name: "Fechas"
    },
    Income: {
        Id: "idIncome",
        Position: 3,
        Name: "Finanzas"
    }
};
export const TABS_MUTATION_DATES = {
    Main: {
        Id: "idMain",
        Position: 0,
        Name: "Principal"
    },
    Blueprint: {
        Id: "idBlueprint",
        Position: 1,
        Name: "Retricciones"
    },
    Products: {
        Id: "idProducts",
        Position: 2,
        Name: "Productos"
    },
    Tickets: {
        Id: "idTickets",
        Position: 3,
        Name: "Tickets"
    },
    Transactions: {
        Id: "idTransactions",
        Position: 5,
        Name: "Transacciones"
    },
    Income: {
        Id: "idIncome",
        Position: 4,
        Name: "Estadisticas"
    }
};
export const TABS_COURTESY_DATES = {
    Main: {
        Id: "idMain",
        Position: 0,
        Name: "Principal"
    }
};

export const VENUE_CHANGE: string = "Este sistema ha sido diseñado para ofrecerte la flexibilidad necesaria en caso de que necesites cambiar el recinto asignado originalmente para el evento que estás organizando. Entendemos que pueden surgir circunstancias imprevistas o cambios de último momento que requieran ajustes en el lugar donde se llevará a cabo tu evento. Con nuestro Asistente de Cambio de Recinto, puedes gestionar estos cambios de manera fácil y eficiente."
export const WARNING_DELETE_DATE: string = "Al momento de desactivar una fecha, cambiar la fecha de inicio o la fecha de termino,  si ya se han vendido entradas, los usuarios serán notificados acerca de estos cambios y tendrán el derecho correspondiente a solicitar un reembolso."
export const WARNING_CHANGE_DATE: string = "Al momento de cambiar ya sea la fecha de inicio o la fecha de termino del evento, si ya se han realizado ventas de entradas, los usuarios serán notificados acerca de este cambio y tendrán el derecho correspondiente a solicitar un reembolso."
export const BUTTON_CREATE_EVENT: string = "Crear evento";
export const EVENT_INPUT_PROPS = {
    Name: {
        Name: "nameEvent",
        Placeholder: "Ingrese el nombre del evento",
        Title: "Nombre del evento"
    },
    Public: {
        Name: "publicEvent",
        Placeholder: "Ingrese el nombre para la tarjeta publica",
        Title: "Nombre en la tarjeta publica"
    },
    MinAge:{
        Name: "minAge",
        Placeholder: "Ingrese la edad minima",
        Prefix: "Desde:"
    },
    MaxAge:{
        Name: "maxAge",
        Placeholder: "Ingrese la edad maxima",
        Prefix: "Hasta:"
    }
};
export const NAMES_INPUTS_MUTATION = {
    Cover: "cover",
    Banner: "banner",
    Name: "name",
    PublicName: "publicName"
};
export const EVENT_NOT_FOUND: string = "Evento no encontrado";
export const URL_NOT_FOUND: string = "Url no encontrada";
export const EVENT_NOT_FOUND_RETURN: string = "Volver a Eventos";
export const INITIAL_POSITION_MUTATION: string = "initialPositionMutationEvents";
export const FILTER_INCOME ={
    Title: "Filtrar por ingresos",
    MajorToMinor:{
        Name: "Mayor a menor",
        Id: "idMajorToMinor"
    },
    MinorToMajor:{
        Name: "Menor a mayor",
        Id: "idMinorToMajor"
    }
};
export const LIST_DESCRIPTIONS = [
    "Defina el nombre del evento, proporcionar un breve resumen para dar una idea general del mismo, seleccionar la categoría a la que pertenece el evento para facilitar su búsqueda.",
    "Carga hasta 6 imágenes o enlaces de videos de YouTube para complementar la experiencia del evento. Estos recursos estarán disponibles en la pantalla pública del evento.",
    "En esta sección, puedes ver todas las fechas creadas para este evento. También tienes la opción de agregar nuevas fechas para eventos futuros o editar las fechas existentes.",
    "Aqui encontraras los detalles financieros del evento, ingress totales y sus porcentajes en tickets y consumo, ademas de asistencia, reventas y los reembolsos. ",
];

export const INPUT_COURTESY = {
    User: {
        Name: "User",
        Placeholder: "Ingrese el nombre del usuario",
        Title: "Nombre de usuario"
    },
    Mail: {
        Name: "Mail",
        Placeholder: "Ingrese el email",
        Title: "Correo electronico"
    },
    Amount: {
        Name: "Amount",
        Placeholder: "Ingrese la cantidad de tickets"
    },
    Message: {
        Name: "Message",
        Placeholder: "Ingrese su mensaje"
    }
};


export const SEARCHBAR_PROPS: ISearchBar = {
    Name: "searchVenue",
    Placeholder: "Buscar por nombre o direccion"
};



