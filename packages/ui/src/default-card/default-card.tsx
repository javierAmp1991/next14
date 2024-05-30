//@ts-ignore
import style from "./style.module.css";
import {CHECK_ICON_GREEN} from "../icons";
import Image from "next/image";
import React from "react";

export interface IDefaultCard {
  First: string;
  Second: string;
  Image: string;
  Rating?: number;
  NewStyle?: string;
  Selected?: boolean;
  DontUseDecoration?: boolean | undefined;
  NoHover?: boolean | undefined;
}

export const DefaultCard = ({props}: { props: IDefaultCard }) => {
    const styleHover = props.NoHover? style.noHover: props.Selected ? style.selected : style.noSelected;
    return (
        <div className={`${style.main}  ${styleHover} ${props.NewStyle}`}>
            <div className={style.bg}/>
            <div className={style.profile}><Image alt="" layout={"fill"} src={props.Image}/></div>
            <div className={`${style.name}`}>{props.First}</div>
            <div className={style.sku}>{props.Second}</div>
            {props.Selected && <div className={style.icon}><Image alt="" layout={"fill"} src={CHECK_ICON_GREEN}/></div>}
        </div>
    )
}

export const GridDefaultCard = ({children}:{children: React.ReactNode}) => {
    return <div className={style.contGrid}><div className={style.grid}>{children}</div></div>
}

export const GridDefaultCardMobile = ({children}:{children: React.ReactNode}) => {
    return <div className={style.gridMobile}>{children}</div>
}

export const GridDefaultCardMobile2 = ({children}:{children: React.ReactNode}) => {
    return <div className={style.gridMobile2}>{children}</div>
}