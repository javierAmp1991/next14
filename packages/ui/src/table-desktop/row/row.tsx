//@ts-ignore
import css from "./row.module.css";
import {CSSProperties} from "react";

export const Row = ({style, index, Columns, grid, onMutation}:{
     style: CSSProperties, index: number, grid: string, onMutation: Function, Columns: React.ReactNode }) => {

    const classNames = `${css.main} ${grid} ${index % 2 !== 0 ? css.bgGray : css.bgWhite}`

    return <div onClick={handleMutation} style={style} className={classNames}>{Columns}</div>

    function handleMutation() {
        onMutation()
    }
}