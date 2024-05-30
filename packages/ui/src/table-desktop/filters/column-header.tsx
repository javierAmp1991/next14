//@ts-ignore
import style from "./filters.module.css";
import {useRef} from "react";

export const ColumnHeader = ({name}: { name: string }) => {
    return <div className={style.main}><div className={style.text}>{name}</div></div>
}