//@ts-ignore
import css from "./style.module.css";
import {MouseEvent} from "react";

const defaultColor = "#91a8be";

export interface IDeleteButton {
    Width: number,
    Color?: string
    Style?: string
    OnClick: Function
}

export const DeleteButton = ({Width, Color, Style, OnClick}: IDeleteButton) => {
    const newWidth = Width ? `${Width}px` : "100%";
    const style = {width: newWidth};
    const styleColor = {background: Color || defaultColor}
    return (
        <button onClick={handleDelete} className={`${css.mainDelete} ${Style}`}>
            <div style={style} className={css.delete}>
                <span style={styleColor} className={css.x}/>
                <span style={styleColor} className={css.y}/>
            </div>
        </button>
    )

    function handleDelete(e: MouseEvent) {
        e.stopPropagation()
        e.preventDefault()
        OnClick()
    }
}