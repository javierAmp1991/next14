//@ts-ignore
import style from "./style.module.css";
import React from "react";
export interface IMutationContainerGrid {
    Style?: string
    Grid?: string
    UseDefaultPadding?: boolean
}

export const MutationContainerGrid = ({children, props}:{children: React.ReactNode, props: IMutationContainerGrid})=>{
    return <div className={`${style.main} ${props.Style} ${props.UseDefaultPadding && style.padding}`}>{children}</div>

}