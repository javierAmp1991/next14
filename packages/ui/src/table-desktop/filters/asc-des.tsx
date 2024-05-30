//@ts-ignore
import style from "./filters.module.css";
import {EnumStateAscDes, HeaderColumAscDes} from "../props";

export const AscDes = ({props, isSelected}: { props: any, isSelected: boolean }) => {
    const item = props as HeaderColumAscDes;
    return (
        <div className={style.containerFilter}>
            <button className={style.grid} onClick={handleOption}>
                <span className={style.text}>{item.Name}</span>
                {
                    isSelected || item.IsAscending !== undefined ?
                        <>{item.IsAscending ?<div className={style.asc}/>:<div className={style.desc}/>}</>
                        :
                        <div className={style.disable}/>
                }
            </button>
        </div>
    )

    function handleOption() {
        let newState;
        if (item.IsAscending === undefined) newState = EnumStateAscDes.Ascending
        else if (item.IsAscending) newState = EnumStateAscDes.Descending
        else newState = undefined
        item.HandleFilter(newState)
    }
}