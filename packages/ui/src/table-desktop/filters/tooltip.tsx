//@ts-ignore
import style from "./filters.module.css";
import React, {ReactNode} from "react";

export const Tooltip = ({children, isOpen}: { children: React.ReactNode, isOpen: boolean }) => {
    return (
        <div className={`${style.mainToolTip} ${isOpen && style.tooltipIn}`}>
            <div className={style.tooltipDec}/>
            <div className={style.tooltip}>{children}</div>
        </div>
    )
}