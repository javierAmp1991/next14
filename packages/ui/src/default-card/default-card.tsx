//@ts-ignore
import style from "./style.module.css";
import Image from "next/image";
import React from "react";
import Link from "next/link";

export interface IDefaultCard {
  First: string;
  Second: string;
  Image: string;
  NewStyle?: string;
  Href?: string
}

export const DefaultCard = ({props}: { props: IDefaultCard }) => {
    const s = `${style.main} ${props.NewStyle}`;
    const Children = () => 
    <>
      <div className={style.bg}/>
      <div className={style.profile}><Image alt="" layout={"fill"} src={props.Image}/></div>
      <div className={`${style.name}`}>{props.First}</div>
      <div className={style.sku}>{props.Second}</div>
    </>

    return (
        props.Href ?
        <Link href={props.Href} className={`${s} ${style.hover}`}>
            <Children/>
        </Link>
        :
        <div className={`${s}`}>
            <Children/>
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