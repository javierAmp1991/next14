import { ReactNode } from "react";
//@ts-ignore
import style from "./style.module.css";

export interface IMainContainerDesktop {
    Type?: EnumMainContainerDesktop
}

export enum EnumMainContainerDesktop{
    Use2, Use3
}

export const MainContainerDesktop = ({children, props}: { children: ReactNode, props: IMainContainerDesktop }) => {
    const newStyle = getStyle();
    return <div className={`${style.main} ${newStyle}`}>{children}</div>
    function getStyle(){
        if (props.Type === EnumMainContainerDesktop.Use2) return style.main2
        else if (props.Type === EnumMainContainerDesktop.Use3) return style.main3
        else return ""
    }
}