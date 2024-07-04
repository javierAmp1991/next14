//@ts-ignore
import style from "./filters.module.css";
import React, {useState} from "react";
import {EnumTypeHeaderColum} from "../props";

export  const FilterContainer = ({children, name, type, isCurrency}:
                                            { children: React.ReactNode, name: string, type: EnumTypeHeaderColum, isCurrency?: boolean }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className={`${style.filterContainer} ${isOpen && style.filterContainerOpen}`}>
            <button className={style.headerFilter} onClick={handleState}>
                {type === EnumTypeHeaderColum.Multiple && <div className={style.multi}/>}
                {
                    type === EnumTypeHeaderColum.AscDesc &&
                    <div className={style.gridAscDes}>
                        <div className={style.asc}/>
                        <div className={style.desc}/>
                    </div>
                }
                {
                    type === EnumTypeHeaderColum.NumRange &&
                    <>
                        {
                            isCurrency ?
                                <b className={style.currency}>$</b>
                                :
                                <div className={style.gridUpDown}>
                                    <span className={style.up}/>
                                    <span className={style.down}/>
                                </div>
                        }
                    </>
                }
                {name}
                <div className={`${style.return} ${isOpen && style.flip}`}/>
            </button>
            <div className={`${style.containerOptions} ${isOpen && style.containerOptionsOpen}`}>
                {children}
            </div>
        </div>
    )

    function handleState() {
        setIsOpen(!isOpen)
    }
}