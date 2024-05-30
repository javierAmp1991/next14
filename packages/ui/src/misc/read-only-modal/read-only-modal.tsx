//@ts-ignore
import style from "./style.module.css";
import React from "react";
export interface ReadonlyModalProps {
  Pre: string
  NewStyle?: string;
  UseGrid?: boolean;
}

export const ReadOnlyModal = ({props, children}:{children: React.ReactNode, props: ReadonlyModalProps })=>{
    const s = `${props.NewStyle} ${props.UseGrid && style.gridRadOnlyModal}`;
    return <p className={s}><span>{props.Pre}: </span>{children}</p>
}