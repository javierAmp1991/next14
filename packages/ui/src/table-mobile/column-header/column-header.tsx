//@ts-ignore
import style from "./column-header.module.css";
import {useRef} from "react";

export default function ColumnHeader({name}: { name: string }) {
    const ref = useRef<HTMLDivElement>(null);

    return (
        <div ref={ref} className={style.main}>
            <div className={style.text}>
                {name}
            </div>
        </div>
    )
}