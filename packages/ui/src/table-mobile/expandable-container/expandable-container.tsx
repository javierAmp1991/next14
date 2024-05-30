//@ts-ignore
import style from "./expandable-container.module.css";
import React from "react";

export const ExpandableContainer = ({children}: { children: React.ReactNode }) => {
    return <div className={style.contInformation}>{children}</div>
}

export const ExpansiveContainerInformation = ({children}: { children: React.ReactNode }) =>
    <div className={`${style.mainGridInformation}`}>
        <div className={style.mainContainerInformation}>
            <div className={style.contInformation2}>
                {children}
            </div>
        </div>
        <div className={style.black}/>
    </div>