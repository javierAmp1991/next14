//@ts-ignore
import style from "./column.module.css";
import React, {MouseEvent} from "react";

export const ColumnClick = ({children, useGrid, onClick}:{
    children: React.ReactNode, useGrid?: boolean, onClick: () => void }) => {
    return <div onClick={handleClick} className={`${style.main} ${useGrid && style.grid}`}>{children}</div>

    function handleClick(e: MouseEvent) {
        e.stopPropagation()
        e.preventDefault()
        onClick()
    }
}