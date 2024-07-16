//@ts-ignore
import style from "./calendar-view.module.css";
import { ReactNode } from "react";

export default function PopupContainer({children}: { children: ReactNode }) {
    return (
        <div className={style.popUpContainer}>
            {children}
        </div>
    )
}