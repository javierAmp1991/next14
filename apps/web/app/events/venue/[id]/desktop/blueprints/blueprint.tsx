import {DefaultCard, IDefaultCard} from "@repo/ui/defaultCard";
import {BlueprintResume} from "../../provider";

export default function Blueprint({e, id}: { e: BlueprintResume, id: string }) {
    const props: IDefaultCard = {
        First: e.Name,
        Second: `${e.Sections} ${e.Sections === 1 ? "Seccion" : "Secciones"}`,
        Image: e.Image,
        Href: `/events/venue/${id}/blueprints/${e.Id}`
    };
    return <DefaultCard props={props}/>
}