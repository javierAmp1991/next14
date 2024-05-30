//@ts-ignore
import css from "./row.module.css";
import React, {CSSProperties} from "react";

export const EmptyRow =({style, index}: { style: CSSProperties, index: number }) => {
    return <div style={style} className={`${css.main} ${index % 2 !== 0 ? css.bgGray : css.bgWhite}`}/>
}