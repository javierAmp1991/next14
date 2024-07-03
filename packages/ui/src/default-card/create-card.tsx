import {DefaultCard, IDefaultCard} from "./default-card";
import {PLUS_ICON_ORANGE} from "../icons";
export const CreateCardDesktop = ({props}:{props: IDefaultCard})=>{
    const newProps: IDefaultCard = {...props, Image: PLUS_ICON_ORANGE};
    return <DefaultCard props={newProps}/>
}