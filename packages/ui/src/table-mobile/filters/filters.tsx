//@ts-ignore
import style from "./filters.module.css";
import {createPortal} from "react-dom";
import {EnumTypeHeaderColum, HeaderColumBase} from "../props";
import {AscDes} from "./asc-des";
import {Multiple} from "./multiple";
import {NumRange} from "./numeric-range";
import {FILTER_BY, REMOVE_FILTERS, NO_AVAILABLE_FILTERS} from "../const";
import {useEffect} from "react";
import {ID_PORTAL} from "../../const";

export const Filters = ({isOpen, filters, handleClose, selected}: {
    filters: HeaderColumBase[], isOpen: boolean, handleClose: Function, selected?: string }) => {
    const noFilters = filters.filter(e => e.Type !== undefined).length === 0;
    useEffect(() => {
        isOpen && noFilters && setTimeout(() => onClick(), 2000)
    }, [noFilters, isOpen])
    return (
        createPortal(
            <>
                {(isOpen && !noFilters) && <div onClick={onClick} className={style.blackScreen}/>}

                {
                    noFilters ?
                        <div className={`${style.noFilters} ${isOpen && style.translate}`}>
                            {NO_AVAILABLE_FILTERS}
                        </div>
                        :
                        <div className={`${style.contFilters} ${isOpen && style.translate}`}>
                            <div className={style.mainFilter}>
                                <div className={style.header}>
                                    <div>
                                        <div>{FILTER_BY}</div>
                                        <button className={style.deleteFilter}>{REMOVE_FILTERS}</button>
                                    </div>
                                    <div className={style.close} onClick={onClick}/>
                                </div>
                                <div className={style.mainContFilter}>{filters.map(e => {
                                    if (e.Type === EnumTypeHeaderColum.AscDesc)
                                        return <AscDes props={e} key={e.Name} isSelected={selected === e.Name}/>
                                    else if (e.Type === EnumTypeHeaderColum.Multiple)
                                        return <Multiple props={e} key={e.Name} isSelected={selected === e.Name}/>
                                    else if (e.Type === EnumTypeHeaderColum.NumRange)
                                        return <NumRange props={e} key={e.Name} isSelected={selected === e.Name}/>
                                })}
                                </div>
                            </div>
                        </div>
                }
            </>, document.getElementById(ID_PORTAL)!
        )
    )

    function onClick() {
        handleClose()
    }
}