import {ReactNode} from "react";
import style from "./calendar-view.module.css";

export default function PopupContainer({children}: { children: ReactNode }) {
    return (
        <div className={style.popUpContainer}>
            {children}
        </div>
    )
}