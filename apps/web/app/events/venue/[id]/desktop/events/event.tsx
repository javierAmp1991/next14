import {DefaultCard, IDefaultCard} from "@repo/ui/defaultCard";

export default function Event({e}: { e: any }) {
    const props: IDefaultCard = {First: e.Name,Second: e.Enclosure, Image: e.CoverImage};
    return <DefaultCard props={props}/>
}