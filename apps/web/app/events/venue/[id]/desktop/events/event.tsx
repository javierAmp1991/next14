import {DefaultCard, IDefaultCard} from "@repo/ui/defaultCard";
import {EventResume} from "../../provider";

export default function Event({e}: { e: EventResume }) {
    const props: IDefaultCard = {First: e.Name,Second: e.Venue, Image: e.Image, Href: "/"};
    return <DefaultCard props={props}/>
}