//@ts-ignore
import style from "./style.module.css";
import React from "react";


export const SubmutationContainerLeft = ({children}:{children: React.ReactNode})=>{
    return <div className={`${style.subcontainer} ${style.left}`}>{children}</div>
}

export const SubmutationContainerRight = ({children}:{children: React.ReactNode})=>{
    return <div className={`${style.subcontainer} ${style.right}`}>{children}</div>
}