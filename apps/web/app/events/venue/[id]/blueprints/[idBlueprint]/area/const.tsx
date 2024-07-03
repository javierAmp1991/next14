import { EnumTypeResource } from "@repo/ui/uploadResources";

export const TABS_AREA = {
    Main: {
      Id: "idMain",
      Position: 0,
      Name: "Principal",
    },
    Images: {
        Name: "Imagenes",
        Id: "idImages",
        Position: 1
    },
    Sections: {
        Name: "Secciones",
        Id: "idSections",
        Position: 2
    },
    Preview: {
        Name: "Preview",
        Id: "idPrewview",
        Position: 3
    }
};
export const AREA_CONST = {
    Main:{
        Input: {
            Title:"Nombre del area",
            Placeholder: "Ingrese el nombre del area",
            Name: "areaName",
            IsObligatory: true
        },
        Layout: {
            Title: "Imagen del area",
            Subtitle: "Busque y suba la imagen del area"
        },
        Resource:{
            Name: "inputResource",
            Id: "idInputResource",
            Placeholder: "",
            Link: "",
            Type: EnumTypeResource.Image,
            TitleCinema: "Imagen del area"
        }
    },
    Resources:{
        Tab:{
            Title: "Imagenes de referencia",
            Complement: "/4"
        },
        Resource: {
            Name: "nameResource",
            Id: "idResource",
            Link: "",
            Type: EnumTypeResource.Image
        }
    }
}



