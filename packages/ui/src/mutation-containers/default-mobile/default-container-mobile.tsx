//@ts-ignore
import style from "./style.module.css";
import React from "react";

export const DefaulContainerMobile = ({children}:{children: React.ReactNode})=>{
    return <div className={style.main}>{children}</div>

}