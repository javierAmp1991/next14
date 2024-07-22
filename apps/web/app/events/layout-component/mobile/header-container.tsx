import { ReactNode } from "react";
import css from "./style.module.css";
import u from "@repo/ui/misc";

export type IHeaderContainer = {
    Title: string
    Action: string
    OnAction: Function
    UseMaxContent?: boolean
}

export const HeaderContainer = ({children, props}: {children: ReactNode, props: IHeaderContainer})=>{
    const {Title, Action, OnAction} = props;
    return(
        <div className={`${props.UseMaxContent ? css.mainHeaderFull : css.mainHeader}`}>
            <div className={css.filter}>
                <p className={u.subtitle}>{Title}</p>
                <button onClick={onClick} className={u.link}>{Action}</button>
            </div>
            <div className={css.left}>
                {children}
            </div>
        </div>
    )

    function onClick(){
        OnAction()
    }
}