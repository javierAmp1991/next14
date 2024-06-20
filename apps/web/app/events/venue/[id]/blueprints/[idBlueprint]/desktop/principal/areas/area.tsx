import {DefaultCard, IDefaultCard} from "@repo/ui/defaultCard";
import {} from "../../../provider";

export default function Blueprint({e, idVenue, idBlueprint}: { e: any, idVenue: string, idBlueprint: string }) {
    const props: IDefaultCard = {
        First: e.Name,
        Second: `${e.Sections} ${e.Sections === 1 ? "Seccion" : "Secciones"}`,
        Image: e.Image,
        Href: `/events/venue/${idVenue}/blueprints/${idBlueprint}/area/${e.Id}`
    };
    return <DefaultCard props={props}/>
}