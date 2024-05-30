//@ts-ignore
import style from "./style.module.css";
import {MouseEvent} from "react";

export const NumberTable = ({number, onClick}: { number: number, onClick?: Function }) => {
    return <span onClick={handleClick} className={`${style.main}`}><span className={style.number}>{number}</span></span>

    function handleClick(e: MouseEvent) {
        if (onClick) {
            e.preventDefault()
            e.stopPropagation()
            onClick()
        }
    }
}