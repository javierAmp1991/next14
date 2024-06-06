import {INotFound} from "@repo/ui/misc";
export const TABS_ENCLOSURE = {
  Main: {
    Id: "idMain",
    Position: 0,
    Name: "Principal",
  },
  Images: {
    Id: "idImages",
    Position: 1,
    Name: "Imagenes",
  },
  Events: {
    Id: "idEvents",
    Position: 2,
    Name: "Eventos",
  },
  Blueprints: {
    Id: "idBlueprints",
    Position: 3,
    Name: "Planos",
  },
  Advanced: {
    Id: "idAdvanced",
    Position: 4,
    Name: "Avanzado",
  },
};
export const INITIAL_POSITION_MUTATION: string = "initialPositionMutationVenue";
export const CINEMA_TITLE: string = "Referencias del recinto";
export const NOT_FOUND_PROPS: INotFound = {
  Href: "/events/venue",
  ReturnText: "Volver a Mis recintos",
  Text: "Recinto no encontrado"
}
