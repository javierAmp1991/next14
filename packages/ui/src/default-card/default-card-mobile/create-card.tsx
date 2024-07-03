import {DefaultCardMobile} from "./default-card";
import {IDefaultCard} from "../default-card";
import {PLUS_ICON_ORANGE} from "../../icons";

export const CreateCardMobile = ({props}:{props: IDefaultCard})=>{
    const newProps: IDefaultCard = {...props, Image: PLUS_ICON_ORANGE};
    return <DefaultCardMobile props={newProps}/>
}