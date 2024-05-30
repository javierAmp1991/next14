import {DefaultCardMobile, IDefaultCard} from "@repo/ui/defaultCard";

export default function Blueprint({e}: { e: any }) {
    const props: IDefaultCard = {
        First: e.Name,
        Second: `${e.Sections} ${e.Sections === 1 ? "Seccion" : "Secciones"}`,
         Image: e.CoverImage};
    return <DefaultCardMobile props={props} />;
}